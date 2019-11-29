import React from "react";

const SearchBox = () => {
  return (
    <div className="form-group has-search">
      <span className="fa fa-search form-control-feedback"></span>
      <input type="text" className="form-control" placeholder="Search" />
    </div>
  );
};

export default SearchBox;
