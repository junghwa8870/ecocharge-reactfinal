import React from 'react';
import { Button } from 'reactstrap';
import './PageButtonItem.scss';

const PageButtonItem = ({ no, clickHandler, isActive }) => {
  return (
    <Button
      className={`page-button-item ${isActive ? 'active' : ''}`}
      onClick={() => clickHandler(no)}
    >
      {no}
    </Button>
  );
};

export default PageButtonItem;
