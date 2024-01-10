import styles from "./Button.module.css";
import PropTypes from "prop-types";
function Button({ children, onClick, type }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={` ${styles[type]} ${styles.btn}`}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default Button;
