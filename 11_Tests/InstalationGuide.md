# 🚀 Complete Installation & Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

<details>
<summary>1. Node.js & npm</summary>

**macOS:**
```bash
# Using Homebrew
brew install node

# Verify installation
node --version  # Should be v18+
npm --version   # Should be v9+
```

**Windows:**
- Download from [nodejs.org](https://nodejs.org)
- Install the LTS version
- Verify in PowerShell: `node --version`

**Linux:**
```bash
sudo apt-get update
sudo apt-get install nodejs npm
```

**Solution:** If npm is slow, use npm cache clean and consider yarn as alternative: `npm install -g yarn`

</details>

<details>
<summary>2. Expo CLI</summary>

```bash
npm install -g expo-cli

# Verify
expo --version
```

**Solution:** If you get permission errors on macOS/Linux, use `sudo` or fix npm permissions: `npm config set prefix ~/.npm-global`

</details>

<details>
<summary>3. Git (Optional but recommended)</summary>

**macOS:**
```bash
brew install git
```

**Windows:**
- Download from [git-scm.com](https://git-scm.com)
- Use Git Bash for commands

**Linux:**
```bash
sudo apt-get install git
```

</details>

<details>
<summary>4. Java Development Kit (For Maestro on Android)</summary>

**macOS:**
```bash
brew install openjdk@11
# Add to PATH (add to ~/.zshrc or ~/.bash_profile)
export PATH="/usr/local/opt/openjdk@11/bin:$PATH"
```

**Windows:**
- Download from [oracle.com](https://www.oracle.com/java/technologies/downloads/)
- Set `JAVA_HOME` environment variable

**Linux:**
```bash
sudo apt-get install openjdk-11-jdk
```

**Solution:** Verify with `java -version` - should show Java 11+

</details>

<details>
<summary>5. Maestro CLI (For UI Testing)</summary>

```bash
# macOS/Linux
curl -Ls "https://get.maestro.mobile.dev" | bash

# Windows (PowerShell as Admin)
iwr -useb https://get.maestro.mobile.dev | iex

# Verify
maestro --version
```

**Solution:** If installation fails, check that Homebrew is installed: `brew --version`

</details>

---

## Project Setup

### Step 1: Navigate to Project Directory

```bash
cd expo-test-app
```

### Step 2: Install Dependencies

```bash
# Using npm
npm install

# OR using yarn (faster)
yarn install
```

**What gets installed:**
- React Native and Expo runtime
- Jest testing framework
- React Testing Library
- TypeScript compiler
- Maestro CLI
- Babel transpiler
- All @types packages for TypeScript

<details>
<summary>⏱️ Typical installation time: 3-8 minutes</summary>

First installation is slower. Subsequent installs are faster due to npm cache.

If installation is very slow:
```bash
npm cache clean --force
npm install
```

**Solution:** If you get `ERESOLVE unable to resolve dependency tree`, use:
```bash
npm install --legacy-peer-deps
```

</details>

### Step 3: Verify TypeScript Setup

```bash
npm run type-check
```

Expected output: Should compile without errors

<details>
<summary>✅ Successful TypeScript check means:</summary>

- TypeScript compiler found all type definitions
- All `.tsx` files have valid syntax
- No type errors in code
- Ready for development

**Solution:** If you get errors about missing types, run:
```bash
npm install --save-dev @types/react @types/react-native
```

</details>

---

## Testing Environment Setup

### Jest Unit Testing

#### Verify Jest is Configured

```bash
npm test -- --version
```

Expected output: `29.x.x`

#### Run Your First Test

```bash
npm test -- App.test.tsx
```

<details>
<summary>Expected output:</summary>

```
 PASS  __tests__/App.test.tsx
  Task 1: Initial Render
    ✓ should render app title and initial state correctly
    ✓ should display all initial tasks
  Task 2: Counter Operations
    ✓ should increment counter when increment button is pressed
    ...
  Tests: 20 passed, 20 total
```

**Solution:** If tests fail, ensure:
1. App.tsx is in root directory
2. `npm install` completed successfully
3. TypeScript is configured (tsconfig.json exists)

</details>

#### Run All Tests with Coverage

```bash
npm run test:coverage
```

This shows which parts of your code are tested:
- Line coverage
- Branch coverage
- Function coverage
- Statement coverage

#### Watch Mode (Auto-rerun on Changes)

```bash
npm test:watch
```

Press:
- `a` - run all tests
- `f` - run only failed tests
- `p` - filter by filename pattern
- `q` - quit

<details>
<summary>💡 Watch mode is great for development because:</summary>

- Tests re-run automatically when you save files
- Provides fast feedback on changes
- Helps catch regressions immediately
- No need to manually restart tests

</details>

---

### Maestro UI Testing

#### Prerequisites Check

```bash
# Verify Maestro installation
maestro --version

# Verify Java installation (needed for Android)
java -version

# Verify either Android Emulator or iOS Simulator is available
```

<details>
<summary>🔧 Setting Up Android Emulator</summary>

**Using Android Studio:**
1. Download Android Studio from [developer.android.com](https://developer.android.com/studio)
2. Open Android Virtual Device Manager
3. Create or start an existing emulator
4. Verify with: `adb devices`

**Using Command Line:**
```bash
# List available emulators
emulator -list-avds

# Start emulator
emulator -avd {emulator_name}
```

**Solution:** If emulator doesn't start, ensure you have enough disk space (min 4GB)

</details>

<details>
<summary>🔧 Setting Up iOS Simulator (macOS only)</summary>

```bash
# Install Xcode Command Line Tools (one-time)
xcode-select --install

# Start simulator
open -a Simulator

# Verify
xcrun simctl list
```

</details>

#### Build Test App

Before running Maestro tests, build the app:

```bash
# For Android
eas build --platform android --profile preview

# For iOS (macOS only)
eas build --platform ios --profile preview
```

<details>
<summary>Or use a development build:</summary>

```bash
# Start Expo development server
npm start

# Then use Maestro with the development build
maestro test flows/01-counter-flow.yaml --debug
```

**Solution:** Development mode is faster for testing during development

</details>

#### Run First Maestro Flow

```bash
npm run maestro:test -- flows/01-counter-flow.yaml
```

<details>
<summary>Expected output:</summary>

```
Starting test: Counter Interaction Flow
Launching app...
✓ Tap on increment-btn
✓ Assert visible: "Counter: 1"
✓ Tap on increment-btn
✓ Tap on increment-btn
✓ Assert visible: "Counter: 3"
✓ Tap on reset-btn
✓ Assert visible: "Counter: 0"
Test passed!
```

**Solution:** If app doesn't launch, ensure:
1. Emulator/Simulator is running
2. Correct appId in flow file matches app bundle
3. Test app is built and accessible

</details>

#### Run All Maestro Flows

```bash
npm run maestro:test
```

This sequentially runs all flows in `flows/` directory:
1. `01-counter-flow.yaml`
2. `02-async-flow.yaml`
3. `03-list-management-flow.yaml`
4. `04-complex-journey-flow.yaml`
5. `05-boundary-testing-flow.yaml`
6. `06-error-recovery-flow.yaml`

#### Debug Mode

```bash
npm run maestro:test:debug
```

Debug mode provides:
- Screenshot after each step
- Detailed logs
- Element tree inspection
- Ability to pause and inspect state

---

## Development Server

### Start the App in Development Mode

```bash
npm start
```

Options after start:
- `i` - Open iOS Simulator
- `a` - Open Android Emulator
- `w` - Open web browser
- `r` - Reload app
- `q` - Quit

<details>
<summary>For web development:</summary>

```bash
npm start -- --web
```

Then navigate to http://localhost:19006

</details>

### Hot Reload vs Full Reload

- **Fast Refresh (default):** Preserves app state, only updates changed code
- **Full Reload:** Restarts entire app

Press `r` twice to full reload

---

## Troubleshooting Common Issues

### Issue: "npm install" Takes Forever

<details>
<summary>Solution:</summary>

```bash
# Clear cache
npm cache clean --force

# Increase timeout
npm config set fetch-timeout 600000

# Retry install
npm install
```

</details>

### Issue: TypeScript Errors After Install

<details>
<summary>Solution:</summary>

```bash
# Reinstall types
npm install --save-dev @types/react @types/react-native @types/jest

# Run type check
npm run type-check
```

</details>

### Issue: Jest Tests Can't Find Modules

<details>
<summary>Solution:</summary>

Ensure `jest` config in package.json includes:
```json
"moduleFileExtensions": ["ts", "tsx", "js", "jsx"]
```

If still failing:
```bash
npm install --save-dev ts-jest babel-jest
```

</details>

### Issue: Maestro Can't Connect to App

<details>
<summary>Solution:</summary>

1. Ensure emulator/simulator is running
2. Verify appId in flow file matches app's bundle identifier
3. Rebuild app:
   ```bash
   npm start -- --clear
   ```
4. Check device connectivity:
   ```bash
   adb devices  # For Android
   ```

</details>

### Issue: "Port 8081 already in use"

<details>
<summary>Solution:</summary>

```bash
# Kill process on port 8081
# macOS/Linux:
lsof -ti:8081 | xargs kill -9

# Windows (PowerShell):
Get-Process -Id (Get-NetTCPConnection -LocalPort 8081).OwningProcess | Stop-Process
```

</details>

---

## Running Tests in CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Type check
        run: npm run type-check
      
      - name: Run Jest tests
        run: npm test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

---

## Next Steps

1. **Run Jest tests:** `npm test`
2. **Start dev server:** `npm start`
3. **Review test files:** Open `__tests__/App.test.tsx`
4. **Try Maestro flows:** `npm run maestro:test`
5. **Make changes and test:** Edit code and run tests

---

## Quick Reference Commands

```bash
# Installation
npm install                    # Install all dependencies
npm run type-check            # Check TypeScript types

# Development
npm start                     # Start Expo development server
npm run type-check            # Run TypeScript compiler

# Testing - Jest
npm test                      # Run all tests
npm test:watch               # Run tests in watch mode
npm test:coverage            # Generate coverage report

# Testing - Maestro
npm run maestro:test         # Run all Maestro flows
npm run maestro:test:debug   # Run with debug output
maestro test flows/01-counter-flow.yaml  # Run specific flow

# Troubleshooting
npm cache clean --force      # Clear npm cache
npm install --legacy-peer-deps # If dependency conflicts
```

---

## Resource Links

- [Expo Documentation](https://docs.expo.dev)
- [Jest Documentation](https://jestjs.io)
- [React Testing Library](https://testing-library.com/react-native)
- [Maestro Documentation](https://maestro.mobile.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [React Native Documentation](https://reactnative.dev)

---

**Installation complete!** 🎉

You're now ready to run tests. Start with: `npm test`