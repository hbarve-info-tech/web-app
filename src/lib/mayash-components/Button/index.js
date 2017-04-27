import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const Button = ({
  children = 'Button',
  raised = false,
  fab = false,
  fabMini = false,
  icon = false,
  ripple = false,
  primary = false,
  accent = false,
  disabled = false,
  onClick,
  ...restProps,
}) => {
  const buttonClass = classNames([
    'mdl-button',
    'mdl-js-button',
  ], {
    'mdl-button--raised': raised,
    'mdl-button--fab': fab || fabMini,
    'mdl-button--mini-fab': fabMini,
    'mdl-button--icon': icon,
    'mdl-button--primary': primary,
    'mdl-button--accent': accent,
    'mdl-js-ripple-effect': ripple,
  });

  return (
    <button
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  raised: PropTypes.bool,
  fab: PropTypes.bool,
  fabMini: PropTypes.bool,
  icon: PropTypes.bool,
  ripple: PropTypes.bool,
  disabled: PropTypes.bool,
  primary: PropTypes.bool,
  accent: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Button;
