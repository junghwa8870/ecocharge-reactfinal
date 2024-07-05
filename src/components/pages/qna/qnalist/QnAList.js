import React, { useEffect, useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  InputGroup,
  Input,
  InputGroupText,
} from 'reactstrap';
import './QnAList.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { API_BASE_URL, QNA } from '../../../../config/host-config';
import axiosInstance from '../../../../config/axios-config';
import PageButton from '../../pageButton/PageButton';

const QnAList = () => {
  const requestUrl = API_BASE_URL + QNA;
  const categories = [
    { name: '전체', value: 'all' },
    { name: '홈페이지', value: 'homePage' },
    { name: '전기차 충전소', value: 'chargeSpot' },
    { name: '기타', value: 'etc' },
  ];
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;

  const [qnaData, setQnaData] = useState([]);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [searchTypeDropdownOpen, setSearchTypeDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [filteredQnaData, setFilteredQnaData] = useState([]);
  const [pageMaker, setPageMaker] = useState({});
  const [pageButtonCount, setPageButtonCount] = useState(0);
  const [pageNo, setPageNo] = useState(page);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('title');
  const navigate = useNavigate();
  const location = useLocation();

  const toggleCategoryDropdown = () =>
    setCategoryDropdownOpen((prevState) => !prevState);
  const toggleSearchTypeDropdown = () =>
    setSearchTypeDropdownOpen((prevState) => !prevState);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.name);
  };

  const handleTdClick = async (qnaNo) => {
    const res = await axiosInstance.get(requestUrl + `/${qnaNo}`);
    console.log(res.data);
    alert(
      '비밀글은 본인만 확인 가능합니다.\n로그인을 하시고 이용해주시길 바랍니다.',
    );
  };

  const pageButtonClickHandler = (no) => {
    setPageNo(no);
    if (location.pathname && pageNo !== no) {
      navigate(`/qnalist?page=${no}`, { state: { page: no } });
    }
  };

  const qnaListRenderingHandler = async () => {
    let url = requestUrl;
    const res = await axios.get(url);
    setQnaData(res.data.qnas);
    setPageMaker(res.data.pageMaker);
    setPageButtonCount(res.data.pageMaker.end);
    setFilteredQnaData(res.data.qnas); // 초기 데이터 설정
  };

  useEffect(() => {
    qnaListRenderingHandler();
  }, [location.state]);

  useEffect(() => {
    const handleBackButton = (event) => {
      if (event.state.usr !== null) {
        setPageNo(event.state.usr.page);
      } else {
        setPageNo(1);
      }
    };

    window.addEventListener('popstate', handleBackButton);
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  useEffect(() => {
    filterQnaData();
  }, [selectedCategory, qnaData, searchQuery, searchType]);

  const filterQnaData = () => {
    let filteredData = qnaData;

    if (selectedCategory !== '전체') {
      filteredData = filteredData.filter(
        (qna) => qna.qcategory === selectedCategory,
      );
    }

    if (searchQuery) {
      filteredData = filteredData.filter((qna) => {
        if (searchType === 'title') {
          return qna.qtitle.includes(searchQuery);
        } else if (searchType === 'writer') {
          return qna.qwriter.includes(searchQuery);
        }
        return true;
      });
    }

    setFilteredQnaData(filteredData);
  };

  return (
    <div className='qnacontainer' style={{ padding: '20px' }}>
      <div className='goBeforePageBtnBox'>
        <div className='goBeforePageBtn1' onClick={() => navigate('/qna')}>
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

      <div
        className='dropdown-container'
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '0 auto',
          width: '80%',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Dropdown
          className='qnaListDropdown'
          isOpen={categoryDropdownOpen}
          toggle={toggleCategoryDropdown}
          style={{ marginRight: '10px' }}
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

        <Dropdown
          isOpen={searchTypeDropdownOpen}
          toggle={toggleSearchTypeDropdown}
        >
          <DropdownToggle caret>
            {searchType === 'title' ? '제목' : '작성자'}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => setSearchType('title')}>
              제목
            </DropdownItem>
            <DropdownItem onClick={() => setSearchType('writer')}>
              작성자
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <InputGroup
          className='search-bar'
          style={{ width: '40%', paddingTop: '20px' }}
        >
          <Input
            style={{ width: '100%' }}
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search by ${searchType === 'title' ? '제목' : '작성자'}`}
          />
          {/* <InputGroupText>
          <Button onClick={filterQnaData}>검색</Button>
        </InputGroupText> */}
        </InputGroup>
      </div>

      <div className='qnaListContainer'>
        {filteredQnaData.map((qna) => (
          <div
            key={qna.qnaNo}
            className='qnaListInnerBox'
            onClick={() => handleTdClick(qna.qnaNo)}
          >
            <div className='qlistNum'>{qna.count}</div>
            <div className='qlistCategory'>{qna.qcategory}</div>
            <div className='qlistTitle'>{qna.qtitle}</div>
            <div className='qlistWriter'>{qna.qwriter}</div>
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
        <PageButton
          pageMaker={pageMaker}
          buttonCount={pageButtonCount}
          clickHandler={pageButtonClickHandler}
          page={pageNo}
        />
      </div>
    </div>
  );
};

export default QnAList;
