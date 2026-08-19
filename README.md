# Premium Mini E-Commerce App

A production-quality mobile e-commerce application built with React Native and Expo Go. This app provides a modern, premium user experience with robust state management, dark mode support, and a clean UI architecture.

## Features

- **Home Screen**: Popular products, category filters, and a responsive product grid.
- **Search**: Fast, local search functionality with empty state handling.
- **Categories Screen**: Browse products by category using an intuitive grid layout.
- **Product Details**: Comprehensive product view with image, rating, description, and "Add to Cart" functionality.
- **Cart System**: Complete cart management (add, remove, change quantities) and automatic total calculation.
- **Settings & Themeing**: Light, Dark, and System theme preferences persisted using AsyncStorage.
- **Responsive UI**: Adjusts gracefully across different mobile screen sizes.

## Tech Stack

- **React Native**: Core framework.
- **Expo & Expo Go**: For fast development and building.
- **Expo Router**: File-based routing for robust navigation.
- **Context API**: Global state management for Cart and Theme.
- **AsyncStorage**: Local persistence for user settings.
- **@expo/vector-icons**: Iconography.

## Architecture

The application is structured for scalability and maintainability:

`	ext
app/
├── _layout.jsx           # Root layout and global providers
├── (tabs)/               # Bottom tab navigation group
│   ├── _layout.jsx
│   ├── index.jsx         # Home screen
│   ├── categories.jsx    # Categories screen
│   ├── cart.jsx          # Cart screen
│   └── settings.jsx      # Settings screen
└── product/
    └── [id].jsx          # Dynamic product details screen

components/               # Reusable UI components
constants/                # Theme colors, spacing, typography
context/                  # CartContext and ThemeContext
data/                     # Static dummy products and categories
utils/                    # Currency formatting, search helpers
`

## Installation & Running Locally

1. **Clone or Download the Repository**
2. **Install Dependencies**:
   \\\ash
   npm install
   \\\
3. **Run the App**:
   \\\ash
   npx expo start
   \\\
4. **View in Expo Go**:
   - Download Expo Go on your physical device.
   - Scan the QR code shown in the terminal.
   - Alternatively, press \\ to run on an Android Emulator or \i\ for an iOS Simulator.

## Android APK Build

This project is configured for Expo Application Services (EAS) Build. 

To build the APK locally (if EAS CLI is installed):
\\\ash
npm install -g eas-cli
eas login
eas build -p android --profile preview
\\\

The final output will be an installable Android APK file.

## Testing

The app has been tested for:
- Seamless navigation between tabs and stack screens.
- Proper calculation of cart totals.
- Correct theme switching and persistence across app restarts.
- Handling empty states gracefully (Empty Search, Empty Cart, Invalid Product).
- Accessible touch targets and appropriate contrasting text.

## Future Improvements

- Add a checkout flow with a mock payment gateway.
- Introduce user authentication.
- Fetch product data from a remote REST/GraphQL API.
- Implement more complex filtering (price range, ratings).
