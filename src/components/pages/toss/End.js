import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const End = () => {
  const naviget = useNavigate();
  useEffect(() => {
    naviget('/findCharge');
  }, []);
  return <div>End</div>;
};

export default End;
