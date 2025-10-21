# 4-Day React Native Training Program

---

## **Day 1**

### 1. Introduction to React Native
- Concept and purpose of React Native  
- React Native vs React for Web  
- How React Native works: JS Bridge vs New Architecture (JSI)  
  *(Update information about the new architecture)*  
- Pros and cons, real-world use cases  

### 2. Environment Setup
- Installing Node.js, Android Studio, Xcode  
- Configuring emulators and connecting physical devices  
- Creating a new project using **Expo CLI** and **React Native CLI**  
- Introduction to the **Hermes** engine  

### 3. First Application – “Hello World”
- Project structure and key files  
- Running the app on emulator and device  
- Fast Refresh and live reloading  

### 4. Debugging and Developer Tools
- Using **Flipper**, **React DevTools**, **Chrome debugger**  
- Inspecting components and logs  
- Understanding and handling common errors  

### 5. Framework Architecture and Core Components
- **View**, **Text**, **Image**, **TextInput**, **ScrollView**, **FlatList**  
- Styling with **StyleSheet** and **Flexbox** layout  
- Differences from standard CSS  

---

## **Day 2**

### 1. Navigation
- Installing and configuring **react-navigation**  
- Stack, Tab, and Drawer navigation patterns  
- Passing parameters between screens  
- Customizing headers and transitions  

### 2. Working with React Native APIs
- Alerts, Modals, Linking, Dimensions, Platform  
- Handling user input and gestures (**TouchableOpacity**, **Pressable**, **PanResponder**)  
- Accessing sensors and device APIs via **Expo** (camera, location, vibration)  

### 3. Communicating with the Backend
- **Fetch** and **Axios** for REST APIs  
- Handling errors, loading states, and retries  
- Displaying and caching remote data  

### 4. Data Persistence
- **AsyncStorage** for local storage  
- Overview of **SQLite** and **SecureStore** (Expo)  

### 5. Hands-on Lab
- Building a simple multi-screen app with API integration  

---

## **Day 3**

### 1. Global State Management
- Local state (**useState**, **useReducer**, **useContext**)  
- **Redux Toolkit** and **Zustand** overview  
- Data persistence and synchronization with backend  

### 2. Animations and UI Libraries
- Basics of the **Animated API** and **LayoutAnimation**  
- Modern approach with **React Native Reanimated** and **Gesture Handler**  
- Overview of UI libraries: **React Native Paper**, **NativeBase**, **UI Kitten**  
- Creating smooth and interactive UI transitions  

### 3. Platform Differences
- iOS vs Android – component and styling differences  
- Conditional rendering using **Platform.select()**  
- Handling permissions, splash screens, icons, and resources  

### 4. Performance Optimization
- Avoiding unnecessary re-renders: **memo**, **useCallback**, **useMemo**  
- Optimizing large lists (**FlatList** best practices)  

### 5. Preparing for Native Integration
- Project setup requirements for New Architecture (**JSI**, **TurboModules**)  
- Verifying build flags and dependencies  

---

## **Day 4**

### 1. Overview of React Native’s New Architecture
- From Bridge to **JSI (JavaScript Interface)**  
- What are **TurboModules** and **Fabric**  
- When and why to use native modules  

### 2. Project Setup for New Architecture
- Enabling New Architecture in Android and iOS builds  
- Understanding generated files and codegen outputs  
- Difference between **Expo** and **React Native CLI** paths  
- Using `expo prebuild` to migrate from Expo to Bare workflow  

### 3. Lab A – Creating a TurboModule

### 4. Lab B – Creating a Fabric Native Component

### 5. Testing and Deployment
- Unit and e2e testing overview (**Jest**, **Detox**)  

### 6. Final Workshop
Develop a small multi-screen app that:
- Fetches data from an API  
- Uses persistent storage  
- Implements at least one native module (**TurboModule** or **Fabric** component)  
- Includes simple animation and navigation  
