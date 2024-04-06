"use client";

import Link from "next/link";
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ReligionType from "@/components/SelectGroup/ReligionType";
import OccassionType from "@/components/SelectGroup/OccassionType";
import DesignType from "@/components/SelectGroup/DesignType";
import CardType from "@/components/SelectGroup/CardType";
import UploadImages from "@/components/Images/UploadImages";
import UploadedImages from "@/components/Images//UploadedImages";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const FormElements = ({ card }) => {
  const [title, setTitle] = useState(card.name);
  const [description, setDescription] = useState(card.description);
  const [price, setPrice] = useState(card.price);
  const [religionType, setReligionType] = useState(card.religionType);
  const [cardType, setCardType] = useState(card.cardType);
  const [occassionType, setOccassionType] = useState(card.occasion);
  const [designType, setDesignType] = useState(card.type);
  const [images, setImages] = useState(card.images);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  let error = false;
  let errMsg = {};

  function handleSubmit() {
    if (title === "") {
      error = true;
    }
    if (description === "") error = true;
    if (price === "") error = true;
    if (religionType === "") error = true;
    if (cardType === "") error = true;
    if (occassionType === "") error = true;
    if (designType === "") error = true;
    if (images.length === 0) error = true;

    if (!error) {
      // const image = images.map((imageData) => {
      //   return imageData.url;
      // });

      const data = {};
      data.id = card._id;
      data.name = title;
      data.description = description;
      data.price = price;
      data.cardType = cardType;
      data.religionType = religionType;
      data.occasion = occassionType;
      data.type = designType;
      data.images = card.images;

      console.log("data", data);

      axios.post("http://localhost:3000/api/editData", { data }).then((res) => {
        if (res.data === "ok") {
          toast.success("Card Edited Successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          router.push("/");
          router.refresh();

          // setDescription("");
          // setTitle("");
          // setPrice("");
          // setCardType("");
          // setReligionType("");
          // setOccassionType("");
          // setDesignType("");
          // setImages([]);
        }
      });
    } else
      toast.error("Check all the fields", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

    // setDescription("");
    // setTitle("");
    // setPrice("");
    // setCardType("");
    // setReligionType("");
    // setOccassionType("");
    // setDesignType("");
    // setImages([]);
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Breadcrumb pageName="Edit Card" />
      <div className="flex justify-center">
        <div className="w-10/12 gap-16">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Enter the card details
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Card Title
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Title"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Card Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    placeholder="Description"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Card Price in Rs.
                  </label>
                  <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    placeholder="Price"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <ReligionType state={religionType} setState={setReligionType} />
                <CardType state={cardType} setState={setCardType} />
                <OccassionType
                  state={occassionType}
                  setState={setOccassionType}
                />
                <DesignType state={designType} setState={setDesignType} />

                <UploadImages setUrl={setImages} />

                {/* <UploadedImages images={card.images} setImages={setImages} /> */}

                <div className="flex w-full justify-center">
                  <div>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className={`inline-flex items-center justify-center gap-2.5 rounded-full border ${loading ? "border-graydark text-graydark" : " border-primary  text-primary"} px-10 py-4 text-center font-medium hover:bg-opacity-90 lg:px-8 xl:px-10`}
                    >
                      {loading ? (
                        <div className="grid place-content-center">
                          <div className="text-gray-500 flex items-center gap-2">
                            <span className="block h-6 w-6 animate-spin rounded-full border-4 border-t-blue-300"></span>
                          </div>
                        </div>
                      ) : (
                        <span>
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_182_46495)">
                              <path
                                d="M18.875 11.4375C18.3125 10.8438 17.5625 10.5312 16.75 10.5312C16.125 10.5312 15.5625 10.7188 15.0625 11.0938C15 11.125 14.9688 11.1562 14.9062 11.2188C14.8438 11.1875 14.8125 11.125 14.75 11.0938C14.25 10.7188 13.6875 10.5312 13.0625 10.5312C12.9062 10.5312 12.7812 10.5312 12.6562 10.5625C11.7188 9.5 10.5625 8.75 9.3125 8.40625C10.625 7.75 11.5312 6.40625 11.5312 4.875C11.5312 2.6875 9.75 0.9375 7.59375 0.9375C5.40625 0.9375 3.65625 2.71875 3.65625 4.875C3.65625 6.4375 4.5625 7.78125 5.875 8.40625C4.5625 8.78125 3.40625 9.53125 2.4375 10.6562C1.125 12.2188 0.375 14.4062 0.3125 16.7812C0.3125 17.0312 0.4375 17.25 0.65625 17.3438C1.5 17.75 4.4375 19.0938 7.59375 19.0938C9.28125 19.0938 10.8438 18.8125 10.9062 18.8125C11.25 18.75 11.4688 18.4375 11.4062 18.0938C11.3438 17.75 11.0312 17.5312 10.6875 17.5938C10.6875 17.5938 9.15625 17.875 7.59375 17.875C5.0625 17.8438 2.65625 16.875 1.5625 16.375C1.65625 14.4375 2.3125 12.7187 3.375 11.4375C4.46875 10.125 5.96875 9.40625 7.59375 9.40625C9.03125 9.40625 10.375 10 11.4375 11.0312C11.2812 11.1562 11.125 11.2812 11 11.4062C10.4688 11.9688 10.1875 12.75 10.1875 13.5938C10.1875 14.4375 10.5 15.2188 11.1562 16C11.6875 16.6562 12.4375 17.2812 13.2812 18L13.3125 18.0312C13.5937 18.25 13.9062 18.5312 14.2188 18.8125C14.4062 19 14.6875 19.0938 14.9375 19.0938C15.1875 19.0938 15.4687 19 15.6562 18.8125C16 18.5312 16.3125 18.25 16.5938 18C17.4375 17.2812 18.1875 16.6562 18.7188 16C19.375 15.2188 19.6875 14.4375 19.6875 13.5938C19.6875 12.7812 19.4062 12.0312 18.875 11.4375ZM4.875 4.875C4.875 3.375 6.09375 2.1875 7.5625 2.1875C9.0625 2.1875 10.25 3.40625 10.25 4.875C10.25 6.375 9.03125 7.5625 7.5625 7.5625C6.09375 7.5625 4.875 6.34375 4.875 4.875ZM17.75 15.2188C17.2812 15.7812 16.5938 16.375 15.7812 17.0625C15.5312 17.2812 15.2188 17.5312 14.9062 17.7812C14.625 17.5312 14.3438 17.2812 14.0938 17.0938L14.0625 17.0625C13.25 16.375 12.5625 15.7812 12.0938 15.2188C11.625 14.6562 11.4062 14.1562 11.4062 13.625C11.4062 13.0937 11.5938 12.625 11.9062 12.2812C12.2188 11.9375 12.6563 11.75 13.0938 11.75C13.4375 11.75 13.75 11.8438 14 12.0625C14.125 12.1562 14.2188 12.25 14.3125 12.375C14.5938 12.7188 15.1875 12.7188 15.5 12.375C15.5938 12.25 15.7187 12.1562 15.8125 12.0625C16.0937 11.8438 16.4062 11.75 16.7188 11.75C17.1875 11.75 17.5938 11.9375 17.9062 12.2812C18.2188 12.625 18.4062 13.0937 18.4062 13.625C18.4375 14.1875 18.2188 14.6562 17.75 15.2188Z"
                                fill=""
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_182_46495">
                                <rect width="20" height="20" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                      )}
                      {loading ? "Uploading..." : "Edit Card"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormElements;
