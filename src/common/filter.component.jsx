import React from "react";

const Filter = ({
  items,
  itemTextProperty,
  handleFilterClick,
  selectedFilter,
  valueItemProperty,
}) => {
  return (
    <div className="list-group">
      <a
        onClick={() => handleFilterClick(null)}
        style={{ cursor: "pointer" }}
        className={
          !selectedFilter
            ? "list-group-item list-group-item-action active"
            : "list-group-item list-group-item-action"
        }
      >
        All Genres
      </a>
      {items.map((item) => (
        <a
          key={item[valueItemProperty]}
          onClick={() => handleFilterClick(item)}
          style={{ cursor: "pointer" }}
          className={
            selectedFilter && selectedFilter._id === item._id
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action"
          }
        >
          {item[itemTextProperty]}
        </a>
      ))}
    </div>
  );
};
Filter.defaultProps = {
  itemTextProperty: "name",
  valueItemProperty: "_id",
};
export default Filter;
