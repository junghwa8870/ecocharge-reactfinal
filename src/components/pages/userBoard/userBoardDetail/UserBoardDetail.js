import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import './UserBoardDetail.scss';
import { Grid } from '@mui/material';
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  faFontAwesome,
  faChevronLeft,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { API_BASE_URL, BOARD } from '../../../../config/host-config';
import handleRequest from '../../../../utils/handleRequest';
import axiosInstance from '../../../../config/axios-config';
import AuthContext from '../../../../utils/AuthContext';

const UserBoardDetail = () => {
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const { onLogout } = useContext(AuthContext);

  // State for report modal
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reporterEmail, setReporterEmail] = useState('');
  const [reportReason, setReportReason] = useState({
    욕설: false,
    음란물: false,
    광고물: false,
    기타: false,
  });
  const [reporterText, setReporterText] = useState('');

  const [detailBoard, setDetailBoard] = useState({});

  const [searchParams] = useSearchParams();
  const boardNo = parseInt(searchParams.get('boardNo')) || 1;

  useEffect(() => {
    const boardDetailRenderingHandler = async () => {
      const boardDetail = await axios.get(
        `${API_BASE_URL}${BOARD}/detail?boardNo=${boardNo}`,
      );
      console.log(boardDetail);
      setDetailBoard(boardDetail.data);
    };

    boardDetailRenderingHandler();
  }, []);

  console.log(detailBoard);
  const toggleReportModal = () => {
    setIsReportModalOpen(!isReportModalOpen);
  };

  const handleBoardDetailDelete = async () => {
    // 게시글 삭제 처리 함수 필요
    handleRequest(
      () => axiosInstance.delete(`${API_BASE_URL}${BOARD}/delete/${boardNo}`),
      (data) => {
        alert('게시물이 삭제되었습니다.');
        navigate('/board');
      },
      onLogout,
      navigate,
    );
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() && commentAuthor.trim()) {
      const newComment = {
        text: commentText,
        author: commentAuthor,
        time: new Date().toLocaleString(),
      };
      setComments([...comments, newComment]);
      setCommentText('');
      setCommentAuthor('');
    }
  };

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    // Gather report data and handle submission (e.g., send to server)
    const reportData = {
      reporterEmail,
      reportReason,
      reportDetails: reporterText,
    };
    console.log('Submitted report:', reportData);
    // You can reset form fields or close the modal here
    setIsReportModalOpen(false);
    setReporterEmail('');
    setReportReason({
      욕설: false,
      음란물: false,
      광고물: false,
      기타: false,
    });
    setReporterText('');
  };

  return (
    <Grid className='UBDcontainer'>
      <div className='backUserBoard' onClick={() => navigate('/board')}>
        <FontAwesomeIcon icon={faChevronLeft} /> &nbsp;Back
      </div>
      <h1 className='UBDcontainerTitle'>게시글</h1>
      <Grid
        className='btnBoxes'
        style={{
          width: '70%',
          margin: '0 auto 10px',
          display: 'flex',
          justifyContent: 'end',
        }}
      >
        <Grid
          className='boardDetailDeleteBtn'
          onClick={handleBoardDetailDelete}
        >
          {' '}
          <div className='deletement'>
            삭제하기&nbsp;
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </Grid>

        <Grid className='accuseBtnBox' onClick={toggleReportModal}>
          <div className='accuseText'>
            신고하기&nbsp;
            <FontAwesomeIcon
              icon={faFontAwesome}
              className='accuseBtn'
              style={{ cursor: 'pointer' }}
            />
          </div>
        </Grid>
      </Grid>
      <Card className='UBD-card-container'>
        <Grid className='UserBoardInfo'>
          <div className='BoardInfoDetail'>글번호: {detailBoard.boardNo}</div>
          <div className='BoardInfoDetail'>작성자: {detailBoard.bwriter}</div>
          <div className='BoardInfoDetail'>
            작성일: {detailBoard.createDate}
          </div>
          <div className='BoardInfoDetail'>조회수: {detailBoard.viewCount}</div>
        </Grid>
        <CardImg
          className='UBDcardIMG'
          alt='Card image cap'
          src={detailBoard.bprofileImage}
          top
          width='100%'
        />
        <CardBody className='UBDcardBody'>
          <CardTitle tag='h5' className='UBDcardTitle'>
            {detailBoard.btitle}
          </CardTitle>
          <CardText>{detailBoard.bcontent}</CardText>
        </CardBody>
      </Card>

      {/* 좋아요 및 싫어요 버튼 */}
      <Card className='UBD-card-container2'>
        <CardBody>
          <Grid className='likeDislikeContainer'>
            <Button className='goodBtn' color='primary' onClick={handleLike}>
              <FontAwesomeIcon icon={faThumbsUp} /> {likes}
            </Button>
            <Button
              className='badBtn'
              color='danger'
              onClick={handleDislike}
              style={{ marginLeft: '10px' }}
            >
              <FontAwesomeIcon icon={faThumbsDown} /> {dislikes}
            </Button>
          </Grid>
        </CardBody>
      </Card>

      {/* 댓글 목록 */}
      <Card className='UBD-card-container'>
        <CardBody>
          <CardTitle tag='h5' style={{ fontWeight: '550', color: 'black' }}>
            댓글
          </CardTitle>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className='comment'>
                <CardText>
                  <strong>{comment.author}</strong>
                </CardText>
                <CardText>{comment.text}</CardText>
                <CardText>
                  <small className='text-muted'>{comment.time}</small>
                </CardText>
                <hr />
              </div>
            ))
          ) : (
            <CardText>댓글이 없습니다.</CardText>
          )}
        </CardBody>
      </Card>

      {/* 댓글 작성 폼 */}
      <Card className='UBD-card-container'>
        <CardBody className='UBD-container-form'>
          <Form onSubmit={handleCommentSubmit}>
            {/* 백엔드 연동이 되어있지 않아 로그인 후 댓글 작성시 화면구현이 어려워서 예시용으로 넣음 */}
            <FormGroup>
              <Label
                for='commentAuthor'
                style={{ fontWeight: 'bold', color: 'black' }}
              >
                작성자
              </Label>
              <Input
                type='text'
                name='author'
                id='commentAuthor'
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                placeholder='이메일을 입력해주세요.'
              />
            </FormGroup>
            <FormGroup>
              <Label for='commentText' style={{ fontWeight: 'bold' }}>
                댓글 작성
              </Label>
              <Input
                type='textarea'
                name='comment'
                id='commentText'
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder='댓글을 입력해주세요.'
              />
            </FormGroup>
            <Grid className='mentSubmitBtnBox'>
              <Button className='mentSubmitBtn' type='submit'>
                댓글 등록
              </Button>
            </Grid>
          </Form>
        </CardBody>
      </Card>

      {/* Report modal */}
      {isReportModalOpen && (
        <Card
          className='report-modal'
          style={{
            zIndex: 9999,
            width: '400px',
            position: 'absolute',
            top: '403px',
            right: '40px',
          }}
        >
          <CardBody style={{ width: '400px' }}>
            <CardTitle tag='h5'>신고하기</CardTitle>
            <Form onSubmit={handleSubmitReport}>
              <FormGroup>
                <Label for='reporterEmail'>이메일</Label>
                <Input
                  type='email'
                  name='email'
                  id='reporterEmail'
                  value={reporterEmail}
                  onChange={(e) => setReporterEmail(e.target.value)}
                  placeholder='이메일을 입력해주세요.'
                />
              </FormGroup>
              <FormGroup>
                <Label>신고 사유</Label>
                <FormGroup check>
                  <Label check>
                    <Input
                      type='checkbox'
                      checked={reportReason['욕설']}
                      onChange={(e) =>
                        setReportReason({
                          ...reportReason,
                          욕설: e.target.checked,
                        })
                      }
                    />{' '}
                    욕설
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type='checkbox'
                      checked={reportReason['음란물']}
                      onChange={(e) =>
                        setReportReason({
                          ...reportReason,
                          음란물: e.target.checked,
                        })
                      }
                    />{' '}
                    음란물
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type='checkbox'
                      checked={reportReason['광고물']}
                      onChange={(e) =>
                        setReportReason({
                          ...reportReason,
                          광고물: e.target.checked,
                        })
                      }
                    />{' '}
                    광고물
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type='checkbox'
                      checked={reportReason['기타']}
                      onChange={(e) =>
                        setReportReason({
                          ...reportReason,
                          기타: e.target.checked,
                        })
                      }
                    />{' '}
                    기타
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Label for='reporterText' style={{ marginTop: '10px' }}>
                    기타
                  </Label>
                  <Input
                    type='text'
                    name='text'
                    id='reporterText'
                    value={reporterText}
                    onChange={(e) => setReporterText(e.target.value)}
                    placeholder='내용을 입력해주세요.'
                  />
                </FormGroup>
              </FormGroup>
              <Button type='submit'>신고 제출</Button>
            </Form>
          </CardBody>
        </Card>
      )}
    </Grid>
  );
};

export default UserBoardDetail;
