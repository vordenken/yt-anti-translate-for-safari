// Page scripts (background*.js) are loaded via manifest content_scripts
// with world: MAIN, because Safari applies the page CSP to injected
// <script src> tags pointing at extension resources.

// Listen for reload messages from the extension popup
// This is needed to reload the pages that are inside iFrames
chrome.runtime.onMessage.addListener((message) => {
  if (message && message.type === "reload") {
    window.location.reload();
  }
});
