import React from "react";

const SearchBar = (props) => {
  return (
    <div id="searchPage">
      <div id="searchContainer">
        <input
          type="text"
          placeholder="Search"
          onChange={(event) => {
            props.setSearchUrl(event.target.value);
          }}
        />
        <button type="submit" onClick={props.onClick}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
