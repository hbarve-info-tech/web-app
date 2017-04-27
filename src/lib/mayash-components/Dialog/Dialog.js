import React, { Component } from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import { registerDialog } from 'dialog-polyfill';
import classNames from 'classnames';

export class Dialog extends Component {
  componentDidMount() {
    const { id } = this.props;
    const dialog = document.querySelector(`#${id}`);
    if (!dialog.showModal) {
      registerDialog(dialog);
    }
  }
  render() {
    const { children, id, className = '', ...restProps } = this.props;
    return (
      <dialog
        className={classNames('mdl-dialog', className)}
        id={id}
        {...restProps}
      >
        {children}
      </dialog>
    );
  }
}
Dialog.propTypes = {
  children: PropTypes.element.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Dialog;
