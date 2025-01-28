import styles from "./styles.module.css";

const Pagination = ({totalPages, handleNextPage, handlePreviousPage, handlePageClick, currentPage}) => {
    return (
        <div className={styles.pagination}>
            <button onClick={handlePreviousPage}
                    disabled={currentPage <= 1}
                    className={styles.arrow}>{'<'}</button>
            <div className={styles.list}>
                {Array.from({length: totalPages}).map((_, index) => (
                    <button onClick={() => handlePageClick(index + 1)}
                            className={styles.pageNumber}
                            disabled={index + 1 === currentPage}
                            key={index}>{index + 1}</button>
                ))}
            </div>
            <button onClick={handleNextPage}
                    disabled={currentPage >=totalPages}
                    className={styles.arrow}>{'>'}</button>
        </div>
    )
}
export default Pagination;