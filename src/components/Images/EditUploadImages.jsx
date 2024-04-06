import { useState } from "react";
import axios from "axios";

function UploadImages({ setUrl }) {
  const [loading, setLoading] = useState(false);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  function uploadSingleImage(base64) {
    setLoading(true);
    axios
      .post("http://localhost:3000/api/uploadSingleImage", { image: base64 })
      .then((res) => {
        console.log("Response", res);
        setUrl((url) => {
          return [...url, res.data.url];
        });
      })
      .then(() => setLoading(false))
      .catch(console.log);
  }

  function uploadMultipleImages(images) {
    setLoading(true);
    axios
      .post("http://localhost:3000/api/uploadMultipleImages", { images })
      .then((res) => {
        setUrl((url) => {
          console.log("dataurl", res.data);
          const data = res.data.map((data) => {
            return data.url;
          });
          return [...url, ...data];
        });
      })
      .then(() => setLoading(false))
      .catch(console.log);
  }

  const uploadImage = async (event) => {
    const files = event.target.files;

    if (files.length === 1) {
      const base64 = await convertBase64(files[0]);
      uploadSingleImage(base64);
      return;
    }

    const base64s = [];
    for (var i = 0; i < files.length; i++) {
      var base = await convertBase64(files[i]);
      base64s.push(base);
    }
    uploadMultipleImages(base64s);
  };

  return (
    <div>
      {loading ? (
        <div className="grid place-content-center">
          <div className="text-gray-500 flex items-center gap-2">
            <span className="block h-6 w-6 animate-spin rounded-full border-4 border-t-blue-300"></span>
            Uploading Images...
          </div>
        </div>
      ) : (
        <>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Attach Images
          </label>
          <input
            onChange={uploadImage}
            multiple
            type="file"
            className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
          />
        </>
      )}
    </div>
  );
}

export default UploadImages;
