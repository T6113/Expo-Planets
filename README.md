# 🚀 ExpoPlanets - Explore the Cosmos

## Live Demo

[ExpoPlanets on GitHub Pages](https://t6113.github.io/Expo-Planets/)

**Your daily window into the universe through NASA's Astronomy Picture of the Day**

ExpoPlanets is a modern, responsive web application that brings the wonders of space exploration directly to your browser. Built with React and powered by NASA's APOD API, it offers an immersive cosmic experience with stunning visuals and intuitive navigation.

![ExpoPlanets Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-19.1.1-blue) ![Vite](https://img.shields.io/badge/Vite-7.1.7-purple)

## ✨ Features

### 🌌 **Daily Space Photography**

- Browse NASA's Astronomy Picture of the Day
- High-resolution images and videos from across the universe
- Expert explanations from NASA astronomers
- Automatic daily updates

### 🔍 **Advanced Exploration Tools**

- **📅 Date Picker**: Explore any date since June 16, 1995
- **🎂 Birthday Search**: Discover what cosmic event happened on your birthday
- **♒ Zodiac Integration**: Unique feature that connects your zodiac sign to cosmic moments
- **🎯 Smart Search**: Intuitive interface with custom dropdowns
- **Fully Responsive**: Perfect experience on desktop, tablet, and mobile
- **Smooth Animations**: CSS keyframe animations and transitions
- **Glassmorphism UI**: Modern transparent design with backdrop blur effects
- **Cosmic Theme**: Deep space gradients and stellar animations

### 🔧 **Technical Excellence**

- **React 19**: Latest React features with hooks
- **React Router**: Seamless page navigation
- **Modern CSS**: Custom properties, flexbox, and grid
- **Vite Build System**: Lightning-fast development and optimized production builds
- **ESLint Integration**: Clean, maintainable code

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- NASA API key (free from [NASA API](https://api.nasa.gov/))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/T6113/Expo-Planets.git
   cd Expo-Planets
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # Create .env file in the root directory
   echo "VITE_API_KEY=your_nasa_api_key_here" > .env
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🌟 Key Technologies

- **Frontend**: React 19.1.1, React Router 7.9.2
- **Build Tool**: Vite 7.1.7
- **Styling**: Modern CSS with custom properties, glassmorphism effects
- **API**: NASA APOD API integration
- **Storage**: LocalStorage for favorites persistence
- **Code Quality**: ESLint with React hooks and refresh plugins

## 📊 Project Structure

```
src/
├── components/          # React components
│   ├── APODModal.*     # Full-screen preview modal
│   ├── DailySpacePhoto.* # Homepage APOD display
│   ├── DateSearch.*    # Multi-search interface
│   ├── ExplorePage.*   # Exploration hub
│   ├── FavoriteButton.* # Favorite toggle component
│   ├── FavoritesPage.* # Favorites collection
│   ├── ZodiacSearch.*  # Zodiac integration
│   └── About.*         # About page
├── utils/              # Utility functions
│   ├── nasa-api.js     # NASA API integration
│   └── favorites.js    # LocalStorage utilities
├── fonts/              # Custom fonts (future)
├── images/             # Static images (future)
└── App.*               # Main application

```
