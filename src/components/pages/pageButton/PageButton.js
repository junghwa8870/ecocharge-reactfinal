import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import PageButtonItem from './pageButtonItem/PageButtonItem';

const PageButton = ({ pageMaker, buttonCount, clickHandler }) => {
  let index = pageMaker.begin;
  const newNums = [];
  while (index <= buttonCount) {
    newNums.push(index);
    index += 1;
  }

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

  return (
    <>
      {currentPage > 1 && (
        <Button onClick={() => handleClick(1)}>{'<<'}</Button>
      )}
      {pageMaker.prev && (
        <Button onClick={() => handleClick(currentPage - 1)}>{'<'}</Button>
      )}
      {newNums.map((num) => (
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
