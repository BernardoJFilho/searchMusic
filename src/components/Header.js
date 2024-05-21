import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider, Stack } from '@mui/material';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    nameId: <Loading />,
  };

  componentDidMount() {
    this.getResult();
  }

  getResult = async () => {
    const response = await getUser();
    this.setState({
      nameId: response.name,
    });
  };

  render() {
    const { nameId } = this.state;
    return (
      <header data-testid="header-component">
        <div style={ { height: '30px' } } data-testid="header-user-name">{ nameId }</div>
        <Stack
          direction="row"
          spacing={ 2 }
          justifyContent="center"
          alignItems="center"
          divider={ <Divider orientation="vertical" flexItem /> }
        >
          <Link to="/search" data-testid="link-to-search">
            <Button variant="outlined">Search</Button>
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            <Button variant="outlined">Favorites</Button>
          </Link>
          <Link to="/profile" data-testid="link-to-profile">
            <Button variant="outlined">Profile</Button>
          </Link>
        </Stack>
      </header>
    );
  }
}

export default Header;
