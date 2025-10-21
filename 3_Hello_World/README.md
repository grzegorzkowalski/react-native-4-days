# ✅ Task 1 – Creating and Running Your First Expo App

**Goal:**  
Create and run a new Expo project (mobile, web, and emulator) using **Expo Router** and **TypeScript**.

---

## 1️⃣ Prerequisites
- Install the latest **Node.js LTS**.
- Install the **Expo Go** app on your phone (Google Play / App Store).
- *(Optional)* Install **Android Studio** with an Android Emulator.

---

## 2️⃣ Create a New Project

```bash
# inside your workshop folder
npx create-expo-app@latest Hello_World_App --template
```

In the setup wizard, choose **“Blank + TypeScript”**.

> 💡 The project will use the new file-based routing system (`app/` folder).  
> Edit your main screen inside `app/index.tsx`. 

---

## 3️⃣ Start the Development Server

```bash
cd 2_Hello_World
npm install
npm start start
```

This opens the **Expo DevTools (Metro bundler)** in your browser.

### Terminal shortcuts:
- `a` → open in Android emulator
- `i` → open in iOS Simulator (macOS only)
- `w` → open in the web browser
- `r` → restart the bundler

---

## 4️⃣ Run on a Physical Device (Expo Go)

Scan the QR code from DevTools using the **Expo Go** app.

Make sure your phone and computer are on the **same Wi-Fi network**.

For iOS, start with:

```bash
npx expo start --tunnel
```

---

## 5️⃣ Run in the Browser (Web)

```bash
npx expo start --web
```

Or simply press **`w`** in the running terminal.

---

## 6️⃣ Run in an Android Emulator

Start with:

```bash
npx expo start
```

Then press **`a`**.

Alternatively, build and run a full native project (usually not needed at this stage):

```bash
npx expo run:android
```

---

## 7️⃣ Fast Refresh

Open `app/index.tsx` and change something in the JSX.

Save — the screen will instantly update thanks to **Fast Refresh** (which replaces the old “Hot Reload”).

---

✅ **Done!** You’ve successfully created and run your first Expo app on mobile, web, and emulator.
