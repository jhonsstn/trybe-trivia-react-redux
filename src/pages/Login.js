import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { userLogin, fetchAPIAction } from '../action';

class Login extends React.Component {
  constructor() {
    super();

    this.handleDisable = this.handleDisable.bind(this);
    this.validateValues = this.validateValues.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      isDisable: true,
      email: '',
      surname: '',
    };
  }

  handleDisable() {
    const { email, surname } = this.state;
    const isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
    if (isValid && surname.length > 0) {
      this.setState({ isDisable: false });
    }
  }

  validateValues({ target: { name, value } }) {
    this.setState({ [name]: value });
    this.handleDisable();
  }

  handleSubmit() {
    const { getPlayerData, getPlayerToken, history } = this.props;
    getPlayerToken();
    getPlayerData(this.state);

    history.push('/game');
  }

  render() {
    const { isDisable, email, surname } = this.state;

    return (
      <form>
        <input
          type="text"
          name="surname"
          placeholder="Seu nome:"
          value={ surname }
          data-testid="input-player-name"
          onChange={ this.validateValues }
        />
        <input
          type="text"
          name="email"
          placeholder="Seu email:"
          value={ email }
          data-testid="input-gravatar-email"
          onChange={ this.validateValues }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ isDisable }
          onClick={ this.handleSubmit }
        >
          Play
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  getPlayerData: PropTypes.func.isRequired,
  getPlayerToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getPlayerData: (state) => dispatch(userLogin(state)),
  getPlayerToken: () => dispatch(fetchAPIAction()),
});

export default connect(null, mapDispatchToProps)(Login);
