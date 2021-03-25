import React from "react";
//CSS
import "./Search.css";
const Search = () => {
    return (
        <div className="box">
            <div className="container-2">
                <span className="icon">
                    <i className="fa fa-search"></i>
                </span>
                <input type="search" id="search" placeholder="Search..." />
            </div>
        </div>
    );
};

export default Search;
