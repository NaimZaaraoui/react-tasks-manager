import { CiViewList } from "react-icons/ci";
import { FaRegListAlt } from "react-icons/fa";
import useApp from "../hooks/useApp";
import { motion } from "motion/react";
import { TbHomeStats } from "react-icons/tb";

const Header = () => {
  const { tasks, toggleStats } = useApp();

  return (
    <>
      <motion.header
        className="py-5 bg-sky-100"
        initial={{ y: "-100%" }}
        animate={{ y: 0, transition: { type: "spring", stiffness: 120 } }}>
        <div className="container flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center gap-2 text-sky-950">
            <CiViewList />
            <span className="tracking-wider uppercase text-sm">
              Tasks Manager
            </span>
          </h1>

          <div className="relative">
            <span className="grid place-center size-5 bg-sky-500 text-white text-xs font-medium rounded-full absolute -right-3 -top-3">
              {tasks.length < 9 ? tasks.length : "9+"}
            </span>
            <FaRegListAlt />
          </div>
        </div>
      </motion.header>
      <motion.button
        className="size-10 bg-sky-500/50 grid place-center fixed bottom-0 text-white"
        aria-label="Open stats"
        initial={{ x: "-100%" }}
        animate={{ x: 0, transition: { delay: 1 } }}
        onClick={() => toggleStats(true)}>
        <TbHomeStats size={20} />
      </motion.button>
    </>
  );
};

export default Header;
