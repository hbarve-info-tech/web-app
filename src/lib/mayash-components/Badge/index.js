import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const Badge = ({
  icon = false,
  overlap = false,
  dataBadge,
  background = true,
  children,
  className,
}) => {
  const badgeClass = classNames('mdl-badge', {
    'material-icons': icon,
    'mdl-badge--overlap': overlap,
    'mdl-badge--no-background': background,
  }, className);

  return (
    <div
      className={badgeClass}
      data-badge={dataBadge}
    >
      {children}
    </div>
  );
};

Badge.propTypes = {
  icon: PropTypes.bool.isRequired,
  overlap: PropTypes.bool.isRequired,
  dataBadge: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  background: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
};

export default Badge;
