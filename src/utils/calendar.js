/**
 * Calendar utility functions for generating .ics files
 */

/**
 * Escapes special characters in ICS format
 */
function escapeICS(text) {
  if (!text) return '';
  return String(text)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/**
 * Formats a date to ICS format (YYYYMMDDTHHMMSS)
 */
function formatICSDate(date, includeTime = true) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  if (!includeTime) {
    return `${year}${month}${day}`;
  }
  
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}

/**
 * Parses time string to Date object
 * Handles: "TBA", "All Day", "6:00 PM", "6:00 PM - 9:00 PM"
 */
function parseEventTime(dateStr, timeStr) {
  const baseDate = new Date(dateStr);
  
  if (!timeStr || timeStr.toLowerCase().includes('tba')) {
    // Default to 10:00 AM if TBA
    baseDate.setHours(10, 0, 0, 0);
    return { start: baseDate, end: new Date(baseDate.getTime() + 2 * 60 * 60 * 1000) }; // 2 hour default
  }
  
  if (timeStr.toLowerCase().includes('all day')) {
    // All day event - start at midnight, end at 11:59 PM
    const start = new Date(baseDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(baseDate);
    end.setHours(23, 59, 59, 0);
    return { start, end, isAllDay: true };
  }
  
  // Parse time range like "6:00 PM - 9:00 PM" or single time "6:00 PM"
  const timeRange = timeStr.split(' - ');
  const startTimeStr = timeRange[0].trim();
  
  // Parse start time
  const startMatch = startTimeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (startMatch) {
    let hours = parseInt(startMatch[1], 10);
    const minutes = parseInt(startMatch[2], 10);
    const ampm = startMatch[3].toUpperCase();
    
    if (ampm === 'PM' && hours !== 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    
    const start = new Date(baseDate);
    start.setHours(hours, minutes, 0, 0);
    
    // Parse end time if provided
    let end;
    if (timeRange.length > 1) {
      const endTimeStr = timeRange[1].trim();
      const endMatch = endTimeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (endMatch) {
        let endHours = parseInt(endMatch[1], 10);
        const endMinutes = parseInt(endMatch[2], 10);
        const endAmpm = endMatch[3].toUpperCase();
        
        if (endAmpm === 'PM' && endHours !== 12) endHours += 12;
        if (endAmpm === 'AM' && endHours === 12) endHours = 0;
        
        end = new Date(baseDate);
        end.setHours(endHours, endMinutes, 0, 0);
      } else {
        // Default to 2 hours after start
        end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
      }
    } else {
      // Default to 2 hours after start
      end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    }
    
    return { start, end };
  }
  
  // Fallback: default to 10:00 AM - 12:00 PM
  const start = new Date(baseDate);
  start.setHours(10, 0, 0, 0);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  return { start, end };
}

/**
 * Generates ICS file content for a single event
 */
export function generateICS(event) {
  const lines = [];
  
  // Header
  lines.push('BEGIN:VCALENDAR');
  lines.push('VERSION:2.0');
  lines.push('PRODID:-//QUT LITS//Event Calendar//EN');
  lines.push('CALSCALE:GREGORIAN');
  lines.push('METHOD:PUBLISH');
  
  // Event
  lines.push('BEGIN:VEVENT');
  
  // UID (unique identifier)
  const uid = `qut-lits-event-${event.id}-${event.date}@litsociety.qut.edu.au`;
  lines.push(`UID:${uid}`);
  
  // Date/Time
  const { start, end, isAllDay } = parseEventTime(event.date, event.time);
  
  if (isAllDay) {
    // All-day event
    lines.push(`DTSTART;VALUE=DATE:${formatICSDate(start, false)}`);
    lines.push(`DTEND;VALUE=DATE:${formatICSDate(end, false)}`);
  } else {
    // Timed event - use floating time (no timezone) so calendar apps interpret in user's local timezone
    // This works better across devices and timezones
    lines.push(`DTSTART:${formatICSDate(start)}`);
    lines.push(`DTEND:${formatICSDate(end)}`);
  }
  
  // Summary (title)
  lines.push(`SUMMARY:${escapeICS(event.title)}`);
  
  // Description
  const description = `${event.description}\n\nLocation: ${event.location}`;
  lines.push(`DESCRIPTION:${escapeICS(description)}`);
  
  // Location
  lines.push(`LOCATION:${escapeICS(event.location)}`);
  
  // Timestamp (use UTC for timestamp)
  const now = new Date();
  const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60 * 1000));
  lines.push(`DTSTAMP:${formatICSDate(utcNow)}Z`);
  
  // Status
  lines.push('STATUS:CONFIRMED');
  
  // End event
  lines.push('END:VEVENT');
  
  // Footer
  lines.push('END:VCALENDAR');
  
  return lines.join('\r\n');
}

/**
 * Generates ICS file content for multiple events
 */
export function generateICSForAllEvents(events) {
  const lines = [];
  
  // Header
  lines.push('BEGIN:VCALENDAR');
  lines.push('VERSION:2.0');
  lines.push('PRODID:-//QUT LITS//Event Calendar//EN');
  lines.push('CALSCALE:GREGORIAN');
  lines.push('METHOD:PUBLISH');
  lines.push(`X-WR-CALNAME:QUT LITS Events 2026`);
  lines.push(`X-WR-CALDESC:All events from QUT Law, Innovation and Technology Society`);
  
  // Add each event
  events.forEach(event => {
    const eventLines = generateICS(event).split('\r\n');
    // Extract just the VEVENT part (skip header/footer)
    const eventStart = eventLines.indexOf('BEGIN:VEVENT');
    const eventEnd = eventLines.indexOf('END:VEVENT');
    if (eventStart !== -1 && eventEnd !== -1) {
      lines.push(...eventLines.slice(eventStart, eventEnd + 1));
    }
  });
  
  // Footer
  lines.push('END:VCALENDAR');
  
  return lines.join('\r\n');
}

/**
 * Downloads an ICS file
 */
export function downloadICS(icsContent, filename) {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || 'event.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
