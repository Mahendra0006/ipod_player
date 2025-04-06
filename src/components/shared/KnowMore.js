// Import React for class-based component
import React from "react";
// Import associated styles
import "../../styles/KnowMore.css";

/*
 * This component renders a sliding info panel explaining controls and usage of the iPod UI.
 * It toggles visibility when the "Know More" button is clicked.
 */
class KnowMore extends React.Component {
  constructor() {
    super();
    // Initial state: info panel is closed
    this.state = {
      divOpen: false,
    };
  }

  // Toggle the info panel open/close state
  openDiv = () => {
    this.setState({ divOpen: !this.state.divOpen });
  };

  render() {
    const { divOpen } = this.state;

    // Conditionally style the top position to slide the panel up/down
    let cssProp;
    if (divOpen === false) {
      cssProp = { top: "-542px" }; // Slide out of view (hidden)
    } else {
      cssProp = { top: "0px" }; // Slide into view (visible)
    }

    return (
      // The container div's position is animated using the `top` style
      <div style={cssProp} className="information-container">
        <div className="info-div">
          <h3>Controls</h3>
          <p>
            1. To unlock screen you have to press center button and to lock
            screen you have to press menu button in main menu.
          </p>
          <p>
            2. To play and pause music in any menu you need to press play/pause
            button on bottom.
          </p>
          <p>
            3. Short pressing on forward/reverse will take you to next/previous
            track (ONLY WHILE PLAYING).
          </p>
          <p>
            4. Long pressing on forward/reverse will seek the song in
            forward/reverse (ONLY WHILE PLAYING).
          </p>
          <p>
            5. To navigate between a menu items you need to rotate on track
            wheel.
          </p>
          <p>
            6. To go to next menu or go inside a menu press center button and to
            go to previous menu press menu button.
          </p>
          <p>7. Songs do play, Please checkout settings menu.</p>
          <p>credits : Apple, Flaticon</p>
        </div>

        {/* Button that toggles the info panel */}
        <button id="info-btn" onClick={this.openDiv}>
          Know More
        </button>
      </div>
    );
  }
}

// Export the KnowMore component to be used inside App.js
export default KnowMore;
