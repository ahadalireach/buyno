import { AiOutlineThunderbolt } from "react-icons/ai";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] w-full">
      <div className="relative flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-400 border-t-transparent" />
        <AiOutlineThunderbolt className="absolute text-orange-500" size={32} />
      </div>
      <span className="mt-4 text-orange-500 font-semibold text-lg tracking-wide">
        Loading...
      </span>
    </div>
  );
};

export default Loader;
