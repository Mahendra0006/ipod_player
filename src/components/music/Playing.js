 import React from 'react';
import "../../styles/Playing.css"

class Playing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: 0,
            duration: 0,
        }
        this.intervalId = null;
    }

    // logic for updating the current music playback
    componentDidMount() {
        const { audio } = this.props;
        if (audio) {
            // Set up event listener for when metadata is loaded
            audio.addEventListener('loadedmetadata', this.handleMetadataLoaded);
            
            this.setState({ currentTime: audio.currentTime || 0 });
            this.intervalId = setInterval(() => {
                if (audio) {
                    this.setState({ 
                        currentTime: audio.currentTime || 0,
                        duration: audio.duration || 0
                    });
                }
            }, 100);
        }
    }

    // Clear interval when component unmounts
    componentWillUnmount() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        
        const { audio } = this.props;
        if (audio) {
            audio.removeEventListener('loadedmetadata', this.handleMetadataLoaded);
        }
    }

    // Format time to MM:SS
    formatTime(timeInSeconds) {
        if (!timeInSeconds || isNaN(timeInSeconds)) return "0:00";
        
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    // Render playing screen
    render() {
        // eslint-disable-next-line no-unused-vars
        const { songItems, playing, songIndex, /* eslint-disable-next-line no-unused-vars */ audio, songImgUrl } = this.props;
        const { currentTime, duration } = this.state;

        // Ensure audio exists before accessing its properties
        const currentTimeRender = this.formatTime(currentTime);
        const durationRender = this.formatTime(duration);
        
        // Calculate percentage complete, defaulting to 0 if duration is invalid
        const percentageComplete = { 
            width: duration > 0 
                ? `${(currentTime / duration * 100)}%` 
                : '0%' 
        };

        return (
            <div className="now-playing-container">
                <div className="song-details">
                    <img src={songImgUrl} alt="songImg"></img>
                    <div>
                        <h6>{songItems[songIndex]}</h6>
                        {playing && <h4 className="play-pause-nav">Playing</h4>}
                        {!playing && <h4 className="play-pause-nav">Paused</h4>}
                    </div>
                </div>
                <div className="status">
                    {currentTimeRender}
                    <div id="progress">
                        <div style={percentageComplete} id="progress-bar"></div>
                    </div>
                    {durationRender}
                </div>
            </div>
        )
    }

    handleMetadataLoaded = () => {
        const { audio } = this.props;
        if (audio) {
            this.setState({ duration: audio.duration || 0 });
        }
    }
}

export default Playing;