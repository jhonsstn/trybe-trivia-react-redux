import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGravatarAction } from '../redux/actions';

class Header extends React.Component {
  componentDidMount() {
    const { setGravatar } = this.props;
    setGravatar();
  }

  render() {
    const { name, score, avatar } = this.props;
    return (
      <header>
        <section>
          <img src={ avatar } alt="Avatar" data-testid="header-profile-picture" />
          <span data-testid="header-player-name">{name}</span>
          <span data-testid="header-score">{score}</span>
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
