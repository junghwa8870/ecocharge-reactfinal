import React, { useState } from 'react';
import '../../scss/Paging.scss'; // 필요한 경우에만
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

function Pagination({ totalPages, currentPage, onPageChange }) {
  const pageSize = 5; // 한 번에 보일 페이지 수
  const pages = Math.ceil(totalPages / pageSize); // 전체 페이지 수 계산

  // 현재 페이지 그룹 계산
  const currentPageGroup = Math.ceil(currentPage / pageSize);

  // 페이지 그룹의 첫 번째 페이지 번호 계산
  const firstPageInGroup = (currentPageGroup - 1) * pageSize + 1;

  // 페이지 그룹의 마지막 페이지 번호 계산
  const lastPageInGroup = Math.min(firstPageInGroup + pageSize - 1, totalPages);

  const pageNumbers = Array.from(
    { length: lastPageInGroup - firstPageInGroup + 1 },
    (_, index) => firstPageInGroup + index,
  );

  const handlePrevClick = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className='pagination'>
      <button onClick={handlePrevClick} disabled={currentPage === 1}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={pageNumber === currentPage ? 'active' : ''}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button onClick={handleNextClick} disabled={currentPage === totalPages}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
}

function Paging() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 30; // 전체 페이지 수

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // 페이지 변경에 따른 추가 로직을 수행할 수 있음
  };

  return (
    <div className='page'>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Paging;
