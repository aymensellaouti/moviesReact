import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
const TableBody = ({ data, columns }) => {
  function renderCell(item, column) {
    if (column.content) {
      return column.content(item);
    } else {
      return _.get(item, column.path);
    }
  }
  function createKey(item, column) {
    return item._id + (column.path || column.key);
  }
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {columns.map((column) => (
            <td key={createKey(item, column)} scope="col">
              {renderCell(item, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
