import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './searchbar.module.css';

class Searchbar extends Component {
  state = {
    q: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { q } = this.state;
    this.props.onSubmit(q);
    this.reset();
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  reset() {
    this.setState({
      q: '',
    });
  }

  render() {
    const { handleChange, handleSubmit } = this;
    const { q } = this.state;

    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={styles['SearchForm-button']}>
            <span className={styles['SearchForm-button-label']}>Search</span>
          </button>

          <input
            name="q"
            className={styles['SearchForm-input']}
            type="text"
            value={q}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
            required
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
