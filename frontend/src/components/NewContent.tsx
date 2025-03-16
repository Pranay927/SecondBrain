import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";

interface PostingProps {
  posting: boolean;
  setPosting: (value: boolean) => void;
}

function NewContent({ posting, setPosting }: PostingProps) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("");

  const postContent = async () => {
    if (!link || !title || !type) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/secondBrain/content`,
        { link, title, type },
        {
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Response:", response.data);

      // Reset state on success
      setLink("");
      setTitle("");
      setType("");
      setError("");
      setPosting(false);
    } catch (error) {
      setError("Failed to post content. Try again.");
      console.error("Error posting content:", error);
    }
  };

  return (
    <div>
      {posting && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex justify-center items-center bg-black/50 p-4"
        >
          <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-lg p-6 w-full max-w-4xl">
            {/* ✅ Benefits Section */}
            <div className="hidden md:flex flex-col justify-center gap-4 bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-lg w-1/2">
              <h2 className="text-2xl font-bold">Why Use Second Brain? 🧠</h2>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📌</span>
                <p className="text-sm">
                  Save important links, tweets, and thoughts in one place.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚡</span>
                <p className="text-sm">Quickly recall anything you've saved.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🚀</span>
                <p className="text-sm">Supercharge your productivity daily.</p>
              </div>
            </div>

            {/* 📝 Input Form */}
            <div className="flex flex-col gap-3 w-full md:w-1/2 p-6">
              <h2 className="text-xl font-semibold text-gray-800 text-center">
                Build Your Knowledge Vault 🚀
              </h2>

              {/* Link Input */}
              <div>
                <label className="text-sm font-medium text-gray-700">Link</label>
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Title Input */}
              <div>
                <label className="text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Type Input */}
              <div>
                <label className="text-sm font-medium text-gray-700">Type</label>
                <input
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-600 text-center"
                >
                  {error}
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={() => setPosting(false)}
                  className="bg-gray-200 px-4 py-2 rounded-md text-gray-800 hover:bg-gray-300 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={postContent}
                  disabled={!link || !title || !type}
                  className={`px-4 py-2 rounded-md transition ${
                    !link || !title || !type
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default NewContent;
