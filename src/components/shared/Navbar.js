import React from "react";
import "../../styles/Navbar.css";
import Battery from "../../static/images/full-battery.png";
import { getCurrentTime } from '../../utils/helpers';

// Renders navbar
class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      time: getCurrentTime(),
    };
    this.stateId = "";
  }

  componentDidMount() {
    const { noty } = this.props;
    if (noty === true) {
      return;
    }
    // set an interval of 60 seconds to update time
    this.stateId = setInterval(() => {
      this.setState({ time: getCurrentTime() });
    }, 60000);
  }

  componentDidUpdate() {
    const { setNoty, noty } = this.props;
    if (noty === true) {
      setTimeout(function () {
        setNoty();
      }, 1000);
    }
  }

  // Clear the update time interval
  componentWillUnmount() {
    const { noty } = this.props;
    if (noty !== true) clearInterval(this.stateId);
  }

  // Render navbar to show either ipod logo, time or Notification
  render() {
    const { time } = this.state;
    // eslint-disable-next-line no-unused-vars
    const { noty, notifyText } = this.props;
    return (
      <div className="bar">
        {<h5 className="heading">Player</h5>}
        {noty === true && <h5 className="notification">{notifyText}</h5>}
        {noty === false && <h3 className="time">{time}</h3>}
        {
          <div className="right-container-nav">
            <img className="battery" src={Battery} alt="Battery" />
          </div>
        }
      </div>
    );
  }
}

export default Navbar;
