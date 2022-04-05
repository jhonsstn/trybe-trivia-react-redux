import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.handleDisable = this.handleDisable.bind(this);
    this.validetValues = this.validetValues.bind(this);

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

  validetValues({ target: { name, value } }) {
    this.setState({ [name]: value });

    this.handleDisable();
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
          onChange={ this.validetValues }
        />
        <input
          type="text"
          name="email"
          placeholder="Seu email:"
          value={ email }
          data-testid="input-gravatar-email"
          onChange={ this.validetValues }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ isDisable }
        >
          Play
        </button>
      </form>
    );
  }
}

export default Login;
