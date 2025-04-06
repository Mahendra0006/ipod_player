// Import React to create a class component
import React from "react";

// Wallpaper component - renders the wallpaper selection menu
class Wallpaper extends React.Component {
  render() {
    // Destructure the 'active' index from props to highlight the selected wallpaper
    const { active } = this.props;

    return (
      <div className="music">
        {/* Title of the wallpaper selection screen */}
        <h2>Wallpaper Select</h2>

        {/* List of available wallpaper options */}
        <ul>
          {/* Map through wallpaper names and render each one */}
          {["Wallpaper 1", "Wallpaper 2", "Wallpaper 3"].map(
            (wallpaper, index) => {
              // If current index matches 'active', add 'active' class for highlighting
              return active === index ? (
                <li key={index} className="active theme-li">
                  {wallpaper}
                </li>
              ) : (
                <li key={index} className="theme-li">
                  {wallpaper}
                </li>
              );
            }
          )}
        </ul>
      </div>
    );
  }
}

// Export the component so it can be used in other parts of the application
export default Wallpaper;
