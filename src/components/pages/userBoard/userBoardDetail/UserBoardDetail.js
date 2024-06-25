import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  faFontAwesome,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

const UserBoardDetail = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

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

  const toggleReportModal = () => {
    setIsReportModalOpen(!isReportModalOpen);
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
      <div className='backUserBoard' onClick={() => navigate('/userBoard')}>
        <FontAwesomeIcon icon={faChevronLeft} /> &nbsp;Back
      </div>
      <h1 className='UBDcontainerTitle'>게시글</h1>
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
      <Card className='UBD-card-container'>
        <Grid className='UserBoardInfo'>
          <div className='BoardInfoDetail'>글번호: 1</div>
          <div className='BoardInfoDetail'>작성자: 이영섭</div>
          <div className='BoardInfoDetail'>작성일: 2024-06-25</div>
          <div className='BoardInfoDetail'>조회수: 23</div>
        </Grid>
        <CardImg
          className='UBDcardIMG'
          alt='Card image cap'
          src='https://imgnews.pstatic.net/image/056/2024/06/18/0011743536_001_20240618160910846.jpg?type=w647'
          top
          width='100%'
        />
        <CardBody className='UBDcardBody'>
          <CardTitle tag='h5' className='UBDcardTitle'>
            전기차 추천 좀 해주세요.
          </CardTitle>
          <CardText>
            전기차를 사고 싶은데 한번도 구매해본 적이 없어서,, 회원님들이
            보시기엔 어떤 제품이 좋을까요?
          </CardText>
          <CardText>
            <small className='text-muted'>Last updated 3 mins ago</small>
          </CardText>
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
          <CardTitle tag='h5'>댓글</CardTitle>
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
        <CardBody>
          <Form onSubmit={handleCommentSubmit}>
            {/* 백엔드 연동이 되어있지 않아 로그인 후 댓글 작성시 화면구현이 어려워서 예시용으로 넣음 */}
            <FormGroup>
              <Label for='commentAuthor'>작성자</Label>
              <Input
                type='text'
                name='author'
                id='commentAuthor'
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                placeholder='이름을 입력해주세요.'
              />
            </FormGroup>
            <FormGroup>
              <Label for='commentText'>댓글 작성</Label>
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
            top: '386px',
            right: '10px',
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
                  <Label for='reporterText'>사유</Label>
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
