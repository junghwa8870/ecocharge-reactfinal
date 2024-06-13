import React from 'react';
import SimpleSlider from './simpleslider/SimpleSlider';
import MainInfo from './MainInfo/MainInfo';
import MainQnA from './MainQnA/MainQnA';

const Main = () => {
  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      <SimpleSlider /> {/* SimpleSlider 컴포넌트를 렌더링 */}
      <MainInfo />
      <MainQnA />
    </div>
  );
};

export default Main;
