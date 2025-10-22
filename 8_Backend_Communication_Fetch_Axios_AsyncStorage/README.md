## Get IP Address

1. Send a request for your IP address and wait for the response.
2. Use the service `https://www.ipify.org/`.
3. After receiving the response, query the service `https://ip-api.com/` for details about your IP address.
4. When data from the second service is returned, render it.
5. Don't render the component until the second response is received.

<details>
<summary>Sample solution</summary>

```typescript
// types/ip.types.ts
export interface IpInfo {
  ip: string;
  country: string;
  city: string;
  timezone: string;
}

// app/index.tsx
import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default function IpScreen() {
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIpInfo();
  }, []);

  const fetchIpInfo = async () => {
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const { ip } = await ipResponse.json();
      
      const detailsResponse = await fetch(`https://ip-api.com/json/${ip}`);
      const details = await detailsResponse.json();
      
      setIpInfo({
        ip,
        country: details.country,
        city: details.city,
        timezone: details.timezone
      });
    } catch (error) {
      console.error('Error fetching IP info:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View>
      <Text>IP: {ipInfo?.ip}</Text>
      <Text>Country: {ipInfo?.country}</Text>
      <Text>City: {ipInfo?.city}</Text>
      <Text>Timezone: {ipInfo?.timezone}</Text>
    </View>
  );
}
```
</details>

---

## Weather App (Pogodynka)

### Project Description
Create a mobile weather application using modern technology stack with Expo Router, Axios, and React Query.

### Technical Requirements

#### 1. Project Initialization

```bash
npx create-expo-app@latest weather-app --template
cd weather-app
```

#### 2. Install Required Packages

```bash
# Axios for HTTP requests
npm install axios

# React Query for server state management
npm install @tanstack/react-query

#### 3. Project Configuration

Create a `.env` file in the project root:

```env
EXPO_PUBLIC_WEATHER_API_KEY=your_openweather_key
EXPO_PUBLIC_PIXABAY_API_KEY=your_pixabay_key
```

### Task Steps

1. Create a new Expo application with TypeScript template.

2. Set up navigation with 3 screens/tabs: `Home`, `CityWeather`, `FindWeather` using Expo Router.

3. On each screen, prepare buttons that allow navigation between screens.

4. In the Home component, create an array with a list of selected cities (e.g., Warsaw, Kraków, Gdańsk, Wrocław, Poznań, Łódź).

5. Use the `FlatList` component to render the list of cities with a button redirecting to the `CityWeather` subpage.

6. In the redirect, you should pass the city name as a parameter.

7. Create an account on the portal `https://openweathermap.org/api`.

8. In the `CityWeather` component, based on the passed city name, create a request to the above API that will return the weather forecast using Axios and React Query.

9. Display in the component: city name, current temperature, and general weather description.

10. Create an account on the portal `https://pixabay.com/api/docs/`.

11. Based on the weather description from the Weather API, send a request to Pixabay portal and find an image illustrating the described weather.

12. Display the image in the component.

13. In the `FindWeather` component, create a `TextInput` and `Button`. Allow the user to enter a city name and save it in the component's state.

14. After pressing the button, send a request to the API for weather for the given city.

15. If weather for the given city is found, execute steps from points 9-12.

16. If weather for the given city is not found, display a component with the message "Error 404: No data available".

### Key Features to Implement

- **Axios Configuration**: Create axios instances with interceptors for error handling
- **React Query Hooks**: Create custom hooks `useWeather` and `useWeatherImage` for data fetching
- **TypeScript Types**: Define proper interfaces for WeatherData and PixabayImage
- **Error Handling**: Handle 404 errors and network failures gracefully
- **Loading States**: Display loading indicators during API calls
- **Query Cache**: Configure React Query cache

### Project Structure

```
weather-app/
├── app/
│   ├── _layout.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── city-weather.tsx
│   │   └── find-weather.tsx
├── components/
│   ├── WeatherCard.tsx
│   └── ErrorMessage.tsx
├── services/
│   ├── api.ts
│   ├── weatherService.ts
│   └── pixabayService.ts
├── hooks/
│   ├── useWeather.ts
│   └── useWeatherImage.ts
├── types/
│   └── weather.types.ts
├── constants/
│   ├── cities.ts
│   └── config.ts
└── providers/
    └── QueryProvider.tsx
```

### Bonus Challenges

- Add pull-to-refresh functionality
- Implement search history using AsyncStorage
- Add unit conversion (Celsius/Fahrenheit)
- Display extended forecast (5-day)
- Add location-based weather using device GPS
- Implement offline mode with cached data
- Add weather alerts and notifications

---

## All Over the World!!!

