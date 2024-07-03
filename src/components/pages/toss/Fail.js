import React from 'react';

const Fail = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const codeElement = document.getElementById('code');
  const messageElement = document.getElementById('message');

  codeElement.textContent = '에러코드: ' + urlParams.get('code');
  messageElement.textContent = '실패 사유: ' + urlParams.get('message');

  return (
    <>
      <h2> 결제 실패 </h2>
      <p id='code'></p>
      <p id='message'></p>
    </>
  );
};

export default Fail;
