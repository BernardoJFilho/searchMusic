import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    nameId: 'Carregando...',
  };

  componentDidMount() {
    this.getResult();
  }

  getResult = async () => {
    const response = await getUser();
    // console.log(response);
    this.setState({
      nameId: response.name,
    });
  };

  render() {
    const { nameId } = this.state;
    return (
      <header data-testid="header-component">
        <div data-testid="header-user-name">{ nameId }</div>
        <div>
          <Link to="/search" data-testid="link-to-search">
            <button>Search</button>
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            <button>Favorites</button>
          </Link>
          <Link to="/profile" data-testid="link-to-profile">
            <button>Profile</button>
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
