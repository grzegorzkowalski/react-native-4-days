# Tutorial: Creating and Building Expo Apps with EAS

## Introduction

This tutorial will walk you through the process of creating a default Expo application from scratch and building it using EAS (Expo Application Services). EAS is a cloud service from Expo that allows you to build iOS and Android applications without needing a local development environment.

---

## Prerequisites

Before you start, make sure you have installed:

- **Node.js** (version 18 or higher) - download from https://nodejs.org/
- **npm** or **yarn** - usually installed with Node.js
- **Expo CLI** - we'll install this in the next step
- **Expo Account** - create a free account at https://expo.dev/

Verify Node.js installation:
```bash
node --version
npm --version
```

---

## Step 1: Creating a New Expo Project with TypeScript

Create a new Expo project with the latest version and TypeScript support with a single command:

```bash
npx create-expo-app@latest --template
```

After running the command:
- The system will ask you to choose a template
- Select **TypeScript template** (or `blank-typescript`)
- Enter a project name, e.g., `MyAwesomeApp`
- Wait for dependencies to install

Alternatively, if you want to create a project with TypeScript directly without prompts:

```bash
npx create-expo-app@latest MyAwesomeApp --template
```

Replace `MyAwesomeApp` with your project name (no spaces).

Navigate to the project directory:
```bash
cd MyAwesomeApp
```

### Verifying Installation

Check if the project was created correctly:

```bash
npm --version
node --version
```

Check the Expo CLI version by running:

```bash
npx expo --version
```

### Project Structure

After creating the project, you'll see the following structure:

```
MyAwesomeApp/
├── app.json
├── App.tsx
├── tsconfig.json
├── package.json
├── babel.config.js
├── node_modules/
├── .expo/
├── .gitignore
├── eas.json
└── assets/
    ├── favicon.png
    ├── icon.png
    └── splash.png
```

