import PropTypes from 'prop-types';

import styles from './button.module.css';

const Button = ({ text, loadMore }) => {
  return (
    <button type="button " className={styles.Button} onClick={loadMore}>
      {text}
    </button>
  );
};

export default Button;

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
