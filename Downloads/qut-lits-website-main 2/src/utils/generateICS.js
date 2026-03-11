/**
 * Generates an ICS (iCalendar) file blob from an array of events.
 * Events without a dtstart are included as descriptive-only entries.
 */

function pad(n) { return String(n).padStart(2, '0'); }

function toICSDate(iso) {
  // iso: "2026-03-09T17:00:00" → "20260309T170000"
  return iso.replace(/[-:]/g, '').replace('.000', '');
}

function escapeICS(str) {
  if (!str) return '';
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

export function generateICS(events) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//QUT LITS//Events 2026//EN',
    'X-WR-CALNAME:QUT LITS Events 2026',
    'X-WR-CALDESC:Events from the QUT Law\\, Innovation and Technology Society',
    'X-WR-TIMEZONE:Australia/Brisbane',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];

  events.forEach((event) => {
    if (!event.dtstart) return; // skip TBA events
    lines.push('BEGIN:VEVENT');
    lines.push(`UID:qutlits-${event.id}@qutlitsociety.com`);
    lines.push(`SUMMARY:${escapeICS(event.title)}`);
    lines.push(`DESCRIPTION:${escapeICS(event.description)}`);
    lines.push(`LOCATION:${escapeICS(event.location)}`);
    if (event.allDay) {
      lines.push(`DTSTART;VALUE=DATE:${event.dtstart}`);
      lines.push(`DTEND;VALUE=DATE:${event.dtend || event.dtstart}`);
    } else {
      lines.push(`DTSTART;TZID=Australia/Brisbane:${event.dtstart}`);
      lines.push(`DTEND;TZID=Australia/Brisbane:${event.dtend || event.dtstart}`);
    }
    lines.push('END:VEVENT');
  });

  lines.push('END:VCALENDAR');
  return new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
}

export function downloadICS(blob, filename = 'qutlits-events.ics') {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
