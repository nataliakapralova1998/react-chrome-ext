// Mock function to simulate fetching messages from an API
const fetchMessages = () => {
  return {
    messages: [
      {
        id: "msg001",
        content: "Team meeting at 3 PM today 🙂",
        priority: "high",
        timestamp: "2024-10-07T14:00:00Z",
        read: false,
      },
      {
        id: "msg002",
        content: "Don't forget to submit your expense reports by Friday.",
        priority: "medium",
        timestamp: "2024-10-06T11:30:00Z",
        read: false,
      },
      {
        id: "msg003",
        content: "System maintenance is scheduled for midnight tonight.",
        priority: "low",
        timestamp: "2024-10-05T16:45:00Z",
        read: false,
      },
      {
        id: "msg004",
        content: "Company-wide webinar tomorrow at 2 PM. Please attend.",
        priority: "high",
        timestamp: "2024-10-05T10:15:00Z",
        read: true,
      },
      {
        id: "msg005",
        content: "Your weekly performance review is ready.",
        priority: "medium",
        timestamp: "2024-10-04T09:00:00Z",
        read: false,
      },
      {
        id: "msg006",
        content: "Happy Hour this Friday at 5 PM! Don't miss it 🍻.",
        priority: "low",
        timestamp: "2024-10-03T18:00:00Z",
        read: true,
      },
      {
        id: "msg007",
        content: "Quarterly financial results have been posted.",
        priority: "medium",
        timestamp: "2024-10-02T08:30:00Z",
        read: true,
      },
      {
        id: "msg008",
        content: "New company policies have been updated. Please review.",
        priority: "low",
        timestamp: "2024-10-01T14:30:00Z",
        read: false,
      },
    ],
  };
};

const checkForNewMessages = () => {
  const { messages } = fetchMessages(); // Get messages from the mock API

  console.log("Fetched messages:", messages); // Log fetched messages

  chrome.storage.local.get("messages", (result) => {
    const storedMessages = result.messages || [];
    console.log("Stored messages before combining:", storedMessages); // Log stored messages

    // Combine new messages with existing ones
    const allMessages = [...storedMessages, ...messages];
    console.log("All messages combined:", allMessages); // Log all combined messages

    // Remove duplicates (if any)
    const uniqueMessages = Array.from(
      new Map(allMessages.map((msg) => [msg.id, msg])).values()
    );
    console.log("Unique messages:", uniqueMessages); // Log unique messages

    // Save to Chrome storage
    chrome.storage.local.set({ messages: uniqueMessages }, () => {
      console.log("Updated messages in storage:", uniqueMessages);

      // Update badge text if there are unread messages
      const unreadCount = uniqueMessages.filter((msg) => !msg.read).length;
      chrome.action.setBadgeText({
        text: unreadCount > 0 ? String(unreadCount) : "",
      });
    });
  });
};

// Run the check for new messages immediately on load
checkForNewMessages();

// Set interval to check for new messages every 5 minutes (300000 milliseconds)
setInterval(checkForNewMessages, 300000);
