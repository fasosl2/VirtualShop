import { useRef, useEffect, Children } from 'react';
import { register } from 'swiper/element/bundle';
import { useWindowSize } from '../../services/utilService';

register();

export const SwiperContainer = ({slides, ...props}) => {
  const swiperElRef = useRef(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    // listen for Swiper events using addEventListener
    swiperElRef.current.addEventListener('progress', (e) => {
      const [swiper, progress] = e.detail;
      console.log(progress);
    });

    swiperElRef.current.addEventListener('slidechange', (e) => {
      console.log('slide changed');
    });
  }, []);

  return (
    <swiper-container
      ref={swiperElRef}
      slides-per-view={windowSize?.width > 768 ? 4 : 2}
      navigation="true"
      pagination="true"
    >
        {Children.map(props.children, slide => <swiper-slide>{slide}</swiper-slide>)}
    
    </swiper-container>
  );
};