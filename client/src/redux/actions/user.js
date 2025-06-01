import axios from "axios";

export const getUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "getUserLoading",
    });
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/user/getuser`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "getUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "getUserFailed",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const getSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "getSellerLoading",
    });
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/shop/getseller`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "getSellerSuccess",
      payload: data.seller,
    });
  } catch (error) {
    dispatch({
      type: "getSellerFailed",
      payload: error.response?.data?.message || error.message,
    });
  }
};
