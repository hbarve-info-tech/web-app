import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const RadioLabelName = ({
    children,
    className,
    ...restProps,
  }) => (
  <span
    className={classNames('mdl-radio__label', className)}
    {...restProps}
  >
    {children}
  </span>
);
RadioLabelName.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export const RadioInput = ({
    id,
    value,
    checked,
    onChange,
    className,
    ...restProps,
  }) => (
  <input
    type="radio"
    id={id}
    className={classNames('mdl-radio__button', className)}
    value={value}
    checked={checked}
    onChange={onChange}
    {...restProps}
  />
);
RadioInput.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export const RadioLabel = ({
    children,
    id,
    ripple,
    className,
    ...restProps,
  }) => (
  <label
    className={classNames('mdl-radio mdl-js-radio', {
      'mdl-js-ripple-effect': ripple,
    })}
    id={id}
    {...restProps}
  >
    {children}
  </label>
);
RadioLabel.propTypes = {
  children: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  ripple: PropTypes.bool,
  className: PropTypes.string,
};

export const Radio = ({
  children,
  className,
  ...restProps,
}) => (
  <div
    className={classNames('mdl-textfield mdl-js-textfield', className)}
    {...restProps}
  >
    {children}
  </div>
);
Radio.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Radio;
