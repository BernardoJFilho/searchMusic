import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = { isLoading: false, favoritChecked: false };

  componentDidMount() {
    const { favoriteSong, objApi } = this.props;
    favoriteSong.forEach((param) => {
      if (param.trackId === objApi.trackId) {
        this.setState({
          favoritChecked: true,
        });
      }
    });
  }

  handleChange = async ({ target }, objApi) => {
    this.setState({
      isLoading: true,
      favoritChecked: target.checked,
    });
    addSong(objApi);
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { objApi } = this.props;
    const { isLoading, favoritChecked } = this.state;
    return (
      <div>
        { isLoading
          ? <Loading />
          : (
            <div>
              ------------------------------------------------------------------------
              <div>{ objApi.trackName }</div>
              <audio data-testid="audio-component" src={ objApi.previewUrl } controls>
                <track kind="captions" />
              </audio>
              <label>
                Favorita
                <input
                  type="checkbox"
                  data-testid={ `checkbox-music-${objApi.trackId}` }
                  checked={ favoritChecked }
                  onChange={ (event) => this.handleChange(event, objApi) }
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
  objApi: PropTypes.shape().isRequired,
  favoriteSong: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default MusicCard;
