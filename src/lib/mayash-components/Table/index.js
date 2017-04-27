import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const TableHeading = ({ className, children, numeric, ascending, descending, ...restProps }) => (
  <th
    className={classNames({
      'mdl-data-table__cell--non-numeric': !numeric,
      'mdl-data-table__header--sorted-ascending': ascending,
      'mdl-data-table__header--sorted-descending': descending,
    }, className)}
    {...restProps}
  >
    {children}
  </th>
);
TableHeading.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  numeric: PropTypes.bool,
  ascending: PropTypes.bool,
  descending: PropTypes.bool,
};

export const TableData = ({
  children,
  className,
  numeric = false,
  ...restProps,
}) => (
  <td
    className={classNames({'mdl-data-table__cell--non-numeric': !numeric}, className)}
    {...restProps}
  >
    {children}
  </td>
);
TableData.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  numeric: PropTypes.bool,
};

export const TableRow = ({ children, className, ...restProps }) => (
  <tr
    className={classNames(className)}
    {...restProps}
  >
    {children}
  </tr>
);
TableRow.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
};

export const TableHead = ({ children, className, ...restProps }) => (
  <thead
    className={classNames(className)}
    {...restProps}
  >
    {children}
  </thead>
);
TableHead.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
};

export const TableBody = ({ children, className, ...restProps }) => (
  <tbody
    className={classNames(className)}
    {...restProps}
  >
    {children}
  </tbody>
);
TableBody.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
};

export const Table = ({ children, selectable = false, className, ...restProps }) => (
  <table
    className={classNames('mdl-data-table mdl-js-data-table', {
      'mdl-data-table--selectable': selectable,
    }, className)}
    {...restProps}
  >
    {children}
  </table>
);
TableRow.propTypes = {
  children: PropTypes.element.isRequired,
  selectable: PropTypes.bool,
  className: PropTypes.string,
};

export default Table;
