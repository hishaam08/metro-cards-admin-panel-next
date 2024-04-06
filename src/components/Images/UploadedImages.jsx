import Image from "next/image";
import { useState } from "react";
import axios from "axios";

function UploadedImages({ images, setImages }) {
  const [loading, setLoading] = useState(false);

  function handleDelete(urlToBeRemoved) {
    setLoading(true);
    axios
      .post("http://localhost:3000/api/deleteImage", {
        public_id: urlToBeRemoved.public_id,
      })
      .then((res) => {
        if (res.data.result === "ok") {
          const newUrl = images.filter((urlI) => {
            if (urlI !== urlToBeRemoved) return true;
          });
          setImages((url) => {
            return newUrl;
          });
          setLoading(false);
        }
      });
  }
  return (
    <div className="flex gap-4 rounded-lg">
      {images.length > 0 &&
        images.map((url, index) => {
          return (
            <div key={index}>
              <Image
                height={100}
                width={100}
                //@ts-ignore
                src={url.url}
                alt="image"
                className="h-16 w-16 object-cover"
              />
              <div
                className={`bg-red-400 min-w-16 text-center ${loading ? "bg-graydark" : "bg-red"}`}
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(url);
                  }}
                  disabled={loading}
                  className="inline-block text-white"
                >
                  {loading ? "Deleting" : "Delete"}
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default UploadedImages;
