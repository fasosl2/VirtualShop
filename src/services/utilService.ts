import { useState, useEffect } from 'react';
import FileResizer from "react-image-file-resizer";

interface WindowSize {
  width: number;
  height: number;
}

const utilService = {
  toBase64: (file: Blob): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();  
      fr.onload = () => {
        resolve(fr.result);
      };
      fr.onerror = reject;
      fr.readAsDataURL(file);
    });
  },
  imageToCompressedBase64: (file: File): Promise<string> => new Promise(resolve => {
      FileResizer.imageFileResizer(file, 500, 500, 'JPEG', 100, 0,
      uri => {
        resolve(uri as string);
      }, 'base64' );
  }),
  base64ToFile: async (dataUrl: string, fileName: string): Promise<File> => {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return new File([blob], fileName, { type: 'image/png' });
  },
  sleep: (time: number): Promise<void> =>
    new Promise((resolve) => {
      setTimeout(resolve, time);
    }),
  formatCurrency: (value: any): string => {
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


export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
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
