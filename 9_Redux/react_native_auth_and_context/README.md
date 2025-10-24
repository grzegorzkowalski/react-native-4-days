# React Native Expo App with TypeScript, Navigation & User Management

A comprehensive React Native Expo application built with TypeScript, featuring authentication, user management, and a jokes CRUD system with drawer navigation.

So far this system is based on a mock data. Your task is to connect this app with real API. Check the documentation of api on https://react-native-api.nis.noinputsignal.com/api.

1. Register user witha form
2. Login user with a form, store tokens in async storage
3. If you'd like, try to add images to user profile (use camera module)
4. Add CRUD to jokes

## Features

- ✅ React Native with Expo
- ✅ TypeScript support with strict typing
- ✅ Authentication system (Login/Register)
- ✅ Drawer navigation with stack navigators
- ✅ User management (List, Detail views)
- ✅ Complete CRUD for jokes system
- ✅ Context-based state management
- ✅ Type-safe navigation
- ✅ Data persistence with AsyncStorage
- ✅ Form validation
- ✅ Responsive UI design

## Project Structure

```
├── App.tsx                          # Main app with navigation setup
├── contexts/                        # React contexts
│   └── AuthContext.tsx             # Authentication context
├── screens/                         # Screen components
│   ├── auth/                       # Authentication screens
│   │   ├── LoginScreen.tsx         # Login form with validation
│   │   └── RegisterScreen.tsx      # Registration form
│   ├── main/                       # Main app screens
│   │   ├── DashboardScreen.tsx     # Dashboard with quick actions
│   │   └── ProfileScreen.tsx       # User profile management
│   ├── users/                      # User management screens
│   │   ├── UsersListScreen.tsx     # List all users with search
│   │   └── UserDetailScreen.tsx    # Individual user details
│   ├── jokes/                      # Jokes CRUD screens
│   │   ├── JokesListScreen.tsx     # List jokes with search & filters
│   │   ├── JokeDetailScreen.tsx    # Individual joke view
│   │   ├── CreateJokeScreen.tsx    # Create new joke form
│   │   └── EditJokeScreen.tsx      # Edit existing joke
│   └── SettingsScreen.tsx          # App settings
├── types/                          # TypeScript type definitions
│   ├── navigation.ts               # Navigation type definitions
│   └── api.ts                      # API data types (based on DTOs)
└── assets/                         # Static assets
```

## Key Features by Screen

### Authentication
- **Login Screen**: Email/password validation, secure authentication
- **Register Screen**: Complete form validation based on CreateUserDto
- **Auth Context**: Persistent login state with AsyncStorage

### User Management
- **Users List**: Search, filter, refresh functionality
- **User Detail**: Complete profile view with actions
- **Profile**: Personal profile management with statistics

### Jokes System (CRUD)
- **Create**: Form with title, content, and category selection
- **Read**: List view with search, filtering, and detailed view
- **Update**: Edit existing jokes with validation
- **Delete**: Secure deletion with confirmation

### Navigation
- **Drawer Navigation**: Main app navigation with icon support
- **Stack Navigators**: Nested navigation for each section
- **Type-Safe**: Complete TypeScript support for all navigation

## Data Types (Based on DTOs)

The app uses TypeScript interfaces that mirror your backend DTOs:

```typescript
interface CreateUserDto {
  name: string;          // 2-100 chars
  lastName: string;      // 2-100 chars  
  dateOfBirth: string;   // ISO date string
  email: string;         // Valid email, unique
  password: string;      // 8+ chars
  photoId?: string;      // Optional UUID
}

interface CreateJokeDto {
  title: string;
  content: string;
  category?: string;
}
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on different platforms:
   ```bash
   npm run android    # Android
   npm run ios        # iOS (requires macOS)
   npm run web        # Web browser
   ```

## Navigation Structure

```
Root Navigator
├── Auth Stack (when not logged in)
│   ├── Login
│   └── Register
└── Main Drawer (when logged in)
    ├── Dashboard
    ├── Users Stack
    │   ├── Users List
    │   └── User Detail
    ├── Jokes Stack
    │   ├── Jokes List
    │   ├── Joke Detail
    │   ├── Create Joke
    │   └── Edit Joke
    ├── Profile
    └── Settings
```

## Key Dependencies

- `@react-navigation/native`: Core navigation
- `@react-navigation/drawer`: Drawer navigation
- `@react-navigation/native-stack`: Stack navigation
- `@react-native-async-storage/async-storage`: Data persistence
- `react-native-gesture-handler`: Gesture support
- `react-native-reanimated`: Animation support
- `react-native-screens`: Native screen optimization
- `react-native-safe-area-context`: Safe area handling

## Development Notes

### Authentication Flow
- Uses AsyncStorage for persistence
- Mock API calls (replace with real endpoints)
- Automatic login state restoration
- Secure logout with state cleanup

### Form Validation
- Client-side validation matching DTO constraints
- Real-time validation feedback
- Character counting for text fields
- Email format validation

### State Management
- Context-based authentication
- Local component state for forms
- Optimistic UI updates
- Error handling with user feedback

### Type Safety
- Strict TypeScript configuration
- Navigation parameter typing
- API response type definitions
- Form data type validation

## Next Steps

1. Replace mock API calls with real backend integration
2. Add image upload functionality for user photos
3. Implement push notifications
4. Add unit and integration tests
5. Set up CI/CD pipeline
6. Add offline support with data synchronization
