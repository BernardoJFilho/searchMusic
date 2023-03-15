/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import PropTypes from 'prop-types';
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
    const response = await createUser({ name: valor });
    // const data = await response.json();
    console.log(response);
    const { history } = this.props;
    history.push('/search');
  };

  render() {
    const { buttonDisable, valor, divStatus } = this.state;
    return (
      <div data-testid="page-login">
        {divStatus
          ? <>
            <div>
              Login
            </div>
            <label>
              <input
                name="valor"
                data-testid="login-name-input"
                value={ valor }
                type="text"
                placeholder="Login"
                onChange={ this.buttonOn }
              />
            </label>
            <button
              data-testid="login-submit-button"
              disabled={ buttonDisable }
              onClick={ this.getApi }
            >
              Entrar
            </button>
          </>
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
