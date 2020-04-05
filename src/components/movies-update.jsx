import React from "react";

const MoviesUpdate = ({ match, history }) => {
  function handleClick() {
    history.push("/movies");
  }
  return (
    <>
      <h1>Movie Form {match.params.id}</h1>
      <button onClick={handleClick} className="btn btn-primary">
        Save
      </button>
    </>
  );
};

export default MoviesUpdate;
