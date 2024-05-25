import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, CircularProgress, Divider, Stack } from '@mui/material';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    nameId: <CircularProgress size={ 25 } />,
    responseImg: '',
  };

  componentDidMount() {
    this.getResult();
  }

  getResult = async () => {
    const response = await getUser();
    this.setState({
      nameId: response.name.toUpperCase(),
      responseImg: response.image,
    });
  };

  render() {
    const { nameId, responseImg } = this.state;
    return (
      <header data-testid="header-component">
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={ 2 }
          padding={ 3 }
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={ 2 }
          >
            {responseImg ? <Avatar src={ responseImg } />
              : <Avatar>{ nameId[0] }</Avatar> }
            <Stack
              style={ { width: '200px', fontSize: '25px' } }
              data-testid="header-user-name"
            >
              { nameId }
            </Stack>
          </Stack>
          <Stack
            direction="row"
            spacing={ 2 }
            justifyContent="center"
            alignItems="center"
            style={ {
              border: '1px solid',
              borderRadius: '10px',
              padding: '5px',
              backgroundColor: '#ce93d8' } }
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
        </Stack>
      </header>
    );
  }
}

export default Header;
