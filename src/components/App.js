// React import to create a class component
import React from "react";

// Import global styles for the app
import "../styles/App.css";

// Import core components
import Case from "../components/shared/Case.js";
import KnowMore from "../components/shared/KnowMore.js";

// Import constants used throughout the app for menu and media items
import {
  MENU_ITEMS,
  MUSIC_ITEMS,
  SONG_ITEMS,
  SONG_URLS,
  SONG_IMG_URLS,
  WALLPAPER_ITEMS,
} from "../utils/constants";

// Import helper functions for logic and interactions
import {
  updateActiveMenuItem,
  updateActiveMenu,
  changeMenuForward,
  changeMenuBackward,
  togglePlayPause,
  seekSongForward,
  seekSongReverse,
  updateTheme,
  updateWheelColor,
  updateWallpaper,
  chagePlayingSongFromMusicMenu,
  setNoty,
  simulateBatteryDrain,
  rechargeBattery,
} from "../utils/helpers";

// Import default song and image to use on initial load
import song1 from "../static/songs/Post Malone - White Iverson.mp3";
import song1Img from "../static/images/Post Malone - White Iverson.jpeg";

// Define the main App component
class App extends React.Component {
  constructor() {
    super();

    // Initialize the component state
    this.state = {
      active: 0, // Currently selected menu item index
      menuItems: MENU_ITEMS, // Main menu items
      musicItems: MUSIC_ITEMS, // Submenu under Music
      songItemsUrl: SONG_URLS, // Array of song audio URLs
      songImgItemsUrl: SONG_IMG_URLS, // Array of song image URLs
      wallpaperItems: WALLPAPER_ITEMS, // Available wallpaper options
      songItems: SONG_ITEMS, // Song names
      songIndex: 0, // Currently selected song index

      // Mapping of menu IDs to the number of items they contain
      lengthMenuKey: {
        "-1": 3,
        1: 2,
        4: 4,
        8: 4,
        3: 2,
        9: 3,
        10: 2,
      },

      currentMenu: -2, // Current active menu ID
      navigationStack: [], // Stack to track menu navigation
      songUrl: song1, // Currently selected song audio URL
      playing: false, // Is the song currently playing
      theme: "rgb(210, 210, 210)", // Current theme color
      audio: new Audio(song1), // Audio object to control playback
      songImgUrl: song1Img, // Image URL for the current song
      wheelColor: "white", // Color of the control wheel
      wallpaper: 0, // Index of current wallpaper
      noty: false, // Show notification?
      notifyText: "Wallpaper Changed", // Notification text
      batteryLevel: 100, // Simulated battery percentage
    };
  }

  // Start battery drain simulation when component mounts
  componentDidMount() {
    this.batteryInterval = setInterval(() => {
      simulateBatteryDrain(this); // Call helper to reduce battery
    }, 1000); // Drain every second
  }

  // Clean up interval on unmount to prevent memory leaks
  componentWillUnmount() {
    clearInterval(this.batteryInterval);
  }

  // Render the entire application
  render() {
    return (
      <div className="App">
        {/* Main case component of iPod, pass full state and all control handlers */}
        <Case
          {...this.state}
          // Pass all helper methods as props so they can be used in Case and children
          updateActiveMenuItem={(direction, menu) =>
            updateActiveMenuItem(this, direction, menu)
          }
          updateActiveMenu={(direction, menu) =>
            updateActiveMenu(this, direction, menu)
          }
          changeMenuForward={(id, fromMenu) =>
            changeMenuForward(this, id, fromMenu)
          }
          changeMenuBackward={() => changeMenuBackward(this)}
          togglePlayPause={() => togglePlayPause(this)}
          seekSongForward={(e) => seekSongForward(this, e)}
          seekSongReverse={(e) => seekSongReverse(this, e)}
          updateTheme={(id) => updateTheme(this, id)}
          updateWheelColor={(id) => updateWheelColor(this, id)}
          updateWallpaper={(id) => updateWallpaper(this, id)}
          chagePlayingSongFromMusicMenu={(id, navStack, fromMenu) =>
            chagePlayingSongFromMusicMenu(this, id, navStack, fromMenu)
          }
          setNoty={() => setNoty(this)}
          rechargeBattery={() => rechargeBattery(this)} // Simulate charging
        />

        {/* Static Know More footer or info panel */}
        <KnowMore />
      </div>
    );
  }
}

// Export the App component
export default App;
