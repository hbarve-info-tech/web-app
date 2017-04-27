import React from "react";
import PropTypes from "react/lib/ReactPropTypes";
import classNames from 'classnames';

export const Form = ({ children, className, ...restProps }) => (
  <form
    className={classNames(className)}
    {...restProps}
  >
    {children}
  </form>
);

Form.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
};

export default Form;