- **App.tsx**: Main application component (TypeScript)
- **app.json**: Expo configuration (name, icon, version, splash screen)
- **tsconfig.json**: TypeScript compiler configuration
- **babel.config.js**: Babel configuration for transpilation
- **eas.json**: Configuration for EAS services (build and submit)
- **package.json**: Project dependencies and npm scripts
- **assets/**: Application resources (icons, splash screen)
- **.expo/**: Internal Expo files
- **.gitignore**: Files ignored by Git

---

## Step 2: Testing the Application Locally

Run the application on a local development server:

```bash
expo start
```

Alternatively:
```bash
npm start
```

In the terminal, you'll see a menu with options:

- **i** - opens the app on iOS emulator (macOS)
- **a** - opens the app on Android emulator
- **w** - opens the app in a browser (limited support)
- **j** - opens the debugger menu
- **r** - reloads the app
- **m** - toggles experimental mode

You can also scan the QR code using the **Expo Go** app on your phone (available on App Store and Google Play).

---

## Step 3: Configuration for EAS

### 3.1 Logging into Expo

Log in to your Expo account using the CLI:

```bash
expo login
```

Enter your credentials (email and password).

Check if you're logged in:
```bash
expo whoami
```

### 3.2 Initializing EAS

In your project's main directory, initialize EAS:

```bash
eas build:configure
```

The system will ask you:
- Whether you want to build for iOS and Android
- Type of build (managed workflow)

After completion, an `eas.json` file will be created with default configuration.

### 3.3 Editing app.json

Open the `app.json` file and make sure it contains the required information:

```json
{
  "expo": {
    "name": "MyAwesomeApp",
    "slug": "my-awesome-app",
    "version": "1.0.0",
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTabletMode": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

Important fields:
- **slug**: unique application identifier (letters, numbers, hyphens only)
- **version**: version number (must increment with each new build)
- **ios/android**: platform-specific configuration

---

## Step 4: Preparing to Build

### 4.1 Generating Certificates (Android)

For Android, EAS automatically manages signing keys. On the first build:

```bash
eas build --platform android --auto-submit
```

The `--auto-submit` flag submits the completed build to Google Play Console.

### 4.2 Preparing for iOS

For iOS, you need to:
1. Have an Apple Developer account ($99/year)
2. Generate a Team ID in your Apple Developer Account
3. Add the Team ID to `eas.json`:

```json
{
  "build": {
    "ios": {
      "enterpriseProvisioning": "adhoc"
    }
  }
}
```

Alternatively, EAS can automatically manage certificates during the first build.

---

## Step 5: Building the Application with EAS

### 5.1 Building for Android

To build the application for Android:

```bash
eas build --platform android
```

Process:
1. EAS uploads your code to its servers
2. Compiles the application in the cloud
3. Generates an `.apk` or `.aab` (Android App Bundle) file
4. Displays a download link

### 5.2 Building for iOS

To build the application for iOS:

```bash
eas build --platform ios
```

The process is identical, but to finally publish on the App Store, you need an Apple Developer account.

### 5.3 Building for Both Platforms

To build simultaneously for iOS and Android:

```bash
eas build --platform all
```

### 5.4 Building Preview (for testing)

To build a test version with preview:

```bash
eas build --platform android --profile preview
```

---

## Step 6: Monitoring the Build

While building, you can:

1. **Track progress** - EAS will display status in the terminal
2. **Open logs** - use the provided link to review logs
3. **Cancel build** - press `Ctrl+C`

When the build completes, you'll see:
- Application download link
- Version information
- Option to share with testers

---

## Step 7: Publishing to App Store / Google Play

### For Android (Google Play)

```bash
eas submit --platform android
```

Required:
- Google Play Developer account ($25, one-time)
- Google Play Console account
- Remote version with correct signing

### For iOS (App Store)

```bash
eas submit --platform ios
```

Required:
- Apple Developer account ($99/year)
- Apple certificates
- TestFlight (optionally for beta testing)

---

## Step 8: Modifying Application Code

Edit the `App.tsx` file to customize your application:

```typescript
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App(): React.ReactNode {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Expo!</Text>
      <Text>My first mobile app with TypeScript</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
```

After saving changes, the application will automatically reload (if you're running `expo start`).

---

## Step 9: Adding Libraries (Packages)

To add a library (e.g., React Navigation):

```bash
expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native @react-navigation/bottom-tabs
```

Or using expo-cli:

```bash
expo install expo-location expo-camera expo-contacts
```

---

## Step 10: TypeScript Configuration

An Expo project with TypeScript automatically includes `tsconfig.json` with default settings. To customize TypeScript compilation, edit the `tsconfig.json` file:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "jsx": "react-jsx",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"]
}
```

Main options:
- **strict: true** - enables strict type checking
- **paths** - allows import aliases (e.g., `@/components`)
- **target: ES2020** - specifies the target JavaScript version

---

## Step 11: Useful EAS Commands

```bash
# Check build history
eas build:list

# View build details
eas build:view <BUILD_ID>

# Cancel old builds
eas build:cancel <BUILD_ID>

# Configure local logs
eas build --local

# EAS help
eas build --help
```

---

## Step 12: Troubleshooting

### Problem: "npx: command not found"
**Solution**: Make sure you have Node.js 18+ installed:
```bash
node --version
npm --version
```

If the problem persists, reinstall Node.js from https://nodejs.org/

### Problem: "Not authenticated"
**Solution**: Log in to Expo:
```bash
expo login
```

### Problem: Build fails
**Solution**: 
1. Check logs on the EAS website
2. Make sure `app.json` is correct
3. Try `eas build --local` for local debugging

### Problem: Errors installing dependencies
**Solution**: Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Step 13: Resources

- **Expo Documentation**: https://docs.expo.dev/
- **EAS Documentation**: https://docs.expo.dev/eas/
- **React Native Docs**: https://reactnative.dev/
- **Expo Community**: https://forums.expo.dev/

---

## Summary

Congratulations! You've learned:

✅ Create a new Expo project with the latest version
✅ Configure TypeScript in Expo
✅ Test the application locally
✅ Configure EAS
✅ Build applications for iOS and Android
✅ Publish applications to stores
✅ Write code in TypeScript with full type safety

Now you can continue developing your application, add new features, use TypeScript for better code quality, and publish updates!

Good luck with coding! 🚀
