import React from "react";

const Like = ({ handleClick, liked }) => {
  let classes = "fa fa-heart";
  if (liked) {
    classes += "-o";
  }
  return <i style={{cursor:'pointer'}}onClick={handleClick} className={classes} aria-hidden="true"></i>;
};

export default Like;
