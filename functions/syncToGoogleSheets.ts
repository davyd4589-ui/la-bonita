import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Skip auth check - allow service role to call this
    const { appointment } = await req.json();

    if (!appointment) {
      return Response.json({ error: 'Appointment data required' }, { status: 400 });
    }

    // Get Google Sheets access token
    const accessToken = await base44.asServiceRole.connectors.getAccessToken('googlesheets');

    // Google Sheets ID from the spreadsheet URL
    const SPREADSHEET_ID = Deno.env.get('GOOGLE_SHEETS_ID') || '14i65WOLdouPH3nmATGVRqy2lSYvb5G8iy-dgDutIaqU';
    
    // First, get the sheet metadata to find available sheets
    const metadataResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    if (!metadataResponse.ok) {
      const error = await metadataResponse.text();
      console.error('Failed to get sheet metadata:', error);
      return Response.json({ error: 'Failed to access Google Sheets', details: error }, { status: 500 });
    }

    const metadata = await metadataResponse.json();
    const sheets = metadata.sheets || [];
    
    // Try to find "NOVA" sheet, or use the first sheet
    let targetSheet = sheets.find(s => s.properties.title === 'NOVA');
    if (!targetSheet && sheets.length > 0) {
      targetSheet = sheets[0];
    }
    
    if (!targetSheet) {
      return Response.json({ error: 'No sheets found in the spreadsheet' }, { status: 500 });
    }

    const SHEET_NAME = targetSheet.properties.title;

    // Prepare the row data
    const rowData = [
      new Date().toLocaleString('pt-BR'),
      appointment.client_name,
      appointment.email,
      appointment.phone,
      appointment.service,
      appointment.preferred_date,
      appointment.preferred_time,
      appointment.service_price || '',
      appointment.duration || '',
      appointment.message || '',
      appointment.status || 'pending'
    ];

    // Append to Google Sheets
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}:append?valueInputOption=RAW`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [rowData]
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Google Sheets API error:', error);
      return Response.json({ error: 'Failed to sync to Google Sheets', details: error }, { status: 500 });
    }

    const result = await response.json();

    return Response.json({ 
      success: true, 
      updatedRange: result.updates?.updatedRange,
      sheetName: SHEET_NAME
    });

  } catch (error) {
    console.error('Error syncing to Google Sheets:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});