import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black text-white">
      <div className="flex flex-col justify-center items-center gap-6 p-10 shadow-xl bg-gray-800 rounded-lg">
        {/* Logo / Heading */}
        <div className="text-white text-4xl font-mono font-bold">Second Brain</div>

        {/* Input Fields */}
        <div className="flex flex-col w-full">
          <input
            className="m-2 px-4 py-2 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="m-2 px-4 py-2 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Signin Button */}
        <div>
          <button
            className="bg-blue-500 px-16 py-2 rounded-3xl text-lg font-medium hover:bg-blue-600 transition-all"
            onClick={async () => {
              try {
                const resp = await axios.post(
                  "http://localhost:2000/secondBrain/user/in",
                  { username, password }
                );
                const token = resp.data.TokenGenerated;
                localStorage.setItem("token", `Bearer ${token}`);
                navigate("/dashboard");
              } catch (error) {
                console.error("Signin failed:", error);
              }
            }}
          >
            Signin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
