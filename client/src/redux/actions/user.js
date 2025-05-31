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
