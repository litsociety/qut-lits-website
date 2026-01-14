import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, CalendarPlus, ChevronRight } from "lucide-react";

const DEVICE_OPTIONS = [
  { id: 'ios', label: 'iOS (iPhone/iPad)' },
  { id: 'android', label: 'Android' },
  { id: 'mac', label: 'Mac' },
  { id: 'windows', label: 'Windows' },
  { id: 'web', label: 'Web Browser' },
];

const CALENDAR_OPTIONS = {
  ios: [
    { id: 'apple-calendar', label: 'Apple Calendar' },
    { id: 'google-calendar', label: 'Google Calendar' },
    { id: 'outlook', label: 'Outlook' },
  ],
  android: [
    { id: 'google-calendar', label: 'Google Calendar' },
    { id: 'outlook', label: 'Outlook' },
    { id: 'samsung-calendar', label: 'Samsung Calendar' },
  ],
  mac: [
    { id: 'apple-calendar', label: 'Apple Calendar' },
    { id: 'google-calendar', label: 'Google Calendar' },
    { id: 'outlook', label: 'Outlook' },
  ],
  windows: [
    { id: 'outlook', label: 'Outlook' },
    { id: 'google-calendar', label: 'Google Calendar' },
    { id: 'windows-calendar', label: 'Windows Calendar' },
  ],
  web: [
    { id: 'google-calendar', label: 'Google Calendar' },
    { id: 'outlook', label: 'Outlook' },
    { id: 'yahoo-calendar', label: 'Yahoo Calendar' },
  ],
};

