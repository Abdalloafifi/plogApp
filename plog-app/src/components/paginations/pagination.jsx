import "./pagination.css";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="pagination">
            <div
                className={`page-previous ${currentPage === 1 ? "disabled" : ""}`}
                onClick={() => {
                    if (currentPage > 1) onPageChange(currentPage - 1);
                }}
            >
                Previous
            </div>
            {pages.map((p) => (
                <div
                    className={`page-number ${p === currentPage ? "active" : ""}`}
                    key={p}
                    onClick={() => onPageChange(p)}
                >
                    {p}
                </div>
            ))}
            <div
                className={`page-next ${currentPage === totalPages ? "disabled" : ""}`}
                onClick={() => {
                    if (currentPage < totalPages) onPageChange(currentPage + 1);
                }}
            >
                Next
            </div>
        </div>
    );
};

export default Pagination;
