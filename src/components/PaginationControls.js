import React from "react";

export default function PaginationControls({
  currentPage,
  totalPages,
  handlePageChange,
  handleLimitChange,
}) {
  return (
    <div>
      <button

      className="btn  mx-2"
        disabled={currentPage === 1}
        style={{backgroundColor:"#226D68",color:"#ECF8F6"}}  
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="btn mx-2 "
        style={{backgroundColor:"#226D68",color:"#ECF8F6"}} 
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
      {/* <select onChange={(e) => handleLimitChange(e.target.value)}>
      <option className="form-select form-select form-select-lg ml-5" value={3}>3 per page</option>
        <option value={6}>6 per page</option>
        <option value={12}>12 per page</option>
        <option value={24}>24 per page</option>
        <option value={48}>48 per page</option>
        <option value={96}>96 per page</option>
        <option value={192}>192 per page</option>
      </select> */}

      
    </div>
    
  );
}