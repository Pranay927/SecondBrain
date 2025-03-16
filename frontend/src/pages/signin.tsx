import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center  h-screen ">
      <div className="flex flex-col justify-center items-center gap-6 p-10 shadow-xl ">
        <div className="text-gray-950 text-3xl font-mono font-bold">
          Second Brain
        </div>
        <div className="  flex flex-col">
          <input
            className="m-2 bg-neutral-100 rounded-sm"
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="m-2 bg-neutral-100 rounded-sm"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            className="bg-neutral-300 px-16 text-center rounded-3xl  hover:font-semibold"
            onClick={async () => {
              const resp = await axios.post(
                "http://localhost:2000/secondBrain/user/in",
                {
                  username,
                  password,
                }
              );
              const token = resp.data.TokenGenerated;
              localStorage.setItem("token", `Bearer ${token}`);
              navigate("/dashboard");
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
