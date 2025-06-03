import axios from "axios";

export const getUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "getUserRequest",
    });
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/users/profile`,
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
      type: "getUserFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const getSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "getSellerRequest",
    });
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/sellers/profile`,
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
      type: "getSellerFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};
