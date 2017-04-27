// TODO: This component is getting messy, so I'm leaving it here.
// https://github.com/react-mdl/react-mdl/blob/master/src/ProgressBar.js,
// use this link to get it done.
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export class ProgressBar extends React.Component {
  componentDidMount() {
    const { id } = this.props;
    document.querySelector(`#${id}`)
      .addEventListener('mdl-componentupgraded', function() {
        this.MaterialProgress.setProgress(44);
      });
  }
  componentWillUnmount() {
    const { id } = this.props;

    document.querySelector(`#${id}`)
      .removeEventListener('mdl-componentupgraded', function() {
        this.MaterialProgress.setProgress(44);
      });
  }

  setProgress(progress) {
    if (!this.props.indeterminate && progress !== undefined) {
      findDOMNode(this).MaterialProgress.setProgress(progress);
    }
  }

  setBuffer(buffer) {
    if (buffer !== undefined) {
      findDOMNode(this).MaterialProgress.setBuffer(buffer);
    }
  }

  render() {
    const { id, indeterminate } = this.props;
    const className = classNames('mdl-progress mdl-js-progress', {
      'mdl-progress__indeterminate': indeterminate,
    });

    return (
      <div id={id} className={className} />
    )
  }
}
ProgressBar.propTypes = {
  buffer: PropTypes.number,
  className: PropTypes.string,
  indeterminate: PropTypes.bool,
  progress: PropTypes.number
};

export default ProgressBar;
