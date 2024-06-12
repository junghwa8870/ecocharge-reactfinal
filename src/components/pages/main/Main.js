import React from 'react';
import SimpleSlider from './simpleslider/SimpleSlider';
import MainInfo from './MainInfo/MainInfo';

const Main = () => {
  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      <SimpleSlider /> {/* SimpleSlider 컴포넌트를 렌더링 */}
      <MainInfo />
    </div>
  );
};

export default Main;
