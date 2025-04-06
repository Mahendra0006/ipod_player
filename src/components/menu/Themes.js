// Import React to use React.Component
import React from "react";

// Import specific CSS styling for this Themes component
import "../../styles/Themes.css";

// Class component to render the Theme selection menu
class Themes extends React.Component {
  render() {
    // Destructure the 'active' index passed as a prop from parent component
    const { active } = this.props;

    // New list of unique iPod-inspired theme names
    const themeOptions = [
      "Arctic Silver",
      "Matte Charcoal",
      "Sunset Gold",
      "Midnight Blue",
      "Soft Quartz",
    ];

    return (
      <div className="music">
        {/* Title of the menu */}
        <h2>Theme Select</h2>

        {/* Unordered list to show theme options */}
        <ul>
          {/* Map through theme names and highlight the currently active one */}
          {themeOptions.map((theme, index) => {
            return active === index ? (
              <li key={index} className="active theme-li">
                {theme}
              </li>
            ) : (
              <li className="theme-li" key={index}>
                {theme}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

// Export this component to be used in other parts of the app
export default Themes;
