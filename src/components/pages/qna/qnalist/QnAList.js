import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { API_BASE_URL, QNA } from '../../../../config/host-config';

const QnAList = () => {
  const requestUrl = API_BASE_URL + QNA;
  const categories = [
    { name: '전체', value: 'all' },
    { name: '홈페이지', value: 'homePage' },
    { name: '전기차 충전소', value: 'chargeSpot' },
    { name: '기타', value: 'etc' },
  ];

  const [qnaData, setQnaData] = useState([]);

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

  useEffect(() => {
    const qnaListRenderingHandler = async () => {
      const res = await axios.get(requestUrl);

      // console.log(res.data);
      setQnaData(res.data.qnas);
    };

    qnaListRenderingHandler();
  }, []);

  return (
    <div className='qnacontainer' style={{ padding: '20px' }}>
      <div className='goBeforePageBtnBox'>
        <div className='goBeforePageBtn' onClick={() => navigate('/qna')}>
          <FontAwesomeIcon icon={faChevronLeft} /> &nbsp;Back
        </div>
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
          <Button
            className='goMyAskList'
            onClick={() => navigate('/myquestionlist')}
          >
            내 문의내역
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

      <div className='qnaListContainer'>
        {filteredQnaData.map((qna) => (
          <div
            key={qna.qnaNo}
            className='qnaListInnerBox'
            onClick={handleTdClick}
          >
            <div className='qlistNum'>{qna.qnaNo}</div>
            <div className='qlistCategory'>{qna.qcategory}</div>
            <div className='qlistTitle'>{qna.qtitle}</div>
            {/* <div className='qlistWriter'>{qna.qwriter}</div> */}
            {/* <div className='qlistDate'>{qna.date}</div> */}
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
