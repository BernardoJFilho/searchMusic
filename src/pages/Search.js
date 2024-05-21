import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from '@mui/material';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  state = {
    pesquisar: '',
    buttonStatus: true,
    busca: '',
  };

  buttonSearch = async () => {
    const { pesquisar } = this.state;
    this.setState({
      busca: pesquisar,
      pesquisar: '',
      loadingCondition: true,
      returnApi: false,
    });
    const response = await searchAlbumsAPI(pesquisar);
    if (response.length > 0) {
      this.setState({
        returnApi: true,
        loadingCondition: false,
        resultApi: response,
        onAlbuns: true,
      });
    } else {
      this.setState({
        loadingCondition: false,
        notAlbuns: true,
      });
    }
  };

  buttonEnable = ({ target }) => {
    if (target.value.length >= 2) {
      this.setState({
        [target.name]: target.value,
        buttonStatus: false,
      });
    } else {
      this.setState({
        [target.name]: target.value,
        buttonStatus: true,
      });
    }
  };

  render() {
    const {
      buttonStatus,
      pesquisar,
      returnApi,
      busca,
      loadingCondition,
      resultApi,
      onAlbuns,
      notAlbuns } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <Input
            name="pesquisar"
            type="text"
            placeholder="Buscar"
            value={ pesquisar }
            onChange={ this.buttonEnable }
            data-testid="search-artist-input"
          />
          <Button
            disabled={ buttonStatus }
            data-testid="search-artist-button"
            onClick={ this.buttonSearch }
          >
            Pesquisar
          </Button>
          <div>
            { loadingCondition ? <Loading /> : null }
            { returnApi
              ? (
                `Resultado de álbuns de:  ${busca}`
              ) : null}
          </div>
          { onAlbuns ? resultApi.map((param, index) => (
            <div key={ index }>
              <Link
                to={ `/album/${param.collectionId}` }
                data-testid={ `link-to-album-${param.collectionId}` }
              >
                <img src={ param.artworkUrl100 } alt="" />
                <div>{param.collectionName}</div>
                <div>{ param.artistName }</div>
              </Link>
            </div>
          ))
            : null }
          { notAlbuns ? 'Nenhum álbum foi encontrado' : null }
        </div>
      </div>
    );
  }
}

// respostaAPI.map((album) => {
//   <div>
//     {album}
//   </div>;
// })

export default Search;
