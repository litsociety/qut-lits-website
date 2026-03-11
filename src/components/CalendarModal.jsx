import React, { useState } from 'react';
import { X, ChevronRight, ArrowLeft, Download, Calendar } from 'lucide-react';
import { generateICS, downloadICS } from '../utils/generateICS';

const DEVICES = [
  { id: 'ios',     label: 'iOS (iPhone / iPad)' },
  { id: 'android', label: 'Android' },
  { id: 'mac',     label: 'Mac' },
  { id: 'windows', label: 'Windows' },
  { id: 'web',     label: 'Web Browser' },
];

const APPS = {
  ios:     [{ id: 'apple',  label: 'Apple Calendar' }, { id: 'google', label: 'Google Calendar' }],
  android: [{ id: 'google', label: 'Google Calendar' }, { id: 'outlook', label: 'Outlook' }],
  mac:     [{ id: 'apple',  label: 'Apple Calendar' }, { id: 'google', label: 'Google Calendar' }, { id: 'outlook', label: 'Outlook' }],
  windows: [{ id: 'outlook', label: 'Outlook' }, { id: 'google', label: 'Google Calendar' }],
  web:     [{ id: 'google', label: 'Google Calendar' }, { id: 'outlook', label: 'Outlook' }, { id: 'apple', label: 'Apple Calendar (iCloud)' }],
};

const INSTRUCTIONS = {
  apple: {
    mac:  ['Click the download button below', 'Double-click the downloaded .ics file', 'Apple Calendar opens automatically', 'The events are added to your default calendar'],
    ios:  ['Click the download button below', 'Tap the .ics file in your downloads', 'Tap "Add All" when prompted by Calendar'],
    web:  ['Download the .ics file', 'Go to iCloud.com → Calendar', 'Click the settings cog → Import', 'Select the downloaded file'],
  },
  google: {
    default: ['Click the download button below', 'Go to calendar.google.com', 'Click the ⚙ Settings gear → Import & Export', 'Click "Select file from your computer" and choose the .ics file', 'Select which calendar to add events to, then click Import'],
  },
  outlook: {
    mac:     ['Click the download button below', 'Double-click the .ics file — Outlook opens automatically', 'Click "Import" to add all events'],
    windows: ['Click the download button below', 'Double-click the .ics file — Outlook opens automatically', 'Click "Import" to add all events'],
    default: ['Click the download button below', 'In Outlook go to File → Open & Export → Import/Export', 'Choose "Import an iCalendar (.ics) file"', 'Select the downloaded .ics file'],
  },
};

function getInstructions(app, device) {
  const map = INSTRUCTIONS[app];
  if (!map) return [];
  return map[device] || map.default || [];
}

export default function CalendarModal({ events, onClose }) {
  const [device, setDevice] = useState(null);
  const [app, setApp]       = useState(null);

  const step = !device ? 'device' : !app ? 'app' : 'instructions';

  const handleDownload = () => {
    const blob = generateICS(events);
    downloadICS(blob, 'qutlits-events-2026.ics');
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#141414] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 p-5 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-white font-bold font-tomorrow text-base">Add Events to Calendar</h2>
            <p className="text-white/50 text-xs font-montserrat mt-0.5">
              Select your device and calendar app for instructions
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4 text-white/50" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {/* Back link */}
          {step !== 'device' && (
            <button
              onClick={() => { if (step === 'app') setDevice(null); else setApp(null); }}
              className="flex items-center gap-1 text-white/50 hover:text-white/80 text-sm font-montserrat mb-4 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>
          )}

          {/* Step 1: Device */}
          {step === 'device' && (
            <div>
              <p className="text-xs font-semibold text-white/40 uppercase tracking-widest font-rubik mb-3">
                Step 1 — Select your device
              </p>
              <div className="space-y-2">
                {DEVICES.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDevice(d.id)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-white font-montserrat text-sm text-left"
                  >
                    {d.label}
                    <ChevronRight className="h-4 w-4 text-white/40 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: App */}
          {step === 'app' && (
            <div>
              <p className="text-xs font-semibold text-white/40 uppercase tracking-widest font-rubik mb-3">
                Step 2 — Select your calendar app
              </p>
              <div className="space-y-2">
                {(APPS[device] || []).map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setApp(a.id)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-white font-montserrat text-sm text-left"
                  >
                    {a.label}
                    <ChevronRight className="h-4 w-4 text-white/40 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Instructions + Download */}
          {step === 'instructions' && (
            <div>
              <p className="text-xs font-semibold text-white/40 uppercase tracking-widest font-rubik mb-4">
                {APPS[device]?.find(a => a.id === app)?.label}
              </p>
              <ol className="space-y-2 mb-6">
                {getInstructions(app, device).map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-montserrat text-white/70">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-white/10 text-white/60 text-xs flex items-center justify-center font-rubik mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold px-4 py-3 rounded-xl font-rubik text-sm hover:bg-white/90 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download Calendar File (.ics)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
