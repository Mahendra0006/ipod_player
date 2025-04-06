// Import React to use class-based components
import React from "react";

// Import subcomponents used within the display screen
import Navbar from "../shared/Navbar"; // Top bar showing battery, notification, etc.
import Menu from "../menu/Menu"; // Main menu
import Music from "../music/Music"; // Music submenu
import Songs from "../music/Songs"; // Song list under music
import Settings from "../settings/Settings"; // Settings menu
import Playing from "../music/Playing"; // Music player screen
import Themes from "../menu/Themes"; // Theme selection screen
import WheelColor from "../settings/WheelColor"; // Wheel color selection screen
import LockScreen from "../LockScreen"; // Lock screen display
import Wallpaper from "../menu/Wallpaper"; // Wallpaper selection screen

// Import associated CSS for display styling
import "../../styles/Display.css";

/*
 * The Display component acts as the screen of the iPod.
 * It conditionally renders subcomponents based on the current menu context.
 * Wallpaper is set as the background image of the screen.
 */
class Display extends React.Component {
  render() {
    // Destructure all the props passed from Case
    const {
      active,
      currentMenu,
      menuItems,
      musicItems,
      songItems,
      playing,
      songIndex,
      audio,
      songUrl,
      songImgUrl,
      wallpaper,
      wallpaperItems,
      noty,
      setNoty,
      notifyText,
      batteryLevel,
    } = this.props;

    return (
      // Set the background wallpaper for the screen
      <div
        style={{ backgroundImage: `url(${wallpaperItems[wallpaper]})` }}
        className="display"
      >
        {/* Render the top Navbar */}
        <Navbar
          noty={noty}
          setNoty={setNoty}
          playing={playing}
          notifyText={notifyText}
          batteryLevel={batteryLevel}
        />
        {/* Conditional rendering based on currentMenu value */}
        {currentMenu === -2 && <LockScreen />} {/* Lock screen */}
        {currentMenu === -1 && (
          <Menu songImgUrl={songImgUrl} menuItems={menuItems} active={active} />
        )}
        {currentMenu === 1 && <Music musicItems={musicItems} active={active} />}
        {currentMenu === 2 && (
          <div className="blank-div">
            <h1 className="empty-text">Games</h1>
          </div>
        )}
        {currentMenu === 3 && <Settings active={active} />}
        {currentMenu === 4 && <Songs songItems={songItems} active={active} />}
        {currentMenu === 5 && (
          <div className="blank-div">
            <h1 className="empty-text">Artists</h1>
          </div>
        )}
        {currentMenu === 6 && (
          <div className="blank-div">
            <h1 className="empty-text">Albums</h1>
          </div>
        )}
        {/* Show Playing screen from Music Player or Now Playing shortcut */}
        {(currentMenu === 0 || currentMenu === 7) && (
          <Playing
            songImgUrl={songImgUrl}
            audio={audio}
            songUrl={songUrl}
            playing={playing}
            songIndex={songIndex}
            songItems={songItems}
          />
        )}
        {/* Settings submenus */}
        {currentMenu === 8 && <Themes active={active} />}
        {currentMenu === 9 && <WheelColor active={active} />}
        {currentMenu === 10 && <Wallpaper active={active} />}
      </div>
    );
  }
}

// Export Display component to be used inside Case.js
export default Display;
