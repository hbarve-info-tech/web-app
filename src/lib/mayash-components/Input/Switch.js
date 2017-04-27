import React from "react";
import PropTypes from "react/lib/ReactPropTypes";
import classNames from 'classnames';

export const SwitchLabel = ({
    children,
    id,
    ripple = false,
    className,
    ...restProps,
  }) => (
  <label
    className={classNames('mdl-switch mdl-js-switch', {
      'mdl-js-ripple-effect': ripple,
    }, className)}
    htmlFor={id}
  >
    {children}
  </label>
);
SwitchLabel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  ripple: PropTypes.bool,
  className: PropTypes.string,
};

export const SwitchInput = ({
    id,
    value,
    onChange,
    className,
    ...restProps,
}) => (
  <input
    type="checkbox"
    id={id}
    className={classNames('mdl-switch__input', className)}
    checked={value}
    value={value}
    onChange={onChange}
    {...restProps}
  />
);
SwitchInput.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  value: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export const SwitchLabelName = ({ children, className, ...restProps, }) => (
  <span
    className={classNames('mdl-switch__label', className)}
    {...restProps}
  >
    {children}
  </span>
);
SwitchLabelName.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export const Switch = ({ children, className, ...restProps, }) => (
  <div
    className={classNames('mdl-textfield mdl-js-textfield', className)}
    {...restProps}
  >
    {children}
  </div>
);
Switch.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
};

export default Switch;
