import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = { isLoading: false, favoritChecked: false };

  handleChange = async ({ target }) => {
    this.setState({
      isLoading: true,
      favoritChecked: target.checked,
    });
    await addSong();
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, favoritChecked } = this.state;
    return (
      <div>
        { isLoading
          ? <Loading />
          : (
            <div>
              ------------------------------------------------------------------------
              <div>{ trackName }</div>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
              </audio>
              <label>
                Favorita
                <input
                  type="checkbox"
                  data-testid={ `checkbox-music-${trackId}` }
                  checked={ favoritChecked }
                  onChange={ this.handleChange }
                />
              </label>
              <br />
            </div>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
