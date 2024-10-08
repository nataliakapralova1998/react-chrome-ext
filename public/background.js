// background.js

// Mock function to simulate fetching messages from an API
const fetchMessages = () => {
  // Example response structure
  return {
    messages: [
      {
        id: 'msg123',
        content: 'Team meeting at 3 PM today 🙂',
        priority: 'high',
        timestamp: new Date().toISOString(),
        read: false,
      },
      {
        id: 'msg124',
        content: 'Remember to submit your reports!',
        priority: 'medium',
        timestamp: new Date().toISOString(),
        read: false,
      },
    ],
  };
};

const checkForNewMessages = () => {
  const { messages } = fetchMessages(); // Get messages from the mock API
  
  console.log('Fetched messages:', messages); // Log fetched messages

  chrome.storage.local.get('messages', (result) => {
    const storedMessages = result.messages || [];
    console.log('Stored messages before combining:', storedMessages); // Log stored messages

    // Combine new messages with existing ones
    const allMessages = [...storedMessages, ...messages];
    console.log('All messages combined:', allMessages); // Log all combined messages

    // Remove duplicates (if any)
    const uniqueMessages = Array.from(new Map(allMessages.map(msg => [msg.id, msg])).values());
    console.log('Unique messages:', uniqueMessages); // Log unique messages

    // Save to Chrome storage
    chrome.storage.local.set({ messages: uniqueMessages }, () => {
      console.log('Updated messages in storage:', uniqueMessages);

      // Update badge text if there are unread messages
      const unreadCount = uniqueMessages.filter(msg => !msg.read).length;
      chrome.action.setBadgeText({ text: unreadCount > 0 ? String(unreadCount) : '' });
    });
  });
};


// Run the check for new messages immediately on load
checkForNewMessages();

// Set interval to check for new messages every 5 minutes (300000 milliseconds)
setInterval(checkForNewMessages, 300000);
