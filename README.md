# React Chrome Extension - Organization Messages

This Chrome extension, built with React and TypeScript, displays organization-wide messages from an admin to users.

## Setup Instructions

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nataliakapralova1998/react-chrome-ext.git
   cd react-chrome-extension
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Build the extension:**

   ```bash
   npm run build
   ```

4. **Load the extension in Chrome:**
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" in the upper right corner.
   - Click on "Load unpacked" and select the `build` folder from your project directory.

### Testing

- After loading the extension, click the extension icon in the Chrome toolbar to open the popup and view messages.
- You can mock message data in Chrome's local storage for testing. Use the following format:

```json
{
  "messages": [
    {
      "id": "msg123",
      "content": "Team meeting at 3 PM today 🙂",
      "priority": "high",
      "timestamp": "2024-09-30T15:00:00Z",
      "read": false
    }
  ]
}
```

## License

This project is licensed under the MIT License.
