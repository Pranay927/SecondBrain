import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
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
        {error && (
          <div className="text-red-600 text-sm">Username already exists</div>
        )}
        <div>
          <button
            className="bg-blue-500 px-16 text-center rounded-3xl  hover:font-semibold"
            onClick={async () => {
              try {
                await axios.post("http://localhost:2000/secondBrain/user/up", {
                  username,
                  password,
                });
                navigate("/in");
              } catch (e) {
                setError(true);
              }
            }}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
