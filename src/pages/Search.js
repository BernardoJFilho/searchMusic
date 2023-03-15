import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    pesquisar: '',
    buttonSearch: true,
  };

  buttonEnable = ({ target }) => {
    if (target.value.length >= 2) {
      this.setState({
        [target.name]: target.value,
        buttonSearch: false,
      });
    } else {
      this.setState({
        [target.name]: target.value,
        buttonSearch: true,
      });
    }
  };

  render() {
    const { buttonSearch, pesquisar } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <label>
            <input
              name="pesquisar"
              type="text"
              placeholder="Buscar"
              value={ pesquisar }
              onChange={ this.buttonEnable }
              data-testid="search-artist-input"
            />
          </label>
          <button
            disabled={ buttonSearch }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
