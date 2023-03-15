import React from 'react';
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
      </header>
    );
  }
}

export default Header;
