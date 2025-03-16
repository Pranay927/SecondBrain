import axios from "axios";
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import Brain from "../components/Brain";
import NewContent from "../components/NewContent";
import Logout from "../Icons/Logout";
import FileViewIcon from "../Icons/FileViewIcon";
import GridViewIcon from "../Icons/GridViewIcon";

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

  const [view, setView] = useState<string>("grid");
  const navigate = useNavigate();

  useEffect(() => {
    const getContent = async () => {
      const response = await axios.get(
        "http://localhost:2000/secondBrain/content",
        {
          headers: { authorization: `${localStorage.getItem("token")}` },
        }
      );
      setBrains(response.data["Your Brains"]);
    };
    getContent();
  }, []);

  useEffect(() => {
    const shareBrain = async () => {
      try {
        const resp = await axios.post(
          "http://localhost:2000/secondBrain/brain/share",
          { share: true },
          {
            headers: { authorization: `${localStorage.getItem("token")}` },
          }
        );
        setShareId(resp.data["Share your secondBrain to your friends"]);
      } catch (e) {
        console.log("Error from share : ", e);
      }
    };
    shareBrain();
  }, []);

  return (
    <>
      {!posting && !sharing && (
        <div className="flex min-h-screen bg-gray-100">
          <SideBar />

          <div className="ml-[20%] flex flex-col w-[80%] p-6">
            <div className="flex justify-between items-center mb-6">
              <input
                className="bg-gray-800 text-white rounded-full px-4 py-2 w-[60%] border border-gray-600 outline-none focus:ring-2 focus:ring-gray-400"
                type="text"
                placeholder="🔍 Search your brains..."
              />
              <div className="flex space-x-4">
                <div className="cursor-pointer">
                  <FileViewIcon className="hover:scale-110 transition-transform " />
                </div>
                <div className="hover:scale-110 transition-transform cursor-pointer">
                  <GridViewIcon  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-white p-6 shadow-lg rounded-lg">
              {brains.map((b) => (
                <Brain
                  key={b._id}
                  contentKey={b._id}
                  link={b.link}
                  title={b.title}
                  type={b.type}
                  view = {view} 
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 p-4 bg-gray-200 shadow-md rounded-lg">
            <button
              className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
              onClick={() => setShowMenu(!showMenu)}
            >
              •••
            </button>
            <div className="flex flex-col items-center gap-2">
              <div
                className="p-2 rounded-full hover:bg-gray-300 cursor-pointer transition-colors"
                onClick={() => {
                  localStorage.setItem("token", "");
                  navigate("/");
                }}
              >
                <Logout />
              </div>
              <div className="text-xl cursor-pointer">🌙</div>
            </div>
            {showMenu && (
              <div className="absolute top-14 right-4 w-40 bg-gray-900 text-white rounded-lg shadow-lg p-3 flex flex-col gap-2">
                <div
                  className="cursor-pointer px-3 py-2 hover:bg-gray-800 rounded-md"
                  onClick={() => setPosting(true)}
                >
                  Add Content
                </div>
                <div
                  className="cursor-pointer px-3 py-2 hover:bg-gray-800 rounded-md"
                  onClick={() => setSharing(true)}
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
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <p className="font-mono text-lg">Share your brainId: {shareId}</p>
            <button
              className="mt-4 px-4 py-2 bg-gray-700 text-white font-semibold rounded hover:bg-gray-600 transition"
              onClick={() => setSharing(false)}
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </>
  );
}
