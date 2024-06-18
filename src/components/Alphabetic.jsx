import React, { useRef, useState } from "react";
import styles from "../assets/css/alphabet.module.css";
import { Modal, Button } from "antd";
import { useTheme } from "../ThemeContext";
import { Link } from "react-router-dom";
import { data } from "../data/data";
import { useSound } from "../SoundCotext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { data2 } from "../data/consonant";

const Alphabetic = () => {
  const { season } = useTheme();
  const { isSoundEnabled } = useSound();
  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const audioRef = useRef(new Audio(""));

  const showModal = (index, source) => {
    setModalData({
      ...source[index],
      index: index,
      source: source,
    });
    audioRef.current.src = source[index]?.sound;
    if (isSoundEnabled) {
      audioRef.current.play().catch((e) => {
        console.error("Sound play failed: ", e);
      });
    }
    setVisible(true);
  };

  const nextModal = () => {
    const newIndex = modalData.index + 1;
    const newModalData = {
      ...modalData.source[newIndex],
      index: newIndex,
      source: modalData.source,
    };
    setModalData(newModalData);
    audioRef.current.src = modalData.source[newIndex]?.sound;
    if (isSoundEnabled) {
      audioRef.current.play().catch((e) => {
        console.error("Sound play failed: ", e);
      });
    }
  };

  const prevModal = () => {
    const newIndex = modalData.index - 1;
    const newModalData = {
      ...modalData.source[newIndex],
      index: newIndex,
      source: modalData.source,
    };
    setModalData(newModalData);
    audioRef.current.src = modalData.source[newIndex]?.sound;
    if (isSoundEnabled) {
      audioRef.current.play().catch((e) => {
        console.error("Sound play failed: ", e);
      });
    }
  };

  const replaySound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((e) => {
        console.error("Sound play failed: ", e);
      });
    }
  };

  const closeModal = () => {
    setVisible(false);
  };
  return (
    <>
      <audio ref={audioRef} id="audio" preload="auto"></audio>
      <div className={`${season}-gradient md mx-auto min-h-lvh`}>
        <Link to="/learn">
          <button
            type="button"
            class="w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto   hover:bg-gray-100  "
          >
            <svg
              class="w-5 h-5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            <span>Go back</span>
          </button>
        </Link>
        <div className="flex flex-row gap-2 justify-center w-full">
          <div className="basis-5/12">
            <h1 className={`mb-5 ${styles["text-header"]} `}>Vowel - 모음</h1>
            <div className="flex flex-row flex-wrap gap-y-10 gap-x-2 ">
              {data.map((item, index, source) => {
                return (
                  <Button
                    onClick={() => showModal(index, source)}
                    className={`w-24 h-10 text-lg`}
                    key={index}
                  >
                    {item.han}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="basis-6/12">
            <h1 className={`mb-5 ${styles["text-header"]} `}>
              Consonant - 자음
            </h1>

            <div className="flex flex-row flex-wrap gap-y-10 gap-x-2 ">
              {data2.map((item, index, source) => {
                return (
                  <Button
                    key={index}
                    onClick={() => showModal(index, source)}
                    className={`w-24 h-10 text-lg`}
                  >
                    {item.han}
                  </Button>
                );
              })}
            </div>
            <h1 className={`mb-5 mt-5 ${styles["text-header"]} `}>
              Phụ Âm Đặc Biệt
            </h1>

            <div className="flex flex-row flex-wrap gap-y-10 gap-x-2 ">
              <Button className={`w-24 h-10 text-lg`}>ㄲ</Button>
              <Button className={`w-24 h-10 text-lg`}>ㄸ</Button>
              <Button className={`w-24 h-10 text-lg`}>ㅃ</Button>
              <Button className={`w-24 h-10 text-lg`}>ㅆ</Button>
              <Button className={`w-24 h-10 text-lg`}>ㅉ</Button>
            </div>
            <h1 className={`mb-5 mt-5 ${styles["text-header"]} `}>
              Phụ Âm Kết Hợp
            </h1>
            <div className="flex flex-row flex-wrap gap-y-10 gap-x-2 ">
              <Button className={`w-24 h-10 text-lg`}>ㄳ</Button>
              <Button className={`w-24 h-10 text-lg`}>ㄵ</Button>
              <Button className={`w-24 h-10 text-lg`}>ㄶ</Button>
              <Button className={`w-24 h-10 text-lg`}>ㄺ</Button>
              <Button className={`w-24 h-10 text-lg`}>ㄻ</Button>
              <Button className={`w-24 h-10 text-lg`}>ㄼ</Button>
              <Button className={`w-24 h-10 text-lg`}>ㄽ</Button>
              <Button className={`w-24 h-10 text-lg`}>ㄾ</Button>
              <Button className={`w-24 h-10 text-lg`}>ㄿ</Button>
              <Button className={`w-24 h-10 text-lg`}>ㅀ</Button>
              <Button className={`w-24 h-10 text-lg`}>ㅄ</Button>
            </div>
          </div>
        </div>
        <Modal open={visible} footer onClose={closeModal} onCancel={closeModal}>
          <div className="grid grid-flow-col grid-cols-14">
            {modalData?.index !== 0 ? (
              <button
                type="button"
                className="fa-solid fa-chevron-left my-auto cursor-pointer text-start max-w-2 p-2"
                onClick={() => prevModal()}
              ></button>
            ) : (
              <button
                type="button"
                className="fa-solid fa-chevron-left my-auto cursor-pointer text-start max-w-2 opacity-50 p-2"
                disabled={true}
              ></button>
            )}

            <div className="grid grid-flow-col col-span-12 gap-1">
              <div>
                <h1
                  className="text-center text-9xl bg-black text-white p-4 rounded-lg opacity-80"
                  style={{ width: "180px" }}
                >
                  {modalData.han}
                </h1>
                <pre
                  className="text-center pt-4 font-bold text-lg"
                  style={{ width: "180px" }}
                >
                  {modalData.viet}
                </pre>
                <button onClick={replaySound}>
                  {" "}
                  <FontAwesomeIcon icon={faVolumeHigh} />
                </button>
              </div>
              <div>
                <img
                  src={modalData.image}
                  alt=""
                  style={{ width: "auto", height: "160px", maxWidth: "200px" }}
                  className="mx-auto"
                />
              </div>
            </div>
            {modalData.index !== modalData?.source?.length - 1 ? (
              <button
                className="fa-solid fa-chevron-right my-auto cursor-pointer text-end p-2"
                onClick={() => nextModal()}
              ></button>
            ) : (
              <button className="fa-solid fa-chevron-right my-auto cursor-pointer text-end opacity-50 p-2"></button>
            )}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Alphabetic;
