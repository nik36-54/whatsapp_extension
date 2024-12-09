document.getElementById("sendMessage").addEventListener("click", () => {
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();
  
    if (!phone || !message) {
      alert("Please fill in both the phone number and message.");
      return;
    }
  
    // Query the current active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const url = tabs[0].url;
        if (!url.includes("https://web.whatsapp.com")) {
          alert("Please open WhatsApp Web in the active tab before sending a message.");
          return;
        }
      
      // Inject the content script into the active tab
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          files: ["content.js"],
        },
        () => {
          // Send a message to the content script after injection
          chrome.tabs.sendMessage(tab.id, { phone, message }, (response) => {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError.message);
              alert("Error: Unable to send the message.");
            } else {
              alert("Message sent successfully!");
            }
          });
        }
      );
    });
  });
  