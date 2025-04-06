// Import React to create a class-based component
import React from "react";

// Import wheel-specific styles
import "../../styles/Wheel.css";

// Import ZingTouch for gesture support
import ZingTouch from "zingtouch";

// Import icons used on the wheel
import { BsFillPlayFill } from "react-icons/bs";
import { BiPause } from "react-icons/bi";
import { AiOutlineForward } from "react-icons/ai";
import { AiOutlineBackward } from "react-icons/ai";

/*
 * This component renders the clickable circular control wheel of the iPod.
 * It supports menu navigation, play/pause toggle, seeking, and battery interaction.
 */
class Wheel extends React.Component {
  constructor(props) {
    super(props);
    this.angle = 0; // Used to track rotational angle for detecting rotation direction
    this.state = {
      active: props.active || 0, // Currently highlighted menu index
    };
  }

  // Render the wheel UI with interactive touch regions
  render() {
    const {
      theme,
      wheelColor,
      active,
      currentMenu,
      changeMenuForward,
      togglePlayPause,
      batteryLevel,
      rechargeBattery,
    } = this.props;

    return (
      <div className="wheel-container" id="wheel-container">
        {/* Outer wheel */}
        <div
          style={{ backgroundColor: wheelColor }}
          className="wheel"
          id="wheel"
        >
          {/* Menu button (top) */}
          <div className="controll" id="menu">
            <div style={{ color: theme }}>MENU</div>
          </div>

          {/* Forward button (right) */}
          <div className="controll" id="forward">
            <AiOutlineForward style={{ color: theme }} />
          </div>

          {/* Play/Pause button (bottom) */}
          <div className="controll" id="play-pause">
            <div>
              <BsFillPlayFill style={{ color: theme }} />
              <BiPause style={{ color: theme }} />
            </div>
          </div>

          {/* Reverse button (left) */}
          <div className="controll" id="reverse">
            <AiOutlineBackward style={{ color: theme }} />
          </div>
        </div>

        {/* Center button (clickable blank circle) */}
        <div
          style={{ backgroundColor: theme }}
          className="blank"
          id="blank"
          onClick={this.handleCenterClick}
        ></div>
      </div>
    );
  }

  // Handle center button press logic
  handleCenterClick = () => {
    const {
      currentMenu,
      changeMenuForward,
      togglePlayPause,
      batteryLevel,
      rechargeBattery,
    } = this.props;

    // If battery is very low, use center click to recharge
    if (batteryLevel <= 10) {
      rechargeBattery();
      return;
    }

    // Unlock lockscreen
    if (currentMenu === -2) {
      changeMenuForward(0, -2);
    }
    // Play or pause when on now playing screen
    else if (currentMenu === 0 || currentMenu === 7) {
      togglePlayPause();
    }
    // Otherwise, go to the selected submenu
    else {
      changeMenuForward(this.props.active, currentMenu);
    }
  };

  // Handle wheel rotation logic
  wheelControll = (e) => {
    const { updateActiveMenu, currentMenu } = this.props;

    // Initial rotation point
    if (e.detail.distanceFromOrigin === 0) {
      this.angle = e.detail.angle;
    }

    // Detect sharp rotation (jump)
    if (Math.abs(this.angle - e.detail.angle) > 300) {
      this.angle = Math.abs(e.detail.angle);
      if (e.detail.distanceFromLast === 0) return;
      // Rotate clockwise (forward)
      else if (e.detail.distanceFromLast < 0) {
        updateActiveMenu(1, currentMenu);
      }
      // Rotate counter-clockwise (back)
      else {
        updateActiveMenu(0, currentMenu);
      }
    }

    // Normal 15°+ rotation detection
    else if (Math.abs(this.angle - e.detail.angle) > 15) {
      this.angle = Math.abs(e.detail.angle);
      if (e.detail.distanceFromLast === 0) return;

      if (e.detail.distanceFromLast > 0) {
        updateActiveMenu(1, currentMenu);
      } else {
        updateActiveMenu(0, currentMenu);
      }
    }
  };

  // Set up ZingTouch bindings for gestures
  componentDidMount() {
    const {
      changeMenuBackward,
      togglePlayPause,
      seekSongForward,
      seekSongReverse,
    } = this.props;

    // Bind the gesture region to the wheel
    const wheel = document.getElementById("wheel");
    const activeRegion = ZingTouch.Region(wheel);

    // DOM elements for each control area
    const menuIcon = document.getElementById("menu");
    const playPause = document.getElementById("play-pause");
    const reverse = document.getElementById("reverse");
    const forward = document.getElementById("forward");

    // Custom long press gesture for seek
    const longTapGesture = new ZingTouch.Tap({
      maxDelay: 10000,
      numInputs: 1,
      tolerance: 1,
    });

    // Bind menu tap to go back
    activeRegion.bind(menuIcon, "tap", function (e) {
      changeMenuBackward();
    });

    // Bind rotation gesture
    activeRegion.bind(wheel, "rotate", (e) => {
      this.wheelControll(e);
    });

    // Play/pause toggle
    activeRegion.bind(playPause, "tap", function (e) {
      togglePlayPause();
    });

    // Long press left to seek reverse
    activeRegion.bind(reverse, longTapGesture, function (e) {
      seekSongReverse(e);
    });

    // Long press right to seek forward
    activeRegion.bind(forward, longTapGesture, function (e) {
      seekSongForward(e);
    });
  }
}

export default Wheel;
