import React, { useContext, useEffect, useState } from 'react';
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
import { json, useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faSquareMinus,
} from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../../../../utils/AuthContext.js';
import axios from 'axios';
import { API_BASE_URL, QNA } from '../../../../../config/host-config.js';
import PageButton from '../../../pageButton/PageButton.js';

const QnAList = () => {
  const categories = [
    { name: '전체', value: 'all' },
    { name: '홈페이지', value: '홈페이지' },
    { name: '전기차 충전소', value: '전기차 충전소' },
    { name: '기타', value: '기타' },
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [activeQuestion, setActiveQuestion] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅 사용
  const { role, phoneNumber, userId, token } = useContext(AuthContext);
  const requestUrl = API_BASE_URL + QNA;
  const [myQnAData, setMyQnAData] = useState([]);
  const [searchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get('page')) || 1;
  const [pageNo, setPageNo] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [pageButtonCount, setPageButtonCount] = useState(0);
  const [pageMaker, setPageMaker] = useState({});
  const [filteredQnaData, setFilteredQnaData] = useState([]);

  // const qnaListRenderingHandler = () => {
  //   let url = `${requestUrl}?page=${}`;

  // };

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const handleCategorySelect = (category) => {
    console.log('category value:', category.value);
    setSelectedCategory(category.name);
  };

  const handleRowClick = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  const handlePageChange = (no) => {
    setPageNo(no);
    if (location.pathname && pageNo !== no) {
      navigate(`/myquestionlist?page=${no}`, { state: { page: no } });
    }
  };

  const handleDeleteClick = async (id) => {
    console.log('삭제로직 작동');
    try {
      const response = await axios.delete(`${API_BASE_URL}${QNA}/${id}`, {
        headers: { 'content-type': 'application/json' },
        params: {
          userId: localStorage.getItem('USER_ID'),
        },
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
  const fetchQnAData = async () => {
    try {
      const userId = localStorage.getItem('USER_ID');

      const body = JSON.stringify(myQnAData);
      let url = `${requestUrl}?page=${pageNo}`;

      if (userId) {
        url += `&userId=${userId}`;
      }

      const res = await axios.get(url, body, {
        headers: { 'Content-Type': 'application/json' },
      });
      // console.log(res.data);

      // 서버 응답에서 qnas 배열을 추출하여 사용
      if (res.data && Array.isArray(res.data.qnas)) {
        setMyQnAData(res.data.qnas); // qnas 배열을 가져온 데이터로 설정
        setTotalPages(res.data.pageMaker.finalPage); // 전체 페이지 수 설정
        setPageButtonCount(res.data.pageMaker.end);
        setPageMaker(res.data.pageMaker);
      } else {
        // qnas 배열이 없는 등의 예기치 않은 응답 처리
        console.error('Unexpected response format:', res.data);
        // 또는 데이터가 없는 경우 처리 로직 추가
      }
    } catch (error) {
      console.error('Error fetching Q&A data:', error);
      // 에러 처리 로직 추가
    }
  };
  useEffect(() => {
    fetchQnAData(); // 페이지 로드 시 데이터 불러오기
  }, [searchParams, pageNo, location.state, myQnAData]);

  useEffect(() => {
    const filterData = () => {
      if (selectedCategory === '전체') {
        setFilteredQnaData(myQnAData);
        // console.log(myQnAData);
      } else {
        const filteredData = myQnAData.filter(
          (qna) => qna.qcategory === selectedCategory,
        );
        setFilteredQnaData(filteredData);
      }
    };

    filterData(); // 페이지 렌더링 시 필터링 적용
  }, [myQnAData, selectedCategory]);

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
                {qna.count}
              </div>
              <div
                className='mqlistCategory'
                onClick={() => handleRowClick(qna.count)}
              >
                {qna.qcategory}
              </div>
              <div
                className='mqlistTitle'
                onClick={() => handleRowClick(qna.count)}
              >
                {qna.qtitle}
              </div>
              <div
                className='mqlistWriter'
                onClick={() => handleRowClick(qna.count)}
              >
                {qna.qwriter}
              </div>
              <div
                className='mqlistDate'
                onClick={() => handleRowClick(qna.count)}
              >
                {qna.date}
              </div>

              {role === 'ADMIN' && (
                <div
                  className='mqlistDeleteBtn'
                  onClick={() => handleDeleteClick(qna.qnaNo)}
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
        <PageButton
          pageMaker={pageMaker}
          buttonCount={pageButtonCount}
          clickHandler={handlePageChange}
          page={pageNo}
        />
      </div>
    </div>
  );
};

export default QnAList;
