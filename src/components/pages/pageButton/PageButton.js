import React from 'react';
import { Button } from 'reactstrap';
import PageButtonItem from './pageButtonItem/PageButtonItem';

const PageButton = ({ pageMaker, buttonCount, clickHandler }) => {
  let index = 1;
  const newNums = [];
  while (index <= buttonCount) {
    newNums.push(index);
    index += 1;
  }

  return (
    <>
      {pageMaker.page && pageMaker.page.pageNo > 1 && <Button>{'<<'}</Button>}
      {pageMaker.prev && <Button>{'<'}</Button>}
      {newNums.map((num) => (
        <PageButtonItem key={num} no={num} clickHandler={clickHandler} />
      ))}
      {pageMaker.next && <Button>{'>'}</Button>}
      {pageMaker.page && pageMaker.page.pageNo < pageMaker.finalPage && (
        <Button>{'>>'}</Button>
      )}
    </>
  );
};

export default PageButton;
