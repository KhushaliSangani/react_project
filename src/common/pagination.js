import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
const Pagination = props => {
  const totalAssets = props.totalAssets;
  let currentPage = props.currentPage;
  let skip = props.skip;
  let totalPages = Math.ceil(totalAssets / 10);
  let location = window.location.href.split("=")[1];
  let parselocation = parseInt(location);
  let startItem = skip + 1;
  if (startItem > totalAssets) {
    startItem = totalAssets;
  }
  let endItem = startItem - 1 + 10;
  if (endItem > totalAssets) {
    endItem = totalAssets;
  }
  // console.log("totalpages", totalPages);
  // console.log("location", parselocation);
  // console.log("currentpage", currentPage);

  return (
    <ul className="pagination">
      <li className="page-item">
        <span>
          <strong>
            {startItem}-{endItem}
          </strong>{" "}
          of <strong>{totalAssets} Assets</strong>
        </span>
      </li>
      <li className="page-item">
        {/**********************************previous *********************************/}
        {totalPages > 1 && parselocation >= 2 ? (
          <Button
            id="prevbtn"
            component={Link}
            onClick={() => props.btnPrevClick()}
            to={`/contentstack/assets?page=${currentPage - 1}`}
          >
            <i className="fa fa-chevron-left" title="Previous"></i>
          </Button>
        ) : (
          <Button
            component={Link}
            id="prevbtn"
            onClick={() => props.btnPrevClick()}
            to={`/contentstack/assets?page=${currentPage - 1}`}
            disabled
          >
            <i className="fa fa-chevron-left" title="Previous"></i>
          </Button>
        )}
      </li>

      {/**********************************next *********************************/}
      <li className="page-item">
        {(totalPages !== 0 || totalPages === 0) &&
        (totalPages === parselocation || totalPages < parselocation) ? (
          <Button
            component={Link}
            onClick={() => props.btnNextClick()}
            to={`/contentstack/assets?page=${currentPage + 1}`}
            disabled
          >
            <i className="fa fa-chevron-right" title="Next"></i>
          </Button>
        ) : (
          <Button
            component={Link}
            onClick={() => props.btnNextClick()}
            to={`/contentstack/assets?page=${currentPage + 1}`}
          >
            <i className="fa fa-chevron-right" title="Next"></i>
          </Button>
        )}
      </li>
    </ul>
  );
};

export default Pagination;
