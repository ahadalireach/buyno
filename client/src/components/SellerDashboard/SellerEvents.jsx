import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { deleteEvent, getAllSellerEvents } from "../../redux/actions/event";
import Loader from "../Layout/Loader";

const SellerEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { seller } = useSelector((state) => state.seller);
  const { isLoading, events } = useSelector((state) => state.events);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllSellerEvents(seller._id));
    }
  }, [dispatch, seller?._id]);

  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
  };

  return (
    <div className="w-full px-2 md:px-10 pt-2 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 shadow rounded-lg mt-8">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium">ID</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Price</th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Sold Out
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">Preview</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Delete</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {isLoading ? (
            <tr>
              <td colSpan={6} className="py-4 text-center">
                <Loader />
              </td>
            </tr>
          ) : events && events.length > 0 ? (
            events.map((event) => (
              <tr key={event._id}>
                <td className="px-4 py-2 text-sm">{event._id}</td>
                <td className="px-4 py-2 text-sm">{event.name}</td>
                <td className="px-4 py-2 text-sm">
                  {event.discountPrice
                    ? `$${event.discountPrice}`
                    : event.originalPrice
                    ? `$${event.originalPrice}`
                    : "-"}
                </td>
                <td className="px-4 py-2 text-sm">{event.soldOut || 0}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 transition"
                    title="Preview"
                    onClick={() =>
                      navigate(`/product/${event._id}?isEvent=true`)
                    }
                  >
                    <AiOutlineEye size={18} />
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition"
                    title="Delete"
                    onClick={() => handleDelete(event._id)}
                  >
                    <AiOutlineDelete size={18} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-4 text-center text-gray-400">
                No events found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SellerEvents;
