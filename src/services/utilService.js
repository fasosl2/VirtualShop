import { useState, useEffect } from 'react';
import FileResizer from "react-image-file-resizer";

const utilService = {
  toBase64: (file) => {
    return new Promise((resolve, reject) => {
      var fr = new FileReader();  
      fr.onload = () => {
        resolve(fr.result)
      };
      fr.onerror = reject;
      fr.readAsDataURL(file);
    });
  },
  imageToCompressedBase64: (file) => new Promise(resolve => {
      FileResizer.imageFileResizer(file, 500, 500, 'JPEG', 100, 0,
      uri => {
        resolve(uri);
      }, 'base64' );
  }),
  base64ToFile: async (dataUrl, fileName) => {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return new File([blob], fileName, { type: 'image/png' });
  },
  sleep: (time) =>
    new Promise((resolve) => {
      setTimeout(resolve, time);
    }),
  formatCurrency: (value) => {
    if (typeof value !== 'number') {
      return 'R$ 0,00';
    }
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  },
};

export default utilService;


export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
});

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return windowSize;
}