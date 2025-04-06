// Import core React library for creating class-based components
import React from "react";

// Import CSS for styling the Menu component
import "../../styles/Menu.css";

// Import image assets used for displaying thumbnails in the menu
import game from "../../static/images/game.png";
import music from "../../static/images/music.jpg";
import settings from "../../static/images/Settings.png";

// Menu component - renders the main iPod-style menu
class Menu extends React.Component {
  render() {
    // Destructure props passed from the parent component
    const { active, menuItems, songImgUrl } = this.props;

    return (
      <div className="menu-container">
        {/* Left side: List of menu items */}
        <div className="menu">
          <ul>
            {/* Dynamically render each menu item */}
            {menuItems.map((menuItems, index) => {
              // Highlight the currently active menu item
              return active === index ? (
                <li key={index} className="active">
                  &nbsp;{menuItems}
                </li>
              ) : (
                <li key={index}>&nbsp;{menuItems}</li>
              );
            })}
          </ul>
        </div>

        {/* Right side: Image/thumbnail preview based on active item */}
        <div className="leaf">
          {/* Show current song image if "Now Playing" is selected */}
          {active === 0 && (
            <img className="leaf-img" src={songImgUrl} alt="Now Playing" />
          )}

          {/* Show music icon if "Music" is selected */}
          {active === 1 && <img className="leaf-img" src={music} alt="Music" />}

          {/* Show game icon if "Games" is selected */}
          {active === 2 && <img className="leaf-img" src={game} alt="Games" />}

          {/* Show settings icon if "Settings" is selected */}
          {active === 3 && (
            <img className="leaf-img" src={settings} alt="Settings" />
          )}
        </div>
      </div>
    );
  }
}

// Export the Menu component to be used in other parts of the app
export default Menu;
