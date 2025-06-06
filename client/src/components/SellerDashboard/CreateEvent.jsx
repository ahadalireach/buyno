/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { createEvent } from "../../redux/actions/event";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePlusCircle, AiOutlineCloseCircle } from "react-icons/ai";

const CreateEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [stock, setStock] = useState();
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [description, setDescription] = useState("");
  const [discountPrice, setDiscountPrice] = useState();
  const [originalPrice, setOriginalPrice] = useState();
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.events);

  const today = new Date().toISOString().slice(0, 10);
  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : "";

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Event created successfully.");
      navigate("/seller/dashboard-events");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleStartDateChange = (e) => {
    const start = new Date(e.target.value);
    setStartDate(start);
    setEndDate(null);
  };

  const handleEndDateChange = (e) => {
    const end = new Date(e.target.value);
    setEndDate(end);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!stock || Number(stock) <= 0) {
      toast.error("Stock must be greater than 0.");
      return;
    }
    if (!discountPrice || Number(discountPrice) < 10) {
      toast.error("Price (With Discount) must be at least 10.");
      return;
    }
    if (originalPrice && Number(originalPrice) < Number(discountPrice)) {
      toast.error(
        "Original Price must be greater than or equal to Discount Price."
      );
      return;
    }
    if (!startDate) {
      toast.error("Please select a start date.");
      return;
    }
    if (!endDate) {
      toast.error("Please select an end date.");
      return;
    }
    if (endDate <= startDate) {
      toast.error("End date must be after start date.");
      return;
    }
    if (endDate < new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)) {
      toast.error("End date must be at least 3 days after start date.");
      return;
    }

    const newForm = new FormData();
    const imageInput = document.querySelector("input[type='file']");
    const imageFiles = imageInput.files;

    for (let i = 0; i < imageFiles.length; i++) {
      newForm.append("images", imageFiles[i]);
    }

    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("sellerId", seller._id);
    newForm.append("startDate", startDate.toISOString());
    newForm.append("finishDate", endDate.toISOString());

    dispatch(createEvent(newForm));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]">
        <div
          className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
          style={{ maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={name}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your event product name..."
                required
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                cols="30"
                rows="5"
                name="description"
                value={description}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter your event product description..."
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Choose a category</option>
                {categoriesData &&
                  categoriesData.map((i) => (
                    <option value={i.title} key={i.title}>
                      {i.title}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-1">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={tags}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                onChange={(e) => setTags(e.target.value)}
                placeholder="Enter your event product tags..."
              />
            </div>
            <div className="flex gap-4">
              <div className="w-full">
                <label className="block text-base font-semibold text-gray-900 mb-1">
                  Original Price
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  value={originalPrice}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="Enter your event product price..."
                />
              </div>
              <div className="w-full">
                <label className="block text-base font-semibold text-gray-900 mb-1">
                  Price (With Discount) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="discountPrice"
                  value={discountPrice}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                  onChange={(e) => setDiscountPrice(e.target.value)}
                  placeholder="Enter your event product price with discount..."
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-1">
                Product Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                value={stock}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                onChange={(e) => setStock(e.target.value)}
                placeholder="Enter your event product stock..."
                required
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-1">
                Event Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="start-date"
                value={startDate ? startDate.toISOString().slice(0, 10) : ""}
                min={today}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                onChange={handleStartDateChange}
                required
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-1">
                Event End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="end-date"
                value={endDate ? endDate.toISOString().slice(0, 10) : ""}
                min={minEndDate}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                onChange={handleEndDateChange}
                required
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-1">
                Upload Images <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                id="upload"
                className="hidden"
                multiple
                onChange={handleImageChange}
                required
              />
              <div className="flex items-center flex-wrap gap-3 mt-2">
                <label
                  htmlFor="upload"
                  className="cursor-pointer flex flex-col items-center justify-center w-28 h-28 border-2 border-dashed border-orange-400 bg-orange-50 rounded-lg hover:bg-orange-100 transition"
                >
                  <AiOutlinePlusCircle size={32} className="text-orange-500" />
                  <span className="text-xs text-gray-500 mt-1">Add Images</span>
                </label>
                {images &&
                  images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt=""
                        className="h-28 w-28 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-white rounded-full p-1 text-gray-600 hover:text-orange-500 transition"
                        title="Remove"
                      >
                        <AiOutlineCloseCircle size={20} />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-orange-500 hover:bg-gray-600 text-white rounded-md font-semibold tracking-wide transition mt-4"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
