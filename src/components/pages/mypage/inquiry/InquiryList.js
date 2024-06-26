import React from 'react';
import '../inquiry/InquiryList.scss';

const InquiryList = () => {
  return (
    <div className='inquiryListContainer'>
      <div className='inquiryItem'>
        <div className='inquiryTitle'>문의사항 1</div>
        <div className='inquiryContent'>내용: 문의 내용 1</div>
      </div>
      <div className='inquiryItem'>
        <div className='inquiryTitle'>문의사항 2</div>
        <div className='inquiryContent'>내용: 문의 내용 2</div>
      </div>
      <div className='inquiryItem'>
        <div className='inquiryTitle'>문의사항 3</div>
        <div className='inquiryContent'>내용: 문의 내용 3</div>
      </div>
      <div className='inquiryItem'>
        <div className='inquiryTitle'>문의사항 4</div>
        <div className='inquiryContent'>내용: 문의 내용 4</div>
      </div>
      <div className='inquiryItem'>
        <div className='inquiryTitle'>문의사항 5</div>
        <div className='inquiryContent'>내용: 문의 내용 5</div>
      </div>
      <div className='inquiryItem'>
        <div className='inquiryTitle'>문의사항 6</div>
        <div className='inquiryContent'>내용: 문의 내용 6</div>
      </div>
    </div>
  );
};

export default InquiryList;
