import { useEffect, useState } from "react";
import Copy from "../Icons/Copy";
import Logo from "../Icons/Logo";
import { motion } from "framer-motion";
import DeleteIcon from "../Icons/DeleteIcon";
import axios from "axios";

type Brainee = {
  contentKey: string;
  link: string;
  title: string;
  type: string; // No strict types, accepts any string
};

const Brain = ({ link, title, type, contentKey}: Brainee) => {
  const [copy, setCopy] = useState(false);
  function getYoutubeEmbedLink(url: string): string {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  }
  useEffect(() => {
    if (copy) {
      const timer = setTimeout(() => setCopy(false), 500);
      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [copy]);

  return (
    <div
      className="lex flex-col bg-gray-100 shadow-md  
  w-full h-auto min-h-[200px] max-h-[300px]  
  p-2 pt-1 transition-transform duration-400 ease-in-out hover:scale-105 ml-[-0.5rem ]"
    >
      {!copy && (
        <div>
          <div className="flex justify-end px-1 pb-0 mb-0">
            <button
              className="hover:scale-125 pr-1"
              onClick={() => {
                setCopy(true);
                navigator.clipboard.writeText(link);
              }}
            >
              <Copy />
            </button>
            <button
              className="px-1 pr-2 hover:scale-105"
              onClick={async () => {
                try {
                  console.log(contentKey);
                  await axios.delete(
                    "http://localhost:2000/secondBrain/content/",
                    {
                      data: {
                        contentId: contentKey, // Use the correct variable
                      },
                      headers: {
                        Authorization: localStorage.getItem("token"), // Correct spelling
                      },
                    }
                  );
                  console.log("Deleted successfully");
                } catch (error) {
                  console.error("Error deleting content:", error);
                }
              }}
            >
              <DeleteIcon />
            </button>

            <div className="flex font-bold text-md text-right text-black cursor-pointer max-w-fit">
              <div
                className="transition-transform ease-in-out duration-300  rounded-md cursor-pointer font-mono bg-black text-white text-xs w-fit px-2 hover:scale-105"
                onClick={() => {
                  window.open(link);
                }}
              >
                go
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center ">
            <div
              className="text-md text-neutral-800 font-sans pt-0 pb-0 max-w-fit"
              onClick={() => {}}
            >
              {title}
            </div>

            {/* <div className="text-pink-800 text-xs max-w-full break-words whitespace-normal overflow-hidden">
            Link: {link}
          </div> */}

            {/* <div className="transition-transform ease-in-out duration-300  rounded-md cursor-pointer font-mono text-black text-xs bg-fr w-fit px-2 hover:scale-105">
              {type}
            </div> */}
          </div>
          {type === "video" && (
            <iframe
              className="w-full p-2"
              src={getYoutubeEmbedLink(link)}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          {type === "article" && (
            <iframe className="w-full" src={link}></iframe>
          )}
        </div>
      )}
      {copy && (
        <div className=" mx-auto mt-10 text-black px-8 pb-2 pt-4 rounded-lg justify-center items-center">
          <div className="flex gap-1">
            <Logo />
            copied to clipboard.
          </div>

          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5, ease: "linear" }}
            className="h-1 bg-gray-600 rounded-full w-full mt-2"
          />
        </div>
      )}
    </div>
  );
};

export default Brain;
