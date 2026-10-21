import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("content_start", () => {
  let originalChrome;

  async function loadModule() {
    vi.resetModules();

    window.chrome = /** @type {any} */ ({
      storage: {
        local: {
          get: vi.fn((defaults, callback) => callback({ ...defaults })),
        },
      },
      runtime: {
        getURL: vi.fn((path) => `chrome-extension://test/${path}`),
        onMessage: {
          addListener: vi.fn(),
        },
      },
    });
    global.chrome = window.chrome;

    await import("../app/src/content_start.js");
    await Promise.resolve();
  }

  beforeEach(() => {
    originalChrome = window.chrome;
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  afterEach(() => {
    window.chrome = originalChrome;
    global.chrome = originalChrome;
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  it("does not inject <script> tags (page scripts run in the MAIN world)", async () => {
    await loadModule();

    expect(document.querySelectorAll("script")).toHaveLength(0);
  });

  it("registers the reload message listener", async () => {
    await loadModule();

    expect(window.chrome.runtime.onMessage.addListener).toHaveBeenCalledTimes(
      1,
    );
  });
});
