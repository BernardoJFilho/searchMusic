import React from 'react';
import PropTypes from 'prop-types';
import { Button, Stack, TextField } from '@mui/material';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  state = {
    valor: '',
    buttonDisable: true,
    divStatus: true,
  };

  buttonOn = ({ target }) => {
    const minCaracter = 3;
    if (target.value.length >= minCaracter) {
      this.setState({
        buttonDisable: false,
        [target.name]: target.value,
      });
    } else {
      this.setState({
        buttonDisable: true,
        [target.name]: target.value,
      });
    }
  };

  getApi = async () => {
    this.setState({ divStatus: false });
    const { valor } = this.state;
    await createUser({ name: valor, image: '' });
    const { history } = this.props;
    history.push('/search');
  };

  render() {
    const { buttonDisable, valor, divStatus } = this.state;
    return (
      <div data-testid="page-login">
        {divStatus
          ? (
            <Stack spacing={ 0 } padding={ 40 }>
              <TextField
                label="Login"
                variant="outlined"
                name="valor"
                data-testid="login-name-input"
                value={ valor }
                type="text"
                onChange={ this.buttonOn }
              />
              <Button
                data-testid="login-submit-button"
                disabled={ buttonDisable }
                variant="contained"
                onClick={ this.getApi }
              >
                Entrar
              </Button>
            </Stack>
          )
          : <Loading valor={ valor } />}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
