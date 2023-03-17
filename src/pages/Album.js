import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {};

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const response = await getMusics(id);
    this.setState({
      returnApi: response,
      resposta: true,
    });
  }

  render() {
    const { returnApi, resposta } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          { resposta ? returnApi.map((param, index) => (
            <div key={ index }>
              <div data-testid="artist-name">{ param.artistName }</div>
              <div data-testid="album-name">{ param.collectionName }</div>
            </div>
          ))[0] : null }
        </div>
        {resposta ? <MusicCard returnApi={ returnApi.slice(1) } /> : null}
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
