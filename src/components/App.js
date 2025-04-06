import React from 'react';
// Import CSS
import '../styles/App.css';
// Import components
import Case from '../components/shared/Case.js';
import KnowMore from "../components/shared/KnowMore.js";
// Import utility constants
import { 
  MENU_ITEMS, 
  MUSIC_ITEMS, 
  SONG_ITEMS, 
  SONG_URLS, 
  SONG_IMG_URLS, 
  WALLPAPER_ITEMS 
} from '../utils/constants';
// eslint-disable-next-line no-unused-vars
import { 
  updateActiveMenuItem, updateActiveMenu, changeMenuForward,
  changeMenuBackward, togglePlayPause, seekSongForward,
  seekSongReverse, updateTheme, updateWheelColor,
  updateWallpaper, chagePlayingSongFromMusicMenu, setNoty
} from '../utils/helpers';

// Import first song as default
import song1 from "../static/songs/Post Malone - White Iverson.mp3";
import song1Img from "../static/images/Post Malone - White Iverson.jpeg";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      active: 0,
      menuItems: MENU_ITEMS,
      musicItems: MUSIC_ITEMS,
      songItemsUrl: SONG_URLS,
      songImgItemsUrl: SONG_IMG_URLS,
      wallpaperItems: WALLPAPER_ITEMS,
      songItems: SONG_ITEMS,
      songIndex: 0,
      lengthMenuKey: {
        "-1": 3, 
        "1": 2, 
        "4": 4, 
        "8": 4, 
        "3": 2, 
        "9": 3, 
        "10": 2
      },
      currentMenu: -2,
      navigationStack: [],
      songUrl: song1,
      playing: false,
      theme: "rgb(210, 210, 210)",
      audio: new Audio(song1),
      songImgUrl: song1Img,
      wheelColor: "white",
      wallpaper: 0,
      noty: false, 
      notifyText: "Wallpaper Changed"
    };
  }

  render() {
    return (
      <div className="App">
        <Case 
          {...this.state}
          updateActiveMenuItem={(direction, menu) => updateActiveMenuItem(this, direction, menu)}
          updateActiveMenu={(direction, menu) => updateActiveMenu(this, direction, menu)}
          changeMenuForward={(id, fromMenu) => changeMenuForward(this, id, fromMenu)}
          changeMenuBackward={() => changeMenuBackward(this)}
          togglePlayPause={() => togglePlayPause(this)}
          seekSongForward={(e) => seekSongForward(this, e)}
          seekSongReverse={(e) => seekSongReverse(this, e)}
          updateTheme={(id) => updateTheme(this, id)}
          updateWheelColor={(id) => updateWheelColor(this, id)}
          updateWallpaper={(id) => updateWallpaper(this, id)}
          chagePlayingSongFromMusicMenu={(id, navStack, fromMenu) => chagePlayingSongFromMusicMenu(this, id, navStack, fromMenu)}
          setNoty={() => setNoty(this)}
        />
        <KnowMore />
      </div>
    );
  }
}

export default App;
