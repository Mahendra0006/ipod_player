// Import React to define a class-based component
import React from "react";

// Import CSS styling for the navbar
import "../../styles/Navbar.css";

// Import battery image
import FullBattery from "../../static/images/full-battery.png";

// Utility function to get current system time
import { getCurrentTime } from "../../utils/helpers";

/*
 * This component renders the top navigation bar on the iPod UI.
 * It shows the app title, current time or notification, and battery status.
 */
class Navbar extends React.Component {
  constructor() {
    super();
    // Initial state includes the current time
    this.state = {
      time: getCurrentTime(),
    };
    this.stateId = ""; // Store the interval ID for clearing later
  }

  // When component mounts, set an interval to update the time every 60 seconds
  componentDidMount() {
    const { noty } = this.props;

    // If a notification is active, skip time update
    if (noty === true) {
      return;
    }

    this.stateId = setInterval(() => {
      this.setState({ time: getCurrentTime() });
    }, 60000); // 60,000 ms = 1 minute
  }

  // If a notification is received, show it for 1 second
  componentDidUpdate() {
    const { setNoty, noty } = this.props;
    if (noty === true) {
      setTimeout(() => {
        setNoty(); // Clear the notification after 1 second
      }, 1000);
    }
  }

  // Clear time update interval when component unmounts
  componentWillUnmount() {
    clearInterval(this.stateId);
  }

  // Calculate how much of the song has played (as a percentage)
  calculateSongProgress = () => {
    const { audio } = this.props;
    if (audio && audio.duration > 0) {
      return (audio.currentTime / audio.duration) * 100;
    }
    return 0;
  };

  // Main render method
  render() {
    const { time } = this.state;
    const { noty, notifyText, batteryLevel, playing, audio } = this.props;

    // Determine the battery fill color based on battery level
    const getBatteryColor = () => {
      if (batteryLevel > 50) return "green";
      if (batteryLevel > 20) return "orange";
      return "red";
    };

    // Get current song progress percentage if a song is playing
    const songProgressPercentage = playing ? this.calculateSongProgress() : 0;

    return (
      <div className="bar">
        {/* App title on the left */}
        <h5 className="heading">Player</h5>

        {/* Display either a notification or time or "Battery Low!" */}
        {noty === true ? (
          <h5 className="notification">{notifyText}</h5>
        ) : batteryLevel <= 10 ? (
          <h5 className="notification">Battery Low!</h5>
        ) : (
          <h3 className="time">{time}</h3>
        )}

        {/* Right side: Battery indicator */}
        <div className="right-container-nav">
          <div className="battery-container">
            {/* Battery icon image */}
            <img
              className="battery-icon"
              src={FullBattery}
              alt={`Battery: ${batteryLevel}%`}
            />

            {/* Colored fill to simulate battery level */}
            <div
              className="battery-drain"
              style={{
                width: `${batteryLevel}%`,
                backgroundColor: getBatteryColor(),
                boxShadow: playing
                  ? `inset -${
                      100 - songProgressPercentage
                    }% 0 0 0 rgba(0,0,0,0.3)` // Visual representation of song playback
                  : "none",
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

// Export Navbar for use in Display.js
export default Navbar;
