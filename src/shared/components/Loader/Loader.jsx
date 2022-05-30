import { SpinnerDotted } from 'spinners-react';
import PropTypes from 'prop-types';

import styles from './loader.module.css';

const Loader = ({ isEnabled }) => {
  return (
    <div className={styles.Loader}>
      <SpinnerDotted
        enabled={isEnabled}
        size={90}
        thickness={114}
        speed={180}
        color="rgba(57, 78, 172, 1)"
      />
    </div>
  );
};

export default Loader;

Loader.propTypes = {
  isEnabled: PropTypes.bool.isRequired,
};
