// Simple frontend for the url shortener

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("shortenForm");
  const urlInput = document.getElementById("urlInput");
  const shortenBtn = document.getElementById("shortenBtn");
  const resultContainer = document.getElementById("resultContainer");
  const shortUrlInput = document.getElementById("shortUrl");
  const errorContainer = document.getElementById("errorContainer");
  const errorMessage = document.getElementById("errorMessage");
  const btnText = document.querySelector(".btn-text");
  const btnLoading = document.querySelector(".btn-loading");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const url = urlInput.value.trim();

    if (!url) {
      showError("Please enter a URL");
      return;
    }

    try {
      new URL(url);
    } catch {
      showError("Please enter a valid URL (e.g., https://example.com)");
      return;
    }

    // Show loading state
    setLoading(true);
    hideError();
    hideResult();

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to shorten URL");
      }

      // Show result
      shortUrlInput.value = data.shortUrl;
      showResult();

      // Clear input
      urlInput.value = "";
    } catch (error) {
      console.error("Error:", error);
      showError(error.message || "An error occurred while shortening the URL");
    } finally {
      setLoading(false);
    }
  });

  function setLoading(loading) {
    shortenBtn.disabled = loading;
    if (loading) {
      btnText.style.display = "none";
      btnLoading.style.display = "inline";
    } else {
      btnText.style.display = "inline";
      btnLoading.style.display = "none";
    }
  }

  function showResult() {
    resultContainer.style.display = "block";
    errorContainer.style.display = "none";
  }

  function hideResult() {
    resultContainer.style.display = "none";
  }

  function showError(message) {
    errorMessage.textContent = message;
    errorContainer.style.display = "block";
    resultContainer.style.display = "none";
  }

  function hideError() {
    errorContainer.style.display = "none";
  }

  // Auto-hide copy message after 3 seconds
  let copyMessageTimeout;

  window.copyToClipboard = function () {
    const shortUrl = document.getElementById("shortUrl");
    const copyMessage = document.getElementById("copyMessage");

    if (copyMessageTimeout) {
      clearTimeout(copyMessageTimeout);
    }

    // Copy to clipboard
    shortUrl.select();
    shortUrl.setSelectionRange(0, 99999);

    try {
      document.execCommand("copy");
      showCopyMessage();
    } catch (err) {
      navigator.clipboard
        .writeText(shortUrl.value)
        .then(() => {
          showCopyMessage();
        })
        .catch(() => {
          showError("Failed to copy to clipboard");
        });
    }
  };

  function showCopyMessage() {
    const copyMessage = document.getElementById("copyMessage");
    copyMessage.style.display = "block";

    // Hide after 3 seconds
    copyMessageTimeout = setTimeout(() => {
      copyMessage.style.display = "none";
    }, 3000);
  }

  urlInput.focus();
});
