import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGravatarAction } from '../redux/actions';
import logo from '../trivia.png';

class Header extends React.Component {
  componentDidMount() {
    const { setGravatar } = this.props;
    setGravatar();
  }

  render() {
    const { name, score, avatar } = this.props;
    return (
      <header>
        <section className="header-container">
          <img src={ avatar } alt="Avatar" data-testid="header-profile-picture" />
          <img src={ logo } className="header-logo" alt="logo" />
          <div>
            <span data-testid="header-player-name">{name}</span>
            <div>
              <span>Score: </span>
              <span data-testid="header-score">{score}</span>
            </div>
          </div>
        </section>
      </header>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  name: player.name,
  score: player.score,
  avatar: player.avatar,
});

const mapDispatchToProps = (dispatch) => ({
  setGravatar: () => dispatch(getGravatarAction()),
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
  setGravatar: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
