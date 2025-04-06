// Import React to use class-based component
import React from "react";

// Renders the Lock Screen component of the iPod
class LockScreen extends React.Component {
  render() {
    return (
      <div>
        {/* Top part of the lock screen showing the lock icon */}
        <div className="lock-display">
          {/* Font Awesome lock icon */}
          <i className="fa fa-lock" aria-hidden="true"></i>
        </div>

        {/* Bottom instruction to unlock using center button */}
        <div className="bottom-div-lock">
          <h3>Press Centre Button to unlock!</h3>
        </div>
      </div>
    );
  }
}

// Export the LockScreen component for use in other parts of the app
export default LockScreen;