1. Create an application whose goal is to display a list of all countries on our globe. The application fetches data from a public API located at [Click!](https://countrylayer.com/documentation/). Examine the data retrieved from the API.

2. You must create a free account to receive an API key [at this address](https://manage.countrylayer.com/signup/free).

3. Use the `FlatList` component to display a list of countries, flags, and detailed information about the country.

4. Don't worry that not all flags are available.

5. Check in the console what data you receive from the server.

6. Need inspiration:
    - Display the country's capital.
    - Display the country's name in its native language.
    - Provide the approximate distance from the country's capital to your hometown. Get your city's coordinates from Google Maps and the capital's coordinates from the `capitalLangLong.js` file in the data folder.

```javascript
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
```

7. If you exceed the request limit, you have data additionally saved in the `data` folder.

### Modern Implementation Tips

- Use Expo Router for navigation
- Implement with TypeScript for type safety
- Use Axios with React Query for data fetching
- Store countries in SQLite for offline access
- Cache API responses to minimize requests
- Create reusable country card components
- Add search and filter functionality
- Implement pagination for better performance

---

## Fetch with Navigation

1. Connect to https://jsonplaceholder.typicode.com/ and fetch users by making a request to the appropriate endpoint.

2. Print what you received in the console.

3. Loop through the response data and generate an element for each user, filling it with appropriate data.

4. Add a `show-posts` button to each element. After clicking such a button, go to a new view and based on the passed parameter, fetch and display a list of posts for the given user.

### Modern Implementation

- Use Expo Router for file-based routing
- Create `app/index.tsx` for users list
- Create `app/posts/[userId].tsx` for dynamic user posts
- Use Axios with React Query for data fetching
- Implement TypeScript interfaces for User and Post types
- Add loading states and error handling
- Use FlatList for optimal rendering performance

---

## Async Storage

1. Install the AsyncStorage library: `npx expo install @react-native-async-storage/async-storage`

2. Save your name to AsyncStorage. Then retrieve it to the component's state (do this also for the initial `name` value in useState).

3. Inside the `handleGame` function, write the logic for the rock, paper, scissors game.

4. After each game, save information about the winner to AsyncStorage. Note: data should be saved to one key in the format: `['Computer won', 'Name won', 'Computer won']` etc. Remember that you can save data in AsyncStorage as a string. Use `JSON.stringify` and `JSON.parse` functions to save and read the history.

5. Show the history on the screen - you need to pass it from AsyncStorage to the state.

6. Turn off the application and turn it on again to see if the data persisted.

### Implementation Guide

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

type Choice = 'rock' | 'paper' | 'scissors';
type GameResult = string;

// Save data
const saveHistory = async (history: GameResult[]) => {
  try {
    await AsyncStorage.setItem('gameHistory', JSON.stringify(history));
  } catch (error) {
    console.error('Error saving history:', error);
  }
};

// Load data
const loadHistory = async (): Promise<GameResult[]> => {
  try {
    const saved = await AsyncStorage.getItem('gameHistory');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading history:', error);
    return [];
  }
};
```

### Bonus Features

- Add game statistics (wins, losses, draws)
- Implement a reset button to clear history
- Add animations for game choices
- Create a leaderboard
- Add sound effects

---

## Capitals Game

1. Remember the API with the list of countries from one of the previous tasks?

2. Randomly select one country key from the list in the `countries` variable.

3. Send a request to the API and fetch information about the country. Save the information to state and show the user the country's name.

4. In the input field, the user can enter the country's capital. Check if it's correct - write the checking logic in the `handleGame` function.

5. Show the user information about whether they entered correctly.

6. For the ambitious: Create a button to restart the game.

7. For the ambitious: Create a game history in AsyncStorage.

### Enhanced Version with SQLite

In addition to AsyncStorage for game history, use SQLite to:
- Store all country data for offline access
- Track detailed game statistics
- Implement a high scores system
- Save timestamps for each game
- Create analytics (accuracy rate, favorite countries, etc.)

```typescript
import * as SQLite from 'expo-sqlite';

// Initialize database
const db = await SQLite.openDatabaseAsync('capitals.db');

await db.execAsync(`
  CREATE TABLE IF NOT EXISTS game_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    country TEXT,
    user_answer TEXT,
    correct_answer TEXT,
    is_correct INTEGER,
    timestamp INTEGER
  );
`);

// Save game result
await db.runAsync(
  'INSERT INTO game_history (country, user_answer, correct_answer, is_correct, timestamp) VALUES (?, ?, ?, ?, ?)',
  [country, userAnswer, correctAnswer, isCorrect ? 1 : 0, Date.now()]
);
```

### Game Features

- Random country selection
- Input validation
- Score tracking
- Streak counter
- Difficulty levels (continents, regions)
- Hints system
- Time challenge mode
- Multiplayer support

---