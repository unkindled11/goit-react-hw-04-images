import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [q, setQ] = useState('');
  const handleChange = ({ target }) => {
    const { value } = target;
    setQ(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ q });
    setQ('');
  };

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
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
