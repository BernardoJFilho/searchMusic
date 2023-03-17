import React from 'react';
import PropTypes, { shape } from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { returnApi } = this.props;
    return (
      <div>
        {returnApi.map((param, index) => (
          <div key={ index }>
            <div>{ param.trackName }</div>
            <audio data-testid="audio-component" src={ param.previewUrl } controls>
              <track kind="captions" />
            </audio>
          </div>
        ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  returnApi: PropTypes.arrayOf(shape(
    { trackName: PropTypes.string.isRequired },
  )).isRequired,
};

export default MusicCard;
