// Import React to use class-based components
import React from "react";

// Import associated CSS for styling the iPod case
import "../../styles/Case.css";

// Import shared components
import Wheel from "../shared/Wheel.js"; // Wheel handles user interaction (clicks, rotation)
import Display from "../shared/Display.js"; // Display shows menus, music info, etc.

/*
 * The Case component is the outer shell of the iPod.
 * It acts as a wrapper that combines the Display and Wheel components.
 * All props required by Display and Wheel are passed down here.
 */
class Case extends React.Component {
  render() {
    // Destructure props passed from App.js
    const {
      active,
      updateActiveMenu,
      currentMenu,
      changeMenuBackward,
      changeMenuForward,
      menuItems,
      musicItems,
      togglePlayPause,
      songItems,
      playing,
      songIndex,
      theme,
      audio,
      songUrl,
      songImgUrl,
      seekSongForward,
      seekSongReverse,
      wheelColor,
      wallpaper,
      wallpaperItems,
      noty,
      setNoty,
      notifyText,
    } = this.props;

    return (
      <div className="case-container">
        {/* Apply the selected theme as background color */}
        <div style={{ backgroundColor: theme }} className="case">
          {/* Display screen of the iPod */}
          <Display
            songIndex={songIndex}
            playing={playing}
            active={active}
            musicItems={musicItems}
            menuItems={menuItems}
            currentMenu={currentMenu}
            songItems={songItems}
            audio={audio}
            songUrl={songUrl}
            songImgUrl={songImgUrl}
            wallpaper={wallpaper}
            wallpaperItems={wallpaperItems}
            noty={noty}
            setNoty={setNoty}
            notifyText={notifyText}
          />

          {/* iPod control wheel */}
          <Wheel
            theme={theme}
            active={active}
            menuItems={menuItems}
            currentMenu={currentMenu}
            changeMenuForward={changeMenuForward}
            changeMenuBackward={changeMenuBackward}
            updateActiveMenu={updateActiveMenu}
            togglePlayPause={togglePlayPause}
            seekSongForward={seekSongForward}
            seekSongReverse={seekSongReverse}
            wheelColor={wheelColor}
          />
        </div>
      </div>
    );
  }
}

// Export Case component for use in App.js
export default Case;
