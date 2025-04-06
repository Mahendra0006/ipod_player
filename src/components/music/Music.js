import React from "react";
import "../../styles/Music.css";

// Renders music menu
class Music extends React.Component {
  render() {
    const { musicItems, active } = this.props;
    return (
      <div className="music">
        <h3>Music</h3>
        <ul>
          {musicItems.map((music, index) => {
            return active === index ? (
              <li key={index} className="active">
                &nbsp;{music}
              </li>
            ) : (
              <li key={index}>&nbsp;{music}</li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Music;
