import React, { useContext, useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from 'reactstrap';
import './MyQuestionList.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Paging from '../../../../layout/Paging.js';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faSquareMinus,
} from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../../../../utils/AuthContext.js';
import axios from 'axios';
import { API_BASE_URL, QNA } from '../../../../../config/host-config.js';

const QnAList = () => {
  const categories = [
    { name: '전체', value: 'all' },
    { name: '홈페이지', value: 'category1' },
    { name: '전기차 충전소', value: 'category2' },
    { name: '기타', value: 'category3' },
  ];

  const myQnAData = [
    {
      id: 1,
      category: '홈페이지',
      title: '접속이 잘 안돼요.',
      writer: '홍길동',
      date: '2024-06-19',
      response:
        '해당 문제는 서버 문제로 발생할 수 있습니다. 현재 점검 중입니다.',
    },
    {
      id: 2,
      category: '전기차 충전소',
      title: '충전 속도가 너무 느려요.',
      writer: '홍길동',
      date: '2024-06-20',
      response: '충전 속도가 느린 경우 충전기의 상태를 확인해 주세요.',
    },
    {
      id: 3,
      category: '기타',
      title: '기타 질문입니다.',
      writer: '홍길동',
      date: '2024-06-21',
      response: '기타 문의는 고객센터로 연락 주시기 바랍니다.',
    },
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [activeQuestion, setActiveQuestion] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅 사용
  const { role } = useContext(AuthContext);
  const requestUrl = API_BASE_URL + QNA;

  // const qnaListRenderingHandler = () => {
  //   let url = `${requestUrl}?page=${}`;

  // };

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.name);
  };

  const handleRowClick = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  const handleDeleteClick = async (id) => {
    console.log('삭제로직 작동');
    try {
      const response = await axios.delete(`${API_BASE_URL}${QNA}/${id}`, {
        headers: { 'content-type': 'application/json' },
      });
      const res = response.data;

      if (res) {
        alert('게시글이 삭제되었습니다');
      } else {
        alert('이미 삭제된 게시글입니다.');
      }
    } catch (error) {
      alert('다시 시도해주세요');
    }
  };

  const filteredQnaData =
    selectedCategory === '전체'
      ? myQnAData
      : myQnAData.filter((qna) => qna.category === selectedCategory);

  return (
    <div className='qnacontainer' style={{ padding: '20px' }}>
      <div className='goBeforePageBtnBox'>
        <div className='goBeforePageBtn2' onClick={() => navigate('/qnalist')}>
          <FontAwesomeIcon icon={faChevronLeft} /> &nbsp;Back
        </div>
      </div>
      <div className='qnatitle'>문의내역</div>

      <div className='comentbox'>
        <div className='comment-inner'>
          <div className='coment'>
            ●자주 발생하는 질문에 대하여서는 FAQ에 등록된 질문 및 답변내용을
            참조하여 주십시오.
          </div>
          <div className='coment'>●업무시간 : 9:00 ~ 18:00</div>
        </div>
        <div className='goAskBtnbox'>
          <Button
            className='goAskForm'
            onClick={() => navigate('/questionform')}
          >
            문의하기
          </Button>
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

      <div className='myQnaListContainer'>
        {filteredQnaData.map((qna) => (
          <div key={qna.id} className='myQnaListOuterBox'>
            <div
              className='myQnaListInnerBox'
              // style={{ cursor: 'pointer' }}
              // onClick={() => handleRowClick(qna.id)}
            >
              <div className='mqlistNum' onClick={() => handleRowClick(qna.id)}>
                {qna.id}
              </div>
              <div
                className='mqlistCategory'
                onClick={() => handleRowClick(qna.id)}
              >
                {qna.category}
              </div>
              <div
                className='mqlistTitle'
                onClick={() => handleRowClick(qna.id)}
              >
                {qna.title}
              </div>
              <div
                className='mqlistWriter'
                onClick={() => handleRowClick(qna.id)}
              >
                {qna.writer}
              </div>
              <div
                className='mqlistDate'
                onClick={() => handleRowClick(qna.id)}
              >
                {qna.date}
              </div>

              {role === 'ADMIN' && (
                <div
                  className='mqlistDeleteBtn'
                  onClick={() => handleDeleteClick(qna.id)}
                >
                  <FontAwesomeIcon icon={faSquareMinus} />
                </div>
              )}
            </div>
            {activeQuestion === qna.id && (
              <div className='responseBox'>
                <span className='a-mark'>A.</span>
                <div className='responseText'>{qna.response}</div>
              </div>
            )}
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
