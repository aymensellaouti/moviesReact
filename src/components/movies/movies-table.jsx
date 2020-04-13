import React from "react";
import Like from "../../common/like.component";
import Table from "../../common/table.component";
import { Link } from "react-router-dom";
import authService from "../../services/authService";

const MoviesTable = ({ movies, onLike, onDelete, onSort, sortField }) => {
  /*   const [state, setstate] = useState(initialState); */
  function getLike(item) {
    return <Like liked={item.like} handleClick={() => onLike(item._id)}></Like>;
  }
  function getLink(item) {
    const link = `/movies/${item._id}`;
    return <Link to={link}>{item.title}</Link>;
  }
  function getDeleteButton(item) {
    return (
      authService.getCurrentUser() &&
      authService.getCurrentUser().isAdmin && (
        <button onClick={() => onDelete(item._id)} className="btn btn-danger">
          Delete
        </button>
      )
    );
  }
  const columns = [
    { title: "Title", path: "title", content: getLink },
    { title: "Genre", path: "genre.name" },
    { title: "Stock", path: "numberInStock" },
    { title: "Rate", path: "dailyRentalRate" },
    {
      key: "rate",
      content: getLike,
    },
    {
      key: "actions",
      content: getDeleteButton,
    },
  ];
  return (
    <Table
      data={movies}
      onLike={onLike}
      onDelete={onDelete}
      onSort={onSort}
      sortField={sortField}
      columns={columns}
    ></Table>
  );
};

export default MoviesTable;
