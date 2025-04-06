// Import React to use class components
import React from "react";
// Import the CSS specific to settings screen
import "../../styles/Settings.css";

// Settings Component – used to render the device settings menu
class Settings extends React.Component {
  render() {
    // Destructure 'active' index from props to highlight the currently selected item
    const { active } = this.props;

    return (
      <div className="settings">
        {/* Title of the settings screen */}
        <h2>Settings</h2>

        {/* List of settings options */}
        <ul>
          {/* Conditionally apply 'active' class to highlight the selected setting */}
          {active === 0 ? <li className="active">Themes</li> : <li>Themes</li>}
          {active === 1 ? (
            <li className="active">Wheel Color</li>
          ) : (
            <li>Wheel Color</li>
          )}
          {active === 2 ? (
            <li className="active">Wallpaper</li>
          ) : (
            <li>Wallpaper</li>
          )}
        </ul>
      </div>
    );
  }
}

// Export the Settings component for use in the main application
export default Settings;
