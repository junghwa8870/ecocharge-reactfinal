import React from 'react';
import { Button } from 'reactstrap';
import PageButtonItem from './pageButtonItem/PageButtonItem';

const PageButton = ({ pageMaker, buttonCount, clickHandler }) => {
  let index = pageMaker.begin;
  const newNums = [];
  while (index <= buttonCount) {
    newNums.push(index);
    index += 1;
  }

  return (
    <>
      {pageMaker.page && pageMaker.page.pageNo > 1 && (
        <Button
          onClick={() => {
            clickHandler(1);
          }}
        >
          {'<<'}
        </Button>
      )}
      {pageMaker.prev && (
        <Button
          onClick={() => {
            clickHandler(pageMaker.page.pageNo - 1);
          }}
        >
          {'<'}
        </Button>
      )}
      {newNums.map((num) => (
        <PageButtonItem key={num} no={num} clickHandler={clickHandler} />
      ))}
      {pageMaker.next && (
        <Button
          onClick={() => {
            clickHandler(pageMaker.page.pageNo + 1);
          }}
        >
          {'>'}
        </Button>
      )}
      {pageMaker.page && pageMaker.page.pageNo < pageMaker.finalPage && (
        <Button
          onClick={() => {
            clickHandler(pageMaker.finalPage);
          }}
        >
          {'>>'}
        </Button>
      )}
    </>
  );
};

export default PageButton;
