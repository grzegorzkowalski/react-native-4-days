# Assignment 1: Understanding Console Messages

**Objective:** This assignment aims to practice using basic console methods to display different types of messages.

## Description

In your `App` folder in `index.tsx` file, practice using different console methods to understand how they appear in the console:

1. Use `console.log()` to display a simple message, for example:
```javascript
console.log("Hello! This is a regular log message.");
```

2. Use `console.warn()` to display a warning message (this will appear in yellow), for example:
```javascript
console.warn("Warning: This is a test warning message!");
```

3. Use `console.error()` to display an error message (this will appear in red), for example:
```javascript
console.error("Error: This is a test error message!");
```

4. Add multiple console messages with different information to see how they stack in the console.

## Practical Goal

Run the application and open the console (terminal where Expo is running). Observe the different colors and formats of each message type. Understand which console method is appropriate for different situations (information, warnings, errors).

---

# Assignment 2: Exploring the Developer Menu

**Objective:** This assignment focuses on familiarizing yourself with the React Native Developer Menu and its basic options.

## Description

Learn how to access and navigate the Developer Menu in your React Native application.

## Steps

1. **Open the Developer Menu:**
    - If using Expo Go on a physical device: Shake your device
    - If using iOS Simulator: Press `Cmd + D` (Mac) or `Ctrl + D` (Windows/Linux)
    - If using Android Emulator: Press `Cmd + M` (Mac) or `Ctrl + M` (Windows/Linux)
    - In the Expo CLI terminal: Press `m`

2. **Explore the following options:**
    - **Reload**: Manually reload your application
    - **Toggle Performance Monitor**: Enable this to see FPS (frames per second) and memory usage on screen
    - **Toggle Element Inspector**: Enable this to inspect UI elements (we'll use this more later)
    - **Debug Remote JS**: Opens debugging tools in your browser

3. **Practice reloading:**
    - Change some text in your `index.tsx`
    - Save the file and observe Fast Refresh automatically updating the app
    - Try manually reloading using the Developer Menu

4. **Enable Performance Monitor:**
    - Toggle on the Performance Monitor
    - Observe the RAM and FPS displayed on screen
    - Keep it running while you interact with the app

## Practical Goal

Become comfortable accessing the Developer Menu and understand what information the Performance Monitor provides. This will be your main tool for development and debugging.

---

# Assignment 3: Creating Your First Intentional Error

**Objective:** Learn how to read and understand error messages when something goes wrong in your code.

## Description

Intentionally create a simple error to see how React Native displays error information and learn how to fix it.

## Steps

1. In your `index.tsx` file, find where it says `<Text>` with some content inside.

2. **Create a syntax error**.

3. Save the file and observe:
    - The app will show a **red error screen** (Redbox)
    - Read the error message carefully - it will tell you what's wrong and where
    - Note the file name and line number where the error occurred

4. **Fix the error**.

## Practical Goal

Learn to read error messages without fear. Understand that:
- Red screens (Redbox) indicate critical errors that stop the app
- Error messages tell you exactly what's wrong and where to look
- Most errors are simple typos or missing code that are easy to fix once you understand the message
- Fast Refresh will automatically update your app once you fix the error

Good luck with debugging!