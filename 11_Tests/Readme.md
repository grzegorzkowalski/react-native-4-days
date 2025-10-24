# Expo Test App - Jest & Maestro 6 Testing Suite

A comprehensive TypeScript/TSX example Expo application with 6 interesting Jest test tasks and 6 Maestro 6 UI testing flows. All tests include detailed solutions hidden in `<description>` elements.

## 📋 Project Structure

```
expo-test-app/
├── App.tsx                   # Main app component (TypeScript)
├── app.json                  # Expo configuration
├── babel.config.js           # Babel configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
├── INSTALLATION_GUIDE.md    # Complete setup instructions with solutions
├── __tests__/
│   └── App.test.tsx         # Jest test suite with 6 tasks + solutions
└── flows/
    ├── 01-counter-flow.yaml           # Counter increment/reset
    ├── 02-async-flow.yaml             # Async operations
    ├── 03-list-management-flow.yaml   # List add/remove
    ├── 04-complex-journey-flow.yaml   # Complex user flow
    ├── 05-boundary-testing-flow.yaml  # Boundary conditions
    └── 06-error-recovery-flow.yaml    # Loading states & recovery
```

## 🚀 Quick Start

### Installation

See InstalationGuide for complete setup with all solutions.


## 🧪 Jest Test Tasks (6 Total)

All tests are written in TypeScript with detailed solutions in `<description>` elements.

### Task 1: Initial Render
**File:** `__tests__/App.test.tsx`

Tests that the app renders correctly with initial state:
- Verifies app title displays
- Checks counter starts at 0
- Confirms 3 initial tasks render

**Run:** `npm test -- App.test.tsx -t "Initial Render"`

<details>
<summary>📝 Solution (click to reveal)</summary>

Use `render()` to mount component, then verify elements with `screen.getByText()`:

```typescript
it('should render app title and initial state correctly', () => {
  render(<App />);
  expect(screen.getByText('Expo Test App')).toBeOnTheScreen();
  expect(screen.getByText('Counter: 0')).toBeOnTheScreen();
  expect(screen.getByText('Tasks (3)')).toBeOnTheScreen();
});
```

**Key pattern:** Jest-native provides `toBeOnTheScreen()` matcher for React Native components.

</details>

---

### Task 2: Counter Operations
**File:** `__tests__/App.test.tsx`

Tests counter state management:
- Single increment functionality
- Multiple increments accumulate
- Reset clears counter

**Run:** `npm test -- App.test.tsx -t "Counter Operations"`

<details>
<summary>📝 Solution (click to reveal)</summary>

Use `fireEvent.press()` to simulate button clicks and `getByTestID()` for reliable element selection:

```typescript
it('should increment counter when increment button is pressed', () => {
  render(<App />);
  const incrementBtn = screen.getByTestID('increment-btn');
  fireEvent.press(incrementBtn);
  expect(screen.getByText('Counter: 1')).toBeOnTheScreen();
});
```

**Key patterns:**
- Use testID for automation reliability
- Fire events to simulate user interactions
- Verify state changes through rendered text

</details>

---

### Task 3: Async Operations & Loading State
**File:** `__tests__/App.test.tsx`

Tests async operations and state management:
- Loading indicator shows during operation
- Greeting displays after completion
- State reflects current counter value

**Run:** `npm test -- App.test.tsx -t "Async Operations"`

<details>
<summary>📝 Solution (click to reveal)</summary>

Use `waitFor()` to wait for async state changes:

```typescript
it('should display greeting after async operation completes', async () => {
  render(<App />);
  const asyncBtn = screen.getByTestID('async-btn');
  fireEvent.press(asyncBtn);
  
  await waitFor(
    () => {
      expect(screen.getByTestID('greeting-text')).toBeOnTheScreen();
    },
    { timeout: 2000 }
  );
  
  expect(
    screen.getByText("Welcome! You've clicked 1 times.")
  ).toBeOnTheScreen();
});
```

**Key patterns:**
- `waitFor()` waits for async state updates
- Set timeout for operations
- Verify both loading state and final result

</details>

---

### Task 4: List Item Management
**File:** `__tests__/App.test.tsx`

Tests dynamic list operations:
- Adding items increments count
- Removing items decrements count
- Proper state management

**Run:** `npm test -- App.test.tsx -t "List Item Management"`

<details>
<summary>📝 Solution (click to reveal)</summary>

Manipulate list by pressing add/remove buttons:

```typescript
it('should add new task to the list', () => {
  render(<App />);
  const addBtn = screen.getByTestID('add-item-btn');
  fireEvent.press(addBtn);
  
  expect(screen.getByText('Tasks (4)')).toBeOnTheScreen();
  expect(screen.getByText('Task 4')).toBeOnTheScreen();
});

it('should remove task when tapped', () => {
  render(<App />);
  const taskItem = screen.getByTestID('task-item-0');
  fireEvent.press(taskItem);
  
  expect(screen.queryByText('Task 1')).not.toBeOnTheScreen();
});
```

**Key patterns:**
- Use indexed testIDs for list items
- `queryByText()` returns null if not found (safe for "not" assertions)
- Test both add and remove operations

</details>

---

### Task 5: Complex State Interactions
**File:** `__tests__/App.test.tsx`

Tests multiple independent state variables:
- Counter and list maintain separate state
- Operations on one don't affect other
- Async operations reflect all state changes

**Run:** `npm test -- App.test.tsx -t "Complex State Interactions"`

<details>
<summary>📝 Solution (click to reveal)</summary>

Verify multiple states work independently:

```typescript
it('should maintain independent state for counter and list', () => {
  render(<App />);
  
  const incrementBtn = screen.getByTestID('increment-btn');
  const addBtn = screen.getByTestID('add-item-btn');
  
  fireEvent.press(incrementBtn);
  fireEvent.press(addBtn);
  fireEvent.press(incrementBtn);
  
  expect(screen.getByText('Counter: 2')).toBeOnTheScreen();
  expect(screen.getByText('Tasks (4)')).toBeOnTheScreen();
});
```

**Key patterns:**
- Modify multiple states in sequence
- Verify each state independently
- Check that both persist correctly

</details>

---

### Task 6: UI State Validation
**File:** `__tests__/App.test.tsx`

Tests component accessibility and state:
- Button disabled during loading
- All required testIDs present
- Proper element structure

**Run:** `npm test -- App.test.tsx -t "UI State Validation"`

<details>
<summary>📝 Solution (click to reveal)</summary>

Check disabled states and element presence:

```typescript
it('should disable async button while loading', async () => {
  render(<App />);
  const asyncBtn = screen.getByTestID('async-btn');
  fireEvent.press(asyncBtn);
  
  expect(asyncBtn).toBeDisabled();
  
  await waitFor(
    () => {
      expect(asyncBtn).not.toBeDisabled();
    },
    { timeout: 2000 }
  );
});

it('should render all required test IDs', () => {
  render(<App />);
  expect(screen.getByTestID('increment-btn')).toBeTruthy();
  expect(screen.getByTestID('reset-btn')).toBeTruthy();
  expect(screen.getByTestID('async-btn')).toBeTruthy();
  expect(screen.getByTestID('add-item-btn')).toBeTruthy();
  expect(screen.getByTestID('status-btn')).toBeTruthy();
});
```

**Key patterns:**
- Use `toBeDisabled()` matcher
- Verify element presence with `toBeTruthy()`
- Check accessibility requirements

</details>

---

## 🎬 Maestro 6 Test Flows (6 Total)

### Flow 1: Counter Interaction Flow
**File:** `flows/01-counter-flow.yaml`

Basic counter increment and reset operations.

<details>
<summary>📝 Solution</summary>

```yaml
appId: com.expo.testapp
name: Counter Interaction Flow

commands:
  - tapOn:
      id: increment-btn
  - assertVisible:
      text: "Counter: 1"
  - tapOn:
      id: increment-btn
  - tapOn:
      id: increment-btn
  - assertVisible:
      text: "Counter: 3"
  - tapOn:
      id: reset-btn
  - assertVisible:
      text: "Counter: 0"
```

**Key Maestro patterns:**
- `tapOn:` to tap buttons by testID
- `assertVisible:` to verify UI state
- Sequential commands execute in order

</details>

---

### Flow 2: Async Operation Flow
**File:** `flows/02-async-flow.yaml`

Test async operations and loading states.

<details>
<summary>📝 Solution</summary>

```yaml
appId: com.expo.testapp
name: Async Operation Flow

commands:
  - tapOn:
      id: increment-btn
  - tapOn:
      id: increment-btn
  - assertVisible:
      text: "Counter: 2"
  - tapOn:
      id: async-btn
  - wait:
      seconds: 2
  - assertVisible:
      text: "Welcome! You've clicked 3 times."
```

**Key Maestro patterns:**
- `wait:` to pause for async operations
- Verify loading state completion
- Check dynamic content updates

</details>

---

### Flow 3: List Management Flow
**File:** `flows/03-list-management-flow.yaml`

Test adding and removing list items.

<details>
<summary>📝 Solution</summary>

