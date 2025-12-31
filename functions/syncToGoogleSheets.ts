import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { appointment } = await req.json();

    if (!appointment) {
      return Response.json({ error: 'Appointment data required' }, { status: 400 });
    }

    // Get Google Sheets access token
    const accessToken = await base44.asServiceRole.connectors.getAccessToken('googlesheets');

    // Your Google Sheets ID - replace this with your actual spreadsheet ID
    // Get it from the URL: https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit
    const SPREADSHEET_ID = Deno.env.get('GOOGLE_SHEETS_ID') || 'YOUR_SPREADSHEET_ID';
    const SHEET_NAME = 'Agendamentos'; // You can change this to your sheet name

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
      updatedRange: result.updates?.updatedRange 
    });

  } catch (error) {
    console.error('Error syncing to Google Sheets:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});