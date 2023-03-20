import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  state = { favoriteSong: [], resposta: false };

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const response = await getMusics(id);
    this.setState({
      returnApi: response,
    });
    this.saveMusic();
  }

  saveMusic = async () => {
    const favoriteSong = await getFavoriteSongs();
    this.setState({
      favoriteSong,
      resposta: true,
    });
  };

  render() {
    const { returnApi, resposta, favoriteSong } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { resposta
          ? (
            <div>
              <div>
                { resposta ? returnApi.map((param, index) => (
                  <div key={ index }>
                    <div data-testid="artist-name">{ param.artistName }</div>
                    <div data-testid="album-name">{ param.collectionName }</div>
                  </div>
                ))[0] : null }
              </div>
              { resposta && returnApi.map((objApi) => (
                <MusicCard
                  key={ objApi.trackName }
                  objApi={ objApi }
                  favoriteSong={ favoriteSong }
                />
              )).slice(1)}
            </div>
          ) : <Loading /> }
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
export default Album;
