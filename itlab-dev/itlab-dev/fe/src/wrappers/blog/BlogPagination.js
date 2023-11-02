import React from "react";

const Pagination = ({ SetParams, data }) => {
  const { hasNext, hasPrevious, pageSize, page, totalPages, totalItems } = data;
  return (
    <div className="pro-pagination-style text-center mt-20">
      <ul>
        {/* Nút "prev" */}
        <li>
          <button
            className={`prev ${!hasPrevious ? "disabled" : ""}`}
            onClick={() => {
              if (page != 1) {
                SetParams({
                  pageSize: 6,
                  page: page - 1,
                });
              }
            }}>
            <i className="fa fa-angle-double-left" />
          </button>
        </li>

        {/* Các nút số trang */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <li key={pageNumber}>
              <button
                className={pageNumber === page ? "active" : ""}
                style={{
                  backgroundColor: pageNumber === page && "red",
                  color: pageNumber === page && "#fff",
                }}
                onClick={() => {
                  SetParams({
                    pageSize: 6,
                    page: pageNumber,
                  });
                }}>
                {pageNumber}
              </button>
            </li>
          )
        )}

        {/* Nút "next" */}
        <li>
          <button
            className={`next ${!hasNext ? "disabled" : ""}`}
            onClick={() => {
              if (page != totalPages) {
                SetParams({
                  pageSize: 6,
                  page: page + 1,
                });
              }
            }}>
            <i className="fa fa-angle-double-right" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
