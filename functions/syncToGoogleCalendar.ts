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

    // Get Google Calendar access token
    const accessToken = await base44.asServiceRole.connectors.getAccessToken('googlecalendar');

    // Parse date and time
    const startDateTime = new Date(`${appointment.preferred_date}T${appointment.preferred_time}:00`);
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(endDateTime.getHours() + 2); // Default 2 hour duration

    // Create event in Google Calendar
    const calendarEvent = {
      summary: `${appointment.service} - ${appointment.client_name}`,
      description: `Cliente: ${appointment.client_name}\nTelefone: ${appointment.phone}\nEmail: ${appointment.email}\n${appointment.message ? `\nObservações: ${appointment.message}` : ''}`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'America/Sao_Paulo',
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'America/Sao_Paulo',
      },
      attendees: [
        { email: appointment.email }
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'popup', minutes: 60 }, // 1 hour before
        ],
      },
    };

    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(calendarEvent),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Google Calendar API error:', error);
      return Response.json({ error: 'Failed to create calendar event', details: error }, { status: 500 });
    }

    const event = await response.json();

    return Response.json({ 
      success: true, 
      eventId: event.id,
      eventLink: event.htmlLink 
    });

  } catch (error) {
    console.error('Error syncing to Google Calendar:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});