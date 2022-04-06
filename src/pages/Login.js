import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { userLoginAction, fetchTokenAction } from '../actions/loginAction';

class Login extends React.Component {
  constructor() {
    super();

    this.inputsValidation = this.inputsValidation.bind(this);
    this.inputsControl = this.inputsControl.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      isDisable: true,
      email: '',
      surname: '',
    };
  }

  inputsValidation() {
    const { email, surname } = this.state;
    const isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
    this.setState({ isDisable: !(isValid && surname.length > 0) });
  }

  inputsControl({ target: { name, value } }) {
    this.setState({ [name]: value }, this.inputsValidation);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { getPlayerData, getPlayerToken, history } = this.props;
    getPlayerToken();
    getPlayerData(this.state);
    history.push('/game');
  }

  render() {
    const { history } = this.props;
    const { isDisable, email, surname } = this.state;

    return (
      <section>
        <form onSubmit={ this.handleSubmit }>
          <input
            type="text"
            name="surname"
            placeholder="Seu nome:"
            value={ surname }
            data-testid="input-player-name"
            onChange={ this.inputsControl }
          />
          <input
            type="text"
            name="email"
            placeholder="Seu email:"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.inputsControl }
          />
          <button type="submit" data-testid="btn-play" disabled={ isDisable }>
            Play
          </button>
        </form>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Configurações
        </button>
      </section>
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
  getPlayerData: (state) => dispatch(userLoginAction(state)),
  getPlayerToken: () => dispatch(fetchTokenAction()),
});

export default connect(null, mapDispatchToProps)(Login);
