import React from "react";
import PropTypes from "react/lib/ReactPropTypes";
import classNames from 'classnames';

export const TextInput = ({
  id,
  value,
  onChange,
  className,
  ...restProps,
}) => (
  <input
    className={classNames('mdl-textfield__input', className)}
    type="text"
    id={id}
    value={value}
    onChange={onChange}
    {...restProps}
  />
);
TextInput.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export const TextInputLabel = ({ children, className, id, ...restProps, }) => (
  <label
    className={classNames('mdl-textfield__label', className)}
    htmlFor={id}
    {...restProps}
  >
    {children}
  </label>
);
TextInputLabel.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  className: PropTypes.string,
};

export const Text = ({ children, className, ...restProps }) => (
  <div
    className={classNames('mdl-textfield mdl-js-textfield', className)}
    {...restProps}
  >
    {children}
  </div>
);

Text.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
};

export default Text;