const INSTRUCTIONS = {
  'ios-apple-calendar': {
    title: 'Add to Apple Calendar on iOS',
    steps: [
      'Tap the download button below to download the calendar file',
      'When the file downloads, tap on it',
      'Tap "Add All" to add the event(s) to your Apple Calendar',
      'The event(s) will now appear in your calendar',
    ],
  },
  'ios-google-calendar': {
    title: 'Add to Google Calendar on iOS',
    steps: [
      'Tap the download button below to download the calendar file',
      'Open the Google Calendar app on your iPhone/iPad',
      'Tap the "+" button in the bottom right',
      'Tap "Import from file"',
      'Select the downloaded .ics file',
      'The event(s) will be added to your Google Calendar',
    ],
  },
  'ios-outlook': {
    title: 'Add to Outlook on iOS',
    steps: [
      'Tap the download button below to download the calendar file',
      'Open the Outlook app on your iPhone/iPad',
      'Tap the calendar icon at the bottom',
      'Tap the "+" button',
      'Tap "Import calendar"',
      'Select the downloaded .ics file',
      'The event(s) will be added to your Outlook calendar',
    ],
  },
  'android-google-calendar': {
    title: 'Add to Google Calendar on Android',
    steps: [
      'Tap the download button below to download the calendar file',
      'Open the Google Calendar app on your Android device',
      'Tap the menu (three lines) in the top left',
      'Tap "Settings"',
      'Tap "Import & export"',
      'Tap "Import from .ics file"',
      'Select the downloaded .ics file',
      'The event(s) will be added to your Google Calendar',
    ],
  },
  'android-outlook': {
    title: 'Add to Outlook on Android',
    steps: [
      'Tap the download button below to download the calendar file',
      'Open the Outlook app on your Android device',
      'Tap the calendar icon at the bottom',
      'Tap the menu (three dots) in the top right',
      'Tap "Import calendar"',
      'Select the downloaded .ics file',
      'The event(s) will be added to your Outlook calendar',
    ],
  },
  'android-samsung-calendar': {
    title: 'Add to Samsung Calendar on Android',
    steps: [
      'Tap the download button below to download the calendar file',
      'Open the Samsung Calendar app',
      'Tap the menu (three lines) in the top left',
      'Tap "Import"',
      'Select the downloaded .ics file',
      'The event(s) will be added to your Samsung Calendar',
    ],
  },
  'mac-apple-calendar': {
    title: 'Add to Apple Calendar on Mac',
    steps: [
      'Click the download button below to download the calendar file',
      'Double-click the downloaded .ics file',
      'Apple Calendar will open automatically',
      'The event(s) will be added to your default calendar',
      'You can change which calendar to add it to if needed',
    ],
  },
  'mac-google-calendar': {
    title: 'Add to Google Calendar on Mac',
    steps: [
      'Click the download button below to download the calendar file',
      'Open your web browser and go to calendar.google.com',
      'Click the gear icon (Settings) in the top right',
      'Click "Settings"',
      'In the left sidebar, click "Import & export"',
      'Click "Select file from your computer"',
      'Choose the downloaded .ics file',
      'Select which calendar to import to',
      'Click "Import"',
      'The event(s) will be added to your Google Calendar',
    ],
  },
  'mac-outlook': {
    title: 'Add to Outlook on Mac',
    steps: [
      'Click the download button below to download the calendar file',
      'Open Outlook on your Mac',
      'Go to File > Import',
      'Select "Calendar (.ics)"',
      'Choose the downloaded .ics file',
      'Select which calendar to import to',
      'Click "Import"',
      'The event(s) will be added to your Outlook calendar',
    ],
  },
  'windows-outlook': {
    title: 'Add to Outlook on Windows',
    steps: [
      'Click the download button below to download the calendar file',
      'Open Outlook on your Windows computer',
      'Go to File > Open & Export > Import/Export',
      'Select "Import an iCalendar (.ics) or vCalendar file"',
      'Click "Next"',
      'Browse and select the downloaded .ics file',
      'Click "OK"',
      'The event(s) will be added to your Outlook calendar',
    ],
  },
  'windows-google-calendar': {
    title: 'Add to Google Calendar on Windows',
    steps: [
      'Click the download button below to download the calendar file',
      'Open your web browser and go to calendar.google.com',
      'Click the gear icon (Settings) in the top right',
      'Click "Settings"',
      'In the left sidebar, click "Import & export"',
      'Click "Select file from your computer"',
      'Choose the downloaded .ics file',
      'Select which calendar to import to',
      'Click "Import"',
      'The event(s) will be added to your Google Calendar',
    ],
  },
  'windows-windows-calendar': {
    title: 'Add to Windows Calendar',
    steps: [
      'Click the download button below to download the calendar file',
      'Open the Windows Calendar app',
      'Click the settings icon (gear) in the bottom left',
      'Click "Manage accounts"',
      'Click "Add account" if needed',
      'Go back to the calendar view',
      'Right-click on the downloaded .ics file',
      'Select "Open with" > "Calendar"',
      'The event(s) will be added to your Windows Calendar',
    ],
  },
  'web-google-calendar': {
    title: 'Add to Google Calendar (Web)',
    steps: [
      'Click the download button below to download the calendar file',
      'Go to calendar.google.com in your browser',
      'Click the gear icon (Settings) in the top right',
      'Click "Settings"',
      'In the left sidebar, click "Import & export"',
      'Click "Select file from your computer"',
      'Choose the downloaded .ics file',
      'Select which calendar to import to',
      'Click "Import"',
      'The event(s) will be added to your Google Calendar',
    ],
  },
  'web-outlook': {
    title: 'Add to Outlook (Web)',
    steps: [
      'Click the download button below to download the calendar file',
      'Go to outlook.live.com/calendar in your browser',
      'Click the gear icon (Settings) in the top right',
      'Click "View all Outlook settings"',
      'Click "Calendar" in the left sidebar',
      'Click "Shared calendars"',
      'Click "Import calendar"',
      'Click "Choose file" and select the downloaded .ics file',
      'Click "Import"',
      'The event(s) will be added to your Outlook calendar',
    ],
  },
  'web-yahoo-calendar': {
    title: 'Add to Yahoo Calendar (Web)',
    steps: [
      'Click the download button below to download the calendar file',
      'Go to calendar.yahoo.com in your browser',
      'Click the settings icon (gear)',
      'Click "Import"',
      'Click "Choose File" and select the downloaded .ics file',
      'Click "Import"',
      'The event(s) will be added to your Yahoo Calendar',
    ],
  },
};

