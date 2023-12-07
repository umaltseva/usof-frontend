// usePagination.js
import { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

const usePagination = (pageSize) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0); // Add this state to manage total pages

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const paginationItems = () => {
        let items = [];
        for (let number = 1; number <= totalPages; number++) {
            items.push(
                <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                    {number}
                </Pagination.Item>,
            );
        }
        return items;
    };

    return { currentPage, setCurrentPage, totalPages, setTotalPages, paginationItems };
};

export default usePagination;
