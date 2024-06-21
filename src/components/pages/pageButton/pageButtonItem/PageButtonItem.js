import React from 'react';
import { Button } from 'reactstrap';

const PageButtonItem = ({ no, clickHandler }) => {
  const onclickHandler = () => {
    clickHandler(no);
  };
  return <Button onClick={onclickHandler}>{no}</Button>;
};

export default PageButtonItem;