function CalendarSubscriptionModal({ isOpen, onClose, onDownload, eventTitle }) {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedCalendar, setSelectedCalendar] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); // 1 = device, 2 = calendar, 3 = instructions

  useEffect(() => {
    if (isOpen) {
      setSelectedDevice(null);
      setSelectedCalendar(null);
      setCurrentStep(1);
    }
  }, [isOpen]);

  const availableCalendars = selectedDevice ? CALENDAR_OPTIONS[selectedDevice] || [] : [];
  const instructionKey = selectedDevice && selectedCalendar 
    ? `${selectedDevice}-${selectedCalendar}` 
    : null;
  const instructions = instructionKey ? INSTRUCTIONS[instructionKey] : null;

  const handleDeviceSelect = (deviceId) => {
    setSelectedDevice(deviceId);
    setSelectedCalendar(null);
    setCurrentStep(2);
  };

  const handleCalendarSelect = (calendarId) => {
    setSelectedCalendar(calendarId);
    setCurrentStep(3);
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    }
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1050] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-gradient-to-br from-dark-blue via-dark-purple to-dark-blue rounded-2xl md:rounded-3xl border border-white/20 backdrop-blur-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors duration-200 z-10"
            aria-label="Close modal"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          <div className="p-4 sm:p-6 md:p-8">
            {/* Header */}
            <div className="flex items-start gap-3 mb-4 sm:mb-6 pr-8">
              <div className="p-2 sm:p-3 bg-primary/20 rounded-lg sm:rounded-xl flex-shrink-0">
                <CalendarPlus className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white font-tomorrow leading-tight">
                  {eventTitle ? (
                    <>
                      Add <span className="break-words">"{eventTitle}"</span> to Calendar
                    </>
                  ) : (
                    "Add Events to Calendar"
                  )}
                </h2>
                <p className="text-white/70 text-xs sm:text-sm font-montserrat mt-1">
                  Select your device and calendar app for personalized instructions
                </p>
              </div>
            </div>

            {/* Step 1: Device Selection */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h3 className="text-base sm:text-lg font-semibold text-white font-rubik mb-3 sm:mb-4">
                  Step 1: Select your device
                </h3>
                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                  {DEVICE_OPTIONS.map((device) => (
                    <button
                      key={device.id}
                      onClick={() => handleDeviceSelect(device.id)}
                      className="group flex items-center justify-between p-3 sm:p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 rounded-lg sm:rounded-xl transition-all duration-200 text-left"
                    >
                      <span className="text-white font-montserrat font-medium text-sm sm:text-base">{device.label}</span>
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-white/50 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Calendar Selection */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <button
                  onClick={() => {
                    setCurrentStep(1);
                    setSelectedDevice(null);
                    setSelectedCalendar(null);
                  }}
                  className="text-primary hover:text-primary/80 text-xs sm:text-sm font-montserrat mb-3 sm:mb-4 flex items-center gap-1"
                >
                  ← Back
                </button>
                <h3 className="text-base sm:text-lg font-semibold text-white font-rubik mb-3 sm:mb-4">
                  Step 2: Select your calendar app
                </h3>
                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                  {availableCalendars.map((calendar) => (
                    <button
                      key={calendar.id}
                      onClick={() => handleCalendarSelect(calendar.id)}
                      className="group flex items-center justify-between p-3 sm:p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 rounded-lg sm:rounded-xl transition-all duration-200 text-left"
                    >
                      <span className="text-white font-montserrat font-medium text-sm sm:text-base">{calendar.label}</span>
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-white/50 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Instructions */}
            {currentStep === 3 && instructions && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <button
                  onClick={() => {
                    setCurrentStep(2);
                    setSelectedCalendar(null);
                  }}
                  className="text-primary hover:text-primary/80 text-xs sm:text-sm font-montserrat flex items-center gap-1 mb-4"
                >
                  ← Back
                </button>
                
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-tomorrow mb-3 sm:mb-4">
                    {instructions.title}
                  </h3>
                  
                  <div className="bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 mb-4 sm:mb-6">
                    <ol className="space-y-2 sm:space-y-3">
                      {instructions.steps.map((step, index) => (
                        <li key={index} className="flex gap-2 sm:gap-3">
                          <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/20 text-primary font-bold text-xs sm:text-sm flex items-center justify-center font-rubik">
                            {index + 1}
                          </span>
                          <span className="text-white/80 font-montserrat text-xs sm:text-sm leading-relaxed pt-0.5 flex-1">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <button
                    onClick={handleDownload}
                    className="w-full group inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-primary to-purple text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold hover:from-primary/90 hover:to-purple/90 transition-all duration-300 shadow-lg hover:shadow-primary/25 font-rubik text-sm sm:text-base"
                  >
                    <Download className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="whitespace-nowrap">Download Calendar File (.ics)</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}

export default CalendarSubscriptionModal;
