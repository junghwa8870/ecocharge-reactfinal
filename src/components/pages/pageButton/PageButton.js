import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import PageButtonItem from './pageButtonItem/PageButtonItem';

const PageButton = ({ pageMaker, buttonCount, clickHandler }) => {
  const [currentPage, setCurrentPage] = useState(
    pageMaker.page ? pageMaker.page.pageNo : 1,
  );

  useEffect(() => {
    setCurrentPage(pageMaker.page ? pageMaker.page.pageNo : 1);
  }, [pageMaker]);

  const handleClick = (no) => {
    setCurrentPage(no);
    clickHandler(no);
  };

  const calculatePageRange = () => {
    const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
    const endPage = Math.min(startPage + 4, buttonCount);
    return { startPage, endPage };
  };

  const { startPage, endPage } = calculatePageRange();

  return (
    <>
      {currentPage > 1 && (
        <Button onClick={() => handleClick(1)}>{'<<'}</Button>
      )}
      {pageMaker.prev && (
        <Button onClick={() => handleClick(currentPage - 1)}>{'<'}</Button>
      )}
      {Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i,
      ).map((num) => (
        <PageButtonItem
          key={num}
          no={num}
          clickHandler={handleClick}
          isActive={num === currentPage}
        />
      ))}
      {pageMaker.next && (
        <Button onClick={() => handleClick(currentPage + 1)}>{'>'}</Button>
      )}
      {currentPage < pageMaker.finalPage && (
        <Button onClick={() => handleClick(pageMaker.finalPage)}>{'>>'}</Button>
      )}
    </>
  );
};

export default PageButton;
