import React from "react";
import TableBody from "./table-body";
import TableHeader from "./table-header";

const Table = ({ data, columns, onSort, onLike, onDelete, sortField }) => {
  return (
    <table className="table">
      <TableHeader
        sortField={sortField}
        columns={columns}
        onSort={onSort}
      ></TableHeader>
      <TableBody
        data={data}
        onLike={onLike}
        columns={columns}
        onDelete={onDelete}
      ></TableBody>
    </table>
  );
};

export default Table;
