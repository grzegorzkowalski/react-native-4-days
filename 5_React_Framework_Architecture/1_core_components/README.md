# React Native Core Components Examples

This project demonstrates comprehensive examples of React Native's core components with interactive demonstrations and educational content.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation

1. Navigate to the project directory:
```bash
cd workspace/core_components
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Run on your preferred platform:
```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

## 📱 Components Covered

### 1. **View**
- Basic container component
- Flexbox layouts
- Styling and positioning
- Border and shadow effects

### 2. **Text**
- Text display and styling
- Font families and weights
- Text alignment and decoration
- Nested text components

### 3. **ScrollView**
- Scrollable content containers
- Horizontal and vertical scrolling
- Refresh control
- Scroll indicators

### 4. **FlatList**
- Performance-optimized lists
- Item rendering and separation
- Pull-to-refresh functionality
- Load more patterns

### 5. **SectionList**
- Lists with headers and sections
- Sticky headers
- Section separators
- Complex data structures

### 6. **Touchable Components**
- TouchableOpacity
- TouchableHighlight
- TouchableWithoutFeedback
- Pressable (modern alternative)

### 7. **Image**
- Local and remote images
- Different resize modes
- Loading states and error handling
- Image backgrounds

### 8. **TextInput**
- Text input fields
- Different keyboard types
- Input validation
- Form handling

### 9. **Modal**
- Overlay dialogs
- Different animation types
- Custom styling
- Bottom sheets

### 10. **ActivityIndicator**
- Loading spinners
- Different sizes and colors
- Loading states
- Progress indicators

## 🎯 Key Features

- **Interactive Examples**: Each component includes live, interactive demonstrations
- **Comprehensive Coverage**: Examples show various props, styling options, and use cases
- **Educational Content**: Explanations of best practices and common patterns
- **TypeScript Support**: Full TypeScript implementation with proper typing
- **Responsive Design**: Examples work across different screen sizes
- **Modern Patterns**: Uses current React Native best practices

## 📂 Project Structure

```
core_components/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Main core components screen
│   │   ├── two.tsx            # About screen
│   │   └── _layout.tsx        # Tab navigation
│   ├── _layout.tsx            # Root layout
│   └── +not-found.tsx
├── components/
│   ├── ViewExample.tsx        # View component examples
│   ├── TextExample.tsx        # Text component examples
│   ├── ScrollViewExample.tsx  # ScrollView examples
│   ├── FlatListExample.tsx    # FlatList examples
│   ├── SectionListExample.tsx # SectionList examples
│   ├── TouchableExample.tsx   # Touchable components
│   ├── ImageExample.tsx       # Image component examples
│   ├── TextInputExample.tsx   # TextInput examples
│   ├── ModalExample.tsx       # Modal examples
│   ├── ActivityIndicatorExample.tsx # ActivityIndicator examples
│   ├── CoreComponentsExamples.tsx # Main navigation component
│   └── index.ts               # Component exports
├── constants/
├── assets/
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠 Development

### Adding New Examples

1. Create a new component file in the `components/` directory
2. Follow the existing pattern with sections and styling
3. Add the component to `CoreComponentsExamples.tsx`
4. Update the exports in `components/index.ts`

### Styling Guidelines

- Use TypeScript for all components
- Follow React Native styling best practices
- Include interactive elements where appropriate
- Provide clear section titles and descriptions

## 📚 Learning Resources

Each component example includes:

- **Props demonstration**: Shows different prop combinations
- **Styling examples**: Various styling approaches
- **Interactive elements**: Buttons, inputs, and touch handlers
- **Best practices**: Common patterns and recommendations
- **Error handling**: Loading states and error scenarios

---

**Happy Learning! 🎉**

Explore each component, interact with the examples, and build your React Native expertise!
