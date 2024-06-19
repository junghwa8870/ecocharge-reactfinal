import React, { useState, useEffect } from 'react';
import SimpleSlider from './simpleslider/SimpleSlider';
import MainInfo from './MainInfo/MainInfo';
import MainQnA from './MainQnA/MainQnA';

// 메인페이지 부드럽게 뜨게
const Main = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const loadImage = () => {
      const imgElements = document.querySelectorAll('.mainCarImg');
      let loadedCount = 0;
      imgElements.forEach((img) => {
        if (img.complete) {
          loadedCount++;
        } else {
          img.onload = () => {
            loadedCount++;
            if (loadedCount === imgElements.length) {
              setImagesLoaded(true);
            }
          };
        }
      });
      if (loadedCount === imgElements.length) {
        setImagesLoaded(true);
      }
    };

    loadImage();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        opacity: imagesLoaded ? 1 : 0,
        transition: 'opacity 2s ease-in-out',
      }}
    >
      <SimpleSlider />
      <MainInfo />
      <MainQnA />
    </div>
  );
};

export default Main;
