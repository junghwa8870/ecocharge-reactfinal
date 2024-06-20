import React, { useState } from 'react';
import { useHistory, useNavigate } from 'react-router-dom';
import './NewInfo.scss';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import Paging from '../../layout/Paging';

const NewInfoBox = ({ title, content }) => {
  const [collapse, setCollapse] = useState(false);

  const toggle = () => setCollapse(!collapse);

  return (
    <div className='newInfoBox'>
      <div
        className='newInfoInnerBox'
        style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center' }}
      >
        <Button
          className='newInfoMoreBtn'
          // color='primary'
          onClick={toggle}
          style={{
            // marginBottom: '1rem',
            // backgroundColor: '#0D6EFD',
            margin: '5px',
          }}
        >
          {collapse ? '▲' : '▼'}
        </Button>
        <span
          className='articleNum'
          style={{
            marginLeft: '0.5rem',
            fontWeight: '600',
            color: 'darkslategrey',
            textAlign: 'center',
            width: '50px',
          }}
        >
          1
        </span>
        <span
          className='articleTitle'
          style={{
            marginLeft: '0.5rem',
            fontWeight: '600',
            fontSize: '17px',
            color: 'darkslategrey',
          }}
        >
          {title}
        </span>
      </div>
      <Collapse isOpen={collapse}>
        <Card className='newInfoCard'>
          <CardBody
            className='newInfoCardBody'
            style={{ backgroundColor: '#f6f6f6' }}
          >
            {content}
          </CardBody>
        </Card>
      </Collapse>

      <div className='newInfoSmall'>
        <div className='newInfoWriteDate'>작성일: 2024/01/01</div>
        <div className='newInfoView'>조회수: 3</div>
        <a
          href=' https://www.digitaltoday.co.kr/news/articleView.html?idxno=521162'
          className='newInfoSource'
        >
          출처:
          https://www.digitaltoday.co.kr/news/articleView.html?idxno=521162
        </a>
      </div>
    </div>
  );
};

function NewInfo(props) {
  const navigate = useNavigate();

  const infoTitle = '전기차 판매량 줄었다고?…장기 전망은 "굳건" ';
  const infoContent = `
    블룸버그NEF의 장기 전기차 전망(EVO)에 따르면 배터리 가격의 급격한 하락과 차세대 배터리 기술의 발전, 내연기관차(ICE) 대비 전기차의 경제성 개선이 전 세계적으로 장기적인 전기차 성장을 뒷받침하고 있다.

    다만, 전기차 채택의 기회가 그 어느 때보다 좁아졌기 때문에 향후 몇 년 동안 전기차 판매량은 이전보다 느린 속도로 성장할 것이라는 관측이다.

    블룸버그NEF의 기본 시나리오에 따르면, 전기차 판매량은 2027년에 3000만대를 돌파하고 2040년에는 연간 7300만대까지 증가할 것으로 예상된다. 향후 4년간 전기차 판매는 연평균 21% 성장할 것으로 예상되는데, 2020년에서 2023년 사이 평균 61%에 비해 줄어든 수치다.

    전 세계 승용차 신차 판매에서 전기차가 차지하는 비중은 2023년 17.8%에서 2027년 33%로 급증할 것으로 예상된다. 그 때까지는 중국(60%)과 유럽(41%)만이 글로벌 평균을 상회할 것이라고 한다. 연간 리튬 이온 배터리 수요도 빠르게 증가해 2035년에는 연간 5.9테라와트시에 도달할 것으로 예상된다.

    블룸버그NEF는 내연기관차의 판매가 정점을 찍었다고 주장했다. 내연기관차 판매량은 2017년에 정점을 찍었으며 2027년에는 보고서의 전망치보다 29% 낮을 것이라는 설명이다.

    특히 하이브리드는 연비 규제가 엄격해지는 시장에서 단기적으로 의미 있는 역할을 할 수 있다. 보고서에 따르면 2030년까지 하이브리드 채택률은 시장에 따라 판매량의 5%에서 45%에 달할 것으로 전망된다.

    아울러 전기 대형 트럭은 2030년까지 대부분의 사용 사례에서 경제성을 확보할 수 있게 될 것으로 보인다. 처음에는 주로 도심 운행에 사용되지만, 장거리 노선에서도 경제성이 개선돼 2030년에는 디젤 파워트레인의 경제성에 근접할 것이라는 분석이다.

    블룸버그NEF는 전기차 전력 수요를 충족하기 위해 충전 산업이 향후 10년 동안 빠르게 성숙해야 한다고 경고했다. 2050년까지 충전 인프라, 설치 및 유지 보수에 1조6000억 달러에서 2조5000억 달러의 누적 투자가 필요할 것이라는 설명이다. 아울러 2050년까지 전 세계 탄소 배출 제로에 도달하려면 훨씬 더 빠른 전환이 필요하다고 지적했다.
  `;

  return (
    <>
      <div className='newInfoTitleContainer' style={{ textAlign: 'center' }}>
        <h2
          style={{
            margin: '200px 0 0',
            color: 'black',
            fontWeight: '700',
            fontSize: '50px',
          }}
        >
          새소식
        </h2>
      </div>
      <div className='newInfoWriteBtnBox'>
        <Button
          className='newInfoWriteBtn'
          onClick={() => navigate('/newInfoWrite')}
        >
          작성하기
        </Button>
      </div>

      <div
        className='newInfoContainer'
        style={{
          // border: '1px solid black',
          width: '60%',
          margin: '100px auto',
        }}
      >
        <NewInfoBox title={infoTitle} content={infoContent} />
        <NewInfoBox title={infoTitle} content={infoContent} />
        <NewInfoBox title={infoTitle} content={infoContent} />
        <NewInfoBox title={infoTitle} content={infoContent} />
        <NewInfoBox title={infoTitle} content={infoContent} />
        <NewInfoBox title={infoTitle} content={infoContent} />
      </div>
      <div
        className='paging-container'
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '200px',
        }}
      >
        <Paging />
      </div>
    </>
  );
}

export default NewInfo;
