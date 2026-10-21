// Load global.js in page environment
// This is separate so that it can be injected early as it is needed by other scripts
chrome.storage.local.get(
  {
    disabled: false,
    untranslateTitle: true,
    whiteListUntranslateTitle: [],
    untranslateAudio: true,
    untranslateAudioOnlyAI: false,
    whiteListUntranslateAudio: [],
    untranslateDescription: true,
    whiteListUntranslateDescription: [],
    untranslateChapters: true,
    whiteListUntranslateChapters: [],
    untranslateChannelBranding: true,
    whiteListUntranslateChannelBranding: [],
    untranslateNotification: true,
    untranslateThumbnail: true,
    whiteListUntranslateThumbnail: [],
    subtitlesLanguage: "original",
    subtitlesEnabled: false,
  },
  async function (items) {
    if (!items.disabled) {
      const settingsElement = document.createElement("div");
      settingsElement.hidden = true;
      settingsElement.dataset.ytantitranslatesettings = JSON.stringify(items);
      document.documentElement.appendChild(settingsElement);
    }
  },
);
