import axios from "axios";
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";

import Brain from "../components/Brain";
import NewContent from "../components/NewContent";

import Logout from "../Icons/Logout";


// to store a new brain
type BrainType = {
  _id: string;
  link: string;
  title: string;
  type: string;
};

export default function Dashboard() {
  const [brains, setBrains] = useState<BrainType[]>([]);
  const [posting, setPosting] = useState(false);
  const [sharing, setSharing] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const [shareId, setShareId] = useState(null);

  const navigate  = useNavigate();
  useEffect(() => {
    const getContent = async () => {
      const response = await axios.get(
        "http://localhost:2000/secondBrain/content",
        {
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      setBrains(response.data["Your Brains"]);
    };
    getContent();
  }, []);

  useEffect(() => {
    try {
      const f = async () => {
        const resp = await axios.post(
          "http://localhost:2000/secondBrain/brain/share",
          { share: true },
          {
            headers: {
              authorization: `${localStorage.getItem("token")}`,
            },
          }
        );
        setShareId(resp.data["Share your secondBrain to your friends"]);
      };
      f();
    } catch (e) {
      console.log("Error from share : ");
    }
  }, []);

  return (
    <>
      {!posting && !sharing && (
        <div className=" flex ">
          {/* SIDEBAR */}
          <SideBar />

          {/* {Content _space} */}
          <div
            onClick={() => {
              setShowMenu(false);
            }}
            className="w-[75%]  flex flex-wrap bg-gradient-to-br from-gray-400 to-neutral-400-300  gap-6 pt-3 pl-10 text-neutral-400 font font-semibold h-screen overflow-auto "
          >
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {brains.map((b) => (
                <Brain
                  key={b._id}
                  contentKey={b._id}
                  link={b.link}
                  title={b.title}
                  type={b.type}
                />
              ))}
            </div>
          </div>

          {/* Three-dot button to toggle menu */}
          <div className=" flex bg-neutral-100 flex-col justify-between items-center pt-4 gap-2">
            <button
              className="px-3 py-1 text-center rounded-full font-extrabold text-xl text-gray-900 hover:text-black"
              onClick={() => setShowMenu(!showMenu)}
            >
              •••
            </button>
            {/* Other UI Elements */}
            <div
              onClick={() => {
                setShowMenu(false);
              }}
              className="flex flex-col justify-center items-center"
            >
              <div className="font-semibold cursor-pointer rounded-full hover:bg-slate-200 p-2"
                  onClick={
                    ()=>{
                      localStorage.setItem("token","");
                      navigate("/");
                    }
                  }>
                <Logout />
              </div>
              <div className="text-center pb-2 text-xl cursor-pointer">🌙</div>
            </div>

            {/* Dropdown menu */}
            {showMenu && (
              <div className="absolute top-10 right-0 w-40 bg-gray-950 text-white rounded-lg shadow-lg p-2 flex flex-col gap-2 justify-between">
                <div
                  className="cursor-pointer px-3 py-2 hover:bg-gray-800 rounded-md"
                  onClick={() => {
                    setPosting(true);
                    setShowMenu(false);
                  }}
                >
                  Add Content
                </div>
                <div
                  className="cursor-pointer px-3 py-2 hover:bg-gray-800 rounded-md"
                  onClick={() => {
                    setSharing(true);
                    setShowMenu(false);
                  }}
                >
                  Share
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <NewContent posting={posting} setPosting={setPosting} />

      {sharing && (
        <div className="flex justify-center items-center h-screen bg-neutral-100  ">
          <div className="flex flex-col gap-2 shadow-2xl rounded-lg bg-neutral-100  pt-0 p-10 ">
            <div className="text-center font-mono p-2 text-xl">
              Share your brainId :{shareId}
            </div>

            <div className="flex justify-center items-center">
              <button
                className="px-2 text-neutral-200 bg-gray-700 font-mono font-semibold hover:scale-110 hover:outline-zinc-50"
                onClick={() => setSharing(false)}
              >
                copy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
