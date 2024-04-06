import cloudinary from "cloudinary";

const cloud_name = "dxcleqyco";
const api_key = "648961312186687";
const api_secret = "SiT-f0VBOq5XzwYFBe1-gv7fEE4";

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

const uploadImage = (image) => {
  //imgage = > base64
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        // console.log("Resul1", result);
        return resolve({ url: result.secure_url, public_id: result.public_id });
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};

export const uploadSingleImage = (image) => {
  //imgage = > base64
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        // console.log("Result", result);
        return resolve({ url: result.secure_url, public_id: result.public_id });
      }
      // console.log(error.message);
      return reject({ message: error.message });
    });
  });
};

export const uploadMultipleImages = (images) => {
  return new Promise((resolve, reject) => {
    const uploads = images.map((base) => uploadImage(base));
    Promise.all(uploads)
      .then((values) => resolve(values))
      .catch((err) => reject(err));
  });
};

export const deleteImage = (public_id) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(public_id).then((result) => {
      if (result) resolve(result);
      else reject("Failed");
    });
  });
};
