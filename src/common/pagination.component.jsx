import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
const Pagination = ({ length, itemPerPage, handleClick, currentPage }) => {
  const nbPage = Math.ceil(length / itemPerPage);
  if (nbPage === 1) return null;
  const tab = _.range(1, nbPage + 1);
  /*  Array.from(Array(nbPage).keys());*/
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {tab.map((page) => (
            <li
              style={{ cursor: "pointer" }}
              key={page}
              onClick={() => handleClick(page)}
              className={
                currentPage === page ? "page-item active" : "page-item"
              }
            >
              <a className="page-link">{page}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  length: PropTypes.number.isRequired,
  itemPerPage: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};
export default Pagination;
