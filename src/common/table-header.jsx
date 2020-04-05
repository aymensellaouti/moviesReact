import React from "react";

const TableHeader = ({ columns, sortField, onSort }) => {
  function handleSort(champ) {
    if (sortField.column === champ) {
      const orderBy = sortField.orderBy === "asc" ? "desc" : "asc";
      onSort({ column: champ, orderBy: orderBy });
    } else {
      onSort({ column: champ, orderBy: "asc" });
    }
  }
  function renderSortIcon(column) {
    if (column.path !== sortField.column) return null;
    if (sortField.orderBy === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  }
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.path || column.key}
            onClick={() => handleSort(column.path)}
            scope="col"
          >
            {column.title} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
