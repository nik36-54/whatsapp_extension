chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const { phone, message } = request;
  
    // Navigate to the chat of the phone number
    const chatUrl = `https://web.whatsapp.com/send?phone=${phone}`;
    window.location.href = chatUrl;
  
    // Wait for the chat to load and send the message
    const interval = setInterval(() => {
      const messageBox = document.querySelector('div[contenteditable="true"][data-tab="10"]');
      if (messageBox) {
        clearInterval(interval);
  
        // Type and send the message
        messageBox.textContent = message;
  
        // Simulate Enter key press to send the message
        const event = new KeyboardEvent("keydown", {
          bubbles: true,
          cancelable: true,
          key: "Enter",
          code: "Enter",
        });
        messageBox.dispatchEvent(event);
  
        // Respond back to popup.js
        sendResponse({ success: true });
      }
    }, 1000);
  
    // Required to keep the message channel open
    return true;
  });
  