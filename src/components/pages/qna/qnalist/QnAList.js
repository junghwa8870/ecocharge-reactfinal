import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from 'reactstrap';
import './QnAList.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Paging from '../../../layout/Paging';
import { Navigate, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const QnAList = () => {
  const categories = [
    { name: '전체', value: 'all' },
    { name: '홈페이지', value: 'category1' },
    { name: '전기차 충전소', value: 'category2' },
    { name: '기타', value: 'category3' },
  ];

  const qnaData = [
    {
      id: 1,
      category: '홈페이지',
      title: '접속이 잘 안돼요.',
      writer: '홍길동',
      date: '2024-06-19',
    },
    {
      id: 2,
      category: '전기차 충전소',
      title: '충전 속도가 너무 느려요.',
      writer: '이순신',
      date: '2024-06-20',
    },
    {
      id: 3,
      category: '기타',
      title: '기타 질문입니다.',
      writer: '박세리',
      date: '2024-06-21',
    },
    {
      id: 4,
      category: '홈페이지',
      title: '클릭이 잘 안돼요.',
      writer: '김신',
      date: '2024-06-23',
    },
    {
      id: 5,
      category: '기타',
      title: '로그인 방법이 어려워요.',
      writer: '신짱구',
      date: '2024-06-22',
    },
    {
      id: 6,
      category: '전기차 충전소',
      title: '요금이 얼마해요?',
      writer: '김유준',
      date: '2024-06-22',
    },
    // 여기에 더 많은 Q&A 데이터를 추가할 수 있습니다.
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const navigate = useNavigate(); // useNavigate 훅 사용

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.name);
  };

  const handleTdClick = () => {
    alert(
      '비밀글은 본인만 확인 가능합니다.\n로그인을 하시고 이용해주시길 바랍니다.',
    );
  };

  const filteredQnaData =
    selectedCategory === '전체'
      ? qnaData
      : qnaData.filter((qna) => qna.category === selectedCategory);

  return (
    <div className='qnacontainer' style={{ padding: '20px' }}>
      <div className='goBeforePageBtn' onClick={() => navigate('/qna')}>
        <FontAwesomeIcon icon={faChevronLeft} /> &nbsp;Back
      </div>
      <div className='qnatitle'>1 : 1 문의</div>

      <div className='comentbox'>
        <div className='comment-inner'>
          <div className='coment'>
            ●자주 발생하는 질문에 대하여서는 FAQ에 등록된 질문 및 답변내용을
            참조하여 주십시오.
          </div>
          <div className='coment'>●업무시간 : 9:00 ~ 18:00</div>
        </div>
        <div className='myqnaBtnbox'>
          <Button className='goAsk' onClick={() => navigate('/questionform')}>
            문의하기
          </Button>
          <Button className='goMyAskList'>내 문의내역</Button>
        </div>
      </div>

      <Dropdown
        className='qnaListDropdown'
        isOpen={dropdownOpen}
        toggle={toggleDropdown}
        style={{
          margin: '20px auto',
          width: '80%',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <DropdownToggle caret>{selectedCategory}</DropdownToggle>
        <DropdownMenu>
          {categories.map((category) => (
            <DropdownItem
              key={category.value}
              onClick={() => handleCategorySelect(category)}
            >
              {category.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      <div className='qnaListContainer'>
        {filteredQnaData.map((qna) => (
          <div key={qna.id} className='qnaListInnerBox' onClick={handleTdClick}>
            <div className='qlistNum'>{qna.id}</div>
            <div className='qlistCategory'>{qna.category}</div>
            <div className='qlistTitle'>{qna.title}</div>
            <div className='qlistWriter'>{qna.writer}</div>
            <div className='qlistDate'>{qna.date}</div>
          </div>
        ))}
      </div>
      <div
        className='paging-container'
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '100px',
        }}
      >
        <Paging />
      </div>
    </div>
  );
};

export default QnAList;
