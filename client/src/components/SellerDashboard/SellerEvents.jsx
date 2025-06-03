import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { deleteProduct, getAllProductsShop } from "../../redux/actions/product";
import Loader from "../Layout/Loader";

const SellerEvents = () => {
  //   const { isLoading, products } = useSelector((state) => state.products);
  const { events } = useSelector((state) => state.events);

  //   const handleDelete = (productId) => {
  //     dispatch(deleteProduct(productId));
  //     toast.success("Product deleted successfully.");
  //     window.location.reload(true);
  //   };
  console.log(events);

  return (
    <div className="w-full px-2 md:px-10 pt-2 overflow-x-auto">
      SellerEvents
    </div>
  );
};

export default SellerEvents;
