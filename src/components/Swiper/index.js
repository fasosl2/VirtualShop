import { useRef, useEffect } from "react";
import { register } from "swiper/element/bundle";
import { useWindowSize } from "../../services/utilService";

register();

export const SwiperContainer = ({ slides, ...props }) => {
  const swiperElRef = useRef(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    // listen for Swiper events using addEventListener
    swiperElRef.current.addEventListener("progress", (e) => {
      const [/* swiper, */ progress] = e.detail;
      console.log(progress);
    });

    swiperElRef.current.addEventListener("slidechange", (e) => {
      console.log("slide changed");
    });
  }, []);

  return (
      <swiper-container style={{ width: "100%" }}
        ref={swiperElRef}
        slides-per-view={windowSize?.width > 768 ? 4 : 2}
        navigation="true"
        pagination="true"
      >
        {props.children}
      </swiper-container>
  );
};

export const SwiperSlide = ({ children }) => {
  return <swiper-slide>{children}</swiper-slide>;
};
