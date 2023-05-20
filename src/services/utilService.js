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
})
};

export default utilService;
