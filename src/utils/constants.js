// -------------------------------
// SONG FILE IMPORTS
// -------------------------------
// These are local MP3 audio files used in the music player
import song1 from "../static/songs/Post Malone - White Iverson.mp3";
import song2 from "../static/songs/John Denver - Country Roads.mp3";
import song3 from "../static/songs/Sigrid - High Five.mp3";
import song4 from "../static/songs/Khalid - Young Dumb Broke.mp3";
import song5 from "../static/songs/Rick Astley - Never Gonna Give You Up.mp3";

// -------------------------------
// SONG COVER IMAGE IMPORTS
// -------------------------------
// These are album cover images for each song
import song1Img from "../static/images/Post Malone - White Iverson.jpeg";
import song2Img from "../static/images/John Denver - Country Roads.jpeg";
import song3Img from "../static/images/Sigrid - High Five.jpeg";
import song4Img from "../static/images/Khalid - Young Dumb Broke.jpeg";
import song5Img from "../static/images/Never Gonna Give You Up.jpeg";

// -------------------------------
// WALLPAPER IMAGE IMPORTS
// -------------------------------
// Background wallpapers for iPod display personalization
import Wallpaper1 from "../static/images/wallpaper1.jpg";
import Wallpaper2 from "../static/images/wallpaper2.jpeg";
import Wallpaper3 from "../static/images/wallpaper3.jpg";

// -------------------------------
// MENU CONFIGURATION
// -------------------------------

// Main menu items shown when the iPod starts
export const MENU_ITEMS = ["Now Playing", "Music", "Games", "Settings"];

// Submenu under Music
export const MUSIC_ITEMS = ["All Songs", "Artist", "Albums"];

// List of songs shown under All Songs menu
export const SONG_ITEMS = [
  "Post Malone - White Iverson",
  "John Denver - Country Roads",
  "Sigrid Raabe - High Five",
  "Khalid - Young Dumb Broke",
  "Rick Astley - Never Gonna Give You Up",
];

// -------------------------------
// SONG AUDIO FILES AND IMAGES
// -------------------------------

// Indexed array of MP3 audio sources
export const SONG_URLS = [song1, song2, song3, song4, song5];

// Indexed array of album cover images
export const SONG_IMG_URLS = [song1Img, song2Img, song3Img, song4Img, song5Img];

// -------------------------------
// WALLPAPER OPTIONS
// -------------------------------

// List of available wallpaper images for customization
export const WALLPAPER_ITEMS = [Wallpaper1, Wallpaper2, Wallpaper3];
