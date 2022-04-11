import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../services/opentdbHelper';
import { gameSettingsAction } from '../redux/actions';

class Settings extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      category: '',
      difficulty: '',
      type: '',
    };
  }

  componentDidMount = async () => {
    const questions = await fetchCategories();
    this.setState({
      questions,
    });
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSettings = () => {
    const { setGameSettings, history } = this.props;
    const { category, difficulty, type } = this.state;
    setGameSettings({ category, difficulty, type });
    history.push('/');
  };

  render() {
    const { questions, category, difficulty, type } = this.state;
    return (
      <section className="settings-container">
        <div>
          <h1 data-testid="settings-title">Configurações</h1>
          <label htmlFor="category">
            <select
              name="category"
              id="category"
              value={ category }
              onChange={ this.handleChange }
            >
              <option value="">Any Category</option>
              {questions.map((question) => (
                <option key={ question.id } value={ question.id }>
                  {question.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="difficulty">
            <select
              name="difficulty"
              id="difficulty"
              value={ difficulty }
              onChange={ this.handleChange }
            >
              <option value="">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <label htmlFor="type">
            <select
              name="type"
              id="type"
              value={ type }
              onChange={ this.handleChange }
            >
              <option value="">Any Type</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </select>
          </label>
          <input
            className="default-btn"
            type="button"
            value="Login"
            onClick={ this.handleSettings }
          />
        </div>
      </section>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  setGameSettings: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setGameSettings: (settings) => dispatch(gameSettingsAction(settings)),
});

export default connect(null, mapDispatchToProps)(Settings);
