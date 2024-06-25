import React from 'react';
import { Button } from 'reactstrap';

const PageButtonItem = ({ no, clickHandler, page }) => {
  return (
    <Button
      className={`${page === no ? 'active' : ''}`}
      onClick={() => clickHandler(no)}
    >
      {no}
    </Button>
  );
};

export default PageButtonItem;
