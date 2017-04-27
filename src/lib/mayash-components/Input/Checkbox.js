import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const CheckboxLabelName = ({ children, className, ...restProps }) => (
  <span
    className={classNames('mdl-checkbox__label', className)}
    {...restProps}
  >
    {children}
  </span>
);
CheckboxLabelName.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export const CheckboxInput = ({
  id,
  checked,
  value,
  onChange,
  className,
  ...restProps,
}) => (
  <input
    type="checkbox"
    id={id}
    className={classNames('mdl-checkbox__input', className)}
    checked={checked}
    value={value}
    onChange={onChange}
    {...restProps}
  />
);
CheckboxInput.propTypes = {
  className: PropTypes.string,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  checked: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onChange: PropTypes.func.isRequired,
};

export const Checkbox = ({
  children,
  className,
  id,
  ripple = false,
  ...restProps,
}) => (
  <label
    className={classNames('mdl-checkbox mdl-js-checkbox', {
      'mdl-js-ripple-effect': ripple,
    }, className)}
    htmlFor={id}
  >
    {children}
  </label>
);
Checkbox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
  ]),
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  ripple: PropTypes.bool,
  className: PropTypes.string,
};

export default Checkbox;
