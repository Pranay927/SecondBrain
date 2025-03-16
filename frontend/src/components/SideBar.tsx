import Logo from "../Icons/Logo";
import { motion } from "framer-motion";
function SideBar() {
  return (
    <motion.div 
    initial={{ x: -100, opacity:0.5  }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.6, ease:"anticipate" }}
    className="flex flex-col items-center justify-between w-1/4 bg-gray-950 gap-6 text-neutral-400 font font-semibold h-screen text-center ">
      <div className="flex flex-col gap-6">
        <div className="text-2xl font-mono cursor-pointer pt-4 text-white px-1 flex justify-center items-center gap-2">
          <div className="bg-white p-2 rounded-full"><Logo/></div> <span>Second Brain</span>
        </div>

        <div className="text-lg font-semibold  cursor-pointer pt-10 hover:scale-105 transition duration-300  hover:text-white hover:border-b">
          Youtube
        </div>
        <div className="text-lg cursor-pointer  transition-transform duration-300 hover:scale-105 hover:text-white hover:border-b">
          Clips
        </div>
        <div className="text-lg cursor-pointer hover:scale-105  hover:border-b transition duration-300 hover:text-white">
          Tweets
        </div>
        <div className="text-lg cursor-pointer hover:scale-105   transition duration-300 hover:text-white hover:border-b">
          Thoughts
        </div>
      </div>
      <div className=" flex justify-end items-end text-sm pb-4">
        copyright © 2025
      </div>
    </motion.div>
  );
}

export default SideBar;
