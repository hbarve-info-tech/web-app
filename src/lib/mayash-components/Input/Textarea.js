import React from "react";
import PropTypes from "react/lib/ReactPropTypes";
import classNames from 'classnames';

export const TextAreaInput = ({
  id,
  row = 3,
  value = '',
  onChange,
  className,
  ...restProps,
}) => (
  <textarea
    className={classNames('mdl-textfield__input', className)}
    type="text"
    rows={3}
    id={id}
    value={value}
    onChange={onChange}
    {...restProps}
  />
);
TextAreaInput.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  row: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export const TextAreaLabel = ({ id, name, className, ...restProps, }) => (
  <label
    className={classNames('mdl-textfield__label', className)}
    htmlFor={id}
    {...restProps}
  >
    {name}
  </label>
);
TextAreaLabel.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  className: PropTypes.string,
};

const TextArea = ({ children, className, ...restProps }) => (
  <div
    className={classNames('mdl-textfield mdl-js-textfield', className)}
    {...restProps}
  >
    {children}
  </div>
);
TextArea.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
};

export default TextArea;