```yaml
appId: com.expo.testapp
name: List Management Flow

commands:
  - assertVisible:
      text: "Tasks (3)"
  - tapOn:
      id: add-item-btn
  - assertVisible:
      text: "Tasks (4)"
  - tapOn:
      id: task-item-0
  - assertVisible:
      text: "Tasks (3)"
  - tapOn:
      id: add-item-btn
  - tapOn:
      id: add-item-btn
  - assertVisible:
      text: "Tasks (5)"
```

**Key Maestro patterns:**
- Verify initial state with `assertVisible:`
- Tap list items using indexed testIDs
- Verify state changes after operations

</details>

---

### Flow 4: Complex User Journey Flow
**File:** `flows/04-complex-journey-flow.yaml`

Multi-step realistic user flow combining all features.

<details>
<summary>📝 Solution</summary>

```yaml
appId: com.expo.testapp
name: Complex User Journey Flow

commands:
  - tapOn:
      id: increment-btn
  - tapOn:
      id: increment-btn
  - assertVisible:
      text: "Counter: 2"
  - tapOn:
      id: add-item-btn
  - tapOn:
      id: add-item-btn
  - assertVisible:
      text: "Tasks (5)"
  - tapOn:
      id: async-btn
  - wait:
      seconds: 2
  - assertVisible:
      text: "Welcome! You've clicked 3 times."
  - tapOn:
      id: task-item-1
  - assertVisible:
      text: "Tasks (4)"
```

**Key Maestro patterns:**
- Combine multiple operations sequentially
- Test realistic user workflows
- Verify complex state changes

</details>

---

### Flow 5: Boundary Testing Flow
**File:** `flows/05-boundary-testing-flow.yaml`

Test with larger numbers and edge cases.

<details>
<summary>📝 Solution</summary>

```yaml
appId: com.expo.testapp
name: Boundary Testing Flow

commands:
  - tapOn:
      id: increment-btn
  - tapOn:
      id: increment-btn
  - tapOn:
      id: increment-btn
  - tapOn:
      id: increment-btn
  - tapOn:
      id: increment-btn
  - assertVisible:
      text: "Counter: 5"
  - tapOn:
      id: add-item-btn
  - tapOn:
      id: add-item-btn
  - tapOn:
      id: add-item-btn
  - assertVisible:
      text: "Tasks (6)"
  - tapOn:
      id: reset-btn
  - assertVisible:
      text: "Counter: 0"
```

**Key Maestro patterns:**
- Repeat commands to test boundaries
- Verify UI handles multiple operations
- Test reset functionality after intensive use

</details>

---

### Flow 6: Error Recovery Flow
**File:** `flows/06-error-recovery-flow.yaml`

Test loading states and state recovery.

<details>
<summary>📝 Solution</summary>

```yaml
appId: com.expo.testapp
name: Error Recovery Flow

commands:
  - tapOn:
      id: async-btn
  - wait:
      seconds: 1
  - assertVisible:
      text: "Loading..."
  - wait:
      seconds: 1.5
  - assertVisible:
      text: "Welcome! You've clicked 1 times."
  - tapOn:
      id: status-btn
  - wait:
      seconds: 0.5
  - tapOn:
      id: async-btn
  - wait:
      seconds: 2
  - assertVisible:
      text: "Welcome! You've clicked 2 times."
```

**Key Maestro patterns:**
- Verify loading states during async
- Test state recovery after operations
- Verify multiple async operations work correctly

</details>

---

## 📊 Test Summary

| Type | Count | Coverage |
|------|-------|----------|
| Jest Test Suites | 6 | State, async, lists, UI |
| Jest Test Cases | 20+ | Individual assertions |
| Maestro Flows | 6 | User journeys |
| TypeScript Types | 100% | Full type safety |
| Total Assertions | 50+ | Comprehensive coverage |

## 📦 Dependencies

### Runtime
- `expo` - React Native framework
- `react` - UI library
- `react-native` - Native runtime

### Dev - Testing
- `jest` - Unit test framework
- `@testing-library/react-native` - Component testing
- `jest-expo` - Expo test preset

### Dev - TypeScript
- `typescript` - Type checker
- `@types/react` - React type definitions
- `@types/react-native` - React Native types
- `@types/jest` - Jest type definitions

### Dev - Build
- `babel-jest` - Jest TypeScript support
- `babel-preset-expo` - Babel configuration
- `@babel/preset-typescript` - TypeScript transpilation

### Dev - UI Testing
- `maestro` - Mobile UI testing framework

## 🚀 Quick Commands

```bash
# Setup
npm install
npm run type-check

# Development
npm start
npm test:watch

# Testing
npm test                    # Run all Jest tests
npm test:coverage          # Coverage report
npm run maestro:test       # Run all Maestro flows
npm run maestro:test:debug # Debug Maestro

# Type checking
npm run type-check         # Check TypeScript
```