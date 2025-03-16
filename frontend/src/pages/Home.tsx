
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import HomeLogo from "../Icons/HomeLogo";
function Home() {

  return (
    <HeroSection />
  );
}

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 text-center">
      {/* Animated Heading */}
      <motion.h1 
        className="text-4xl md:text-6xl font-bold leading-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Build Your <span className="text-blue-500 font-mono flex items-center">Second Brain<HomeLogo/></span>
      </motion.h1>

      {/* Subtext */}
      <motion.p 
        className="mt-4 text-lg md:text-xl text-[#a5a5a5] max-w-2xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Organize your thoughts, save knowledge, and access it anytime.  
        A smarter way to remember, learn, and create.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div 
        className="mt-6 flex gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium"
        onClick={()=>{navigate("/up")}}>
          SignUp
        </button>
        <button className="bg-transparent border border-gray-500 text-gray-300 px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-800"
        onClick={()=>{navigate("/in")}}>
          SignIn
        </button>
      </motion.div>
    </section>
  );
};



export default Home;

