import { useRef, useEffect } from "react";
import type { ReactNode } from "react"; // Agora vamos usar!
import { register } from "swiper/element/bundle";
import { useWindowSize } from "../../services/utilService";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "swiper-container": any;
      "swiper-slide": any;
    }
  }
}

register();

// 1. Criamos a interface para o Container
interface SwiperContainerProps {
  slides?: any[];
  slidesPerView?: [number, number];
  children: ReactNode; // Uso do ReactNode aqui
}

export const SwiperContainer = ({ slides, slidesPerView = [5, 2], ...props }: SwiperContainerProps) => {
  const swiperElRef = useRef<any>(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    const swiperRef = swiperElRef.current;
    if (!swiperRef) return;

    const handleProgress = (e: any) => {
      const [progress] = e.detail;
      console.log(progress);
    };

    const handleSlideChange = () => console.log("slide changed");

    swiperRef.addEventListener("progress", handleProgress);
    swiperRef.addEventListener("slidechange", handleSlideChange);

    return () => {
      swiperRef.removeEventListener("progress", handleProgress);
      swiperRef.removeEventListener("slidechange", handleSlideChange);
    };
  }, []);

  return (
    <swiper-container
      style={{ width: "100%" }}
      ref={swiperElRef}
      slides-per-view={windowSize?.width > 768 ? slidesPerView[0] : slidesPerView[1]}
      navigation="true"
      pagination="true"
    >
      {props.children}
    </swiper-container>
  );
};

// 2. Tipamos as props do Slide diretamente no argumento
export const SwiperSlide = ({ children }: { children: ReactNode }) => {
  return <swiper-slide style={{ height: "initial" }}>{children}</swiper-slide>;
};