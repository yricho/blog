
import PropTypes from 'prop-types';

const styles = {
  size: {
    b2: 'text-lg',
    b1: 'text-xl',
    h1: 'text-4xl',
    h2: 'text-3xl',
    h3: 'text-2xl'
  },
  weight: {
    light: 'font-light',
    regular: 'font-regular',
    medium: 'font-medium',
    bold: 'font-bold',
    black: 'font-black'
  }
}

const Typography = ({ size = 'b1', className = '', weight = 'regular', children }) => {
  return <span className={`${styles.size[size]} ${styles.weight[weight]} ${className}`}>{children}</span>
}

Typography.propTypes = {
  size: PropTypes.oneOf(['caption1', 'caption2', 'b1', 'b2', 'h1', 'h2', 'h3', 'h4']),
  weight: PropTypes.oneOf(['light', 'regular', 'medium', 'bold', 'black']),
  isUnderline: PropTypes.bool,
  className: PropTypes.string,
}

export { Typography }