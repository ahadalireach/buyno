import axios from "axios";

export const getAllSellersByAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllSellersRequestByAdmin",
    });

    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/sellers/admin/all-sellers`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "getAllSellersSuccessByAdmin",
      payload: data.sellers,
    });
  } catch (error) {
    dispatch({
      type: "getAllSellersFailByAdmin",
      payload: error.response.data.message,
    });
  }
};
