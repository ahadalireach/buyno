import { useNavigate } from "react-router-dom";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();

  const submitHandle = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload();
  };

  return (
    <div className="w-full bg-white border border-t-0 border-gray-200 rounded-b-md shadow-lg z-30">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div
            key={index}
            className="flex items-center px-5 py-3 cursor-pointer hover:bg-orange-50 transition"
            onClick={() => submitHandle(i)}
          >
            <img
              src={i.image_Url}
              alt={i.title}
              className="w-6 h-6 object-contain mr-3 select-none"
              draggable={false}
            />
            <h3 className="text-[#393c41] font-medium select-none">
              {i.title}
            </h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
