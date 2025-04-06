// Import React to define a class component
import React from "react";
// Import specific CSS for the Wheel Color selection screen
import "../../styles/Themes.css";

// Component to render the wheel color selection menu
class WheelColor extends React.Component {
  render() {
    // Get the currently selected (active) item index from props
    const { active } = this.props;

    return (
      <div className="music">
        {/* Title for the screen */}
        <h2>Wheel Color Select</h2>

        {/* Render the list of wheel color options */}
        <ul>
          {["Black", "White", "Brown"].map((color, index) => {
            // Highlight the currently active option with 'active' class
            return active === index ? (
              <li key={index} className="active theme-li">
                {color}
              </li>
            ) : (
              <li className="theme-li" key={index}>
                {color}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

// Export the component so it can be used in other parts of the app
export default WheelColor;
