# Assignment 1: Displaying Current Date and Time

**Objective:** Practice using the built-in JavaScript Date object and formatting date data for display in a Text component.

## Task:
- Create a functional component named `DateDisplay` that takes no props.
- Inside this component, use the JavaScript `new Date()` object to get the current date.
- Format the date to display the day, month, and year (e.g., DD/MM/YYYY or Month Day, Year).
- Render the formatted date within a `Text` component.

---

# Assignment 2: Image Component with Source and Dimensions

**Objective:** Practice using the Image component, setting source (from the web or local assets), and defining explicit dimensions.

## Task:
- Create a component named `MapImage`.
- Use the `Image` component to display an image of Poland's map (use any publicly accessible URL for the image uri).
- Define explicit width and height styles (e.g., 300 wide by 200 high) to ensure the image is displayed correctly.

---

# Assignment 3: Styling Text with Nesting

**Objective:** Practice styling text elements using nested Text components to achieve bold, italic, and color effects, as React Native does not support standard HTML tags like `<b>` or `<i>`.

## Task:
Display the following text using appropriate styling:

*"Pizza is a very tasty Italian dish. It is made from yeast dough. Tomato sauce is poured onto the dough. The ingredients are placed on top: sausage, yellow cheese, olives, bell peppers. There are many types of pizza, it can be with meat, meatless, fish, or sweet with pineapple."*

Ensure that:
- The ingredients list (sausage, yellow cheese, olives, bell peppers) is bold.
- The word *pizza* (both occurrences) is italicized (or bold-italic if styling allows).
- The word *pineapple* is displayed in yellow color.

---

# Assignment 4: Flexbox Layout Recreation

**Objective:** Master basic Flexbox properties (flexDirection, justifyContent, alignItems) and StyleSheet usage to replicate a complex layout.

## Task:
Using the `StyleSheet` object and the `View` component, recreate the following block layout:
- A main container that fills the screen.
- One Blue rectangle at the top (e.g., `flex: 1`).
- One Red rectangle in the middle (e.g., `flex: 2`).
- A row at the bottom (e.g., `flex: 1`) containing two equal-sized Yellow rectangles side-by-side.

---

# Assignment 5: Functional and Class Component Structure

**Objective:** Practice creating and integrating both functional and class-based components using modern naming conventions and TypeScript interfaces.

## Task
1. Create a functional component named `UserName` (using an interface) that displays your first name.

2. Create a class-based component named `UserSurname` (using `Component` from React) that displays your surname or a nickname.

3. Import both components into your main `index.tsx` file and render them.

4. Run the application using Expo/Android Emulator/Web Preview to verify the output.


# Assignment 6: Nested Components and Isolation of Styles

**Objective:** Practice component composition and applying isolated styles using the StyleSheet.create object and flex layout.

## Task:
- Create a component named `ColorBlock` (reusable) which accepts a prop `color: string` and a prop `size: number`.
- In a main functional component `LayoutWithBlocks`, render three instances of `ColorBlock` with different colors (e.g., Red, Green, Blue).
- Ensure each `ColorBlock` instance has an external margin of 10px and a fixed size (e.g., 80x80).
- Use a `View` container with `flexDirection: 'row'` in `LayoutWithBlocks` to display them horizontally.

---

# Assignment 7: Data Transfer using Props and Destructuring

**Objective:** Practice transferring complex data structures using component props and utilizing object destructuring for clean code.

## Task:
- In `index.tsx`, create a TypeScript interface and an object named `inviteData` containing details for a birthday party:
    - `date: string`
    - `time: string`
    - `location: string`
    - `dressCode: string`
- Create a functional component named `InvitationCard` which receives these data fields via props.
- Use destructuring in the `InvitationCard` component's parameter list (`({ date, time, location, dressCode }) => ...`) to access the props.
- Display the invitation content and all data fields clearly within the `InvitationCard`.

---

# Assignment 8: Initial State Data Display (Pre-Hook)

**Objective:** Establish a baseline for displaying dynamic data by passing a snapshot of time data through props.

## Task:
- In `index.tsx`, create a variable `initialDateTime` and assign it the current date and time formatted as a string using the `Date()` object and a method like `toLocaleTimeString()` or `toLocaleString()`.
- Create a functional component `DataTimer` that accepts a prop `currentTime: string`.
- Pass the `initialDateTime` variable to the `DataTimer` component and display the time/date string.

---

# Assignment 9: Real-Time Digital Clock (Hooks: useState & useEffect)

**Objective:** Introduce state management (useState) and side effects (useEffect) with cleanup (setInterval) to create a dynamically updating UI.

## Task:
- Modify the previous assignment using `index.tsx` as the main component.
- Add the `useState` hook to hold the current time string. Initialize the state with the current time.
- Use the `useEffect` hook to run a side effect once upon component mounting (`[]` dependency array).
- Inside `useEffect`, use `setInterval` (e.g., every 1000ms) to update the state with a new time string.
- Ensure you return a cleanup function from `useEffect` to clear the interval when the component unmounts.
- Pass the state value (instead of a static variable) to the `DataTimer` component.

**Result:** You've created a functional digital clock! 🕒

---

# Assignment 10: State Update via User Interaction

**Objective:** Practice using the onPress handler on a button to update the state of a parent component with a dynamic value.

## Task:
- In `index.tsx`, initialize a state variable `randomNumber` (e.g., initialized to 0).
- Create a functional component named `RandomNumberGenerator`.
- Inside `RandomNumberGenerator`, include a `Button` component. The button's purpose is to generate a new random number.
- Pass a callback function (setter from `useState`) from `index.tsx` as a prop to `RandomNumberGenerator`.
- In the button's `onPress` handler, call the passed callback function to update the parent's state with a random integer between 1 and 10.
    - **Hint for generation:** `Math.floor(Math.random() * (10 - 1 + 1) + 1)`
- Display the current value of `randomNumber` from the state of `index.tsx`.