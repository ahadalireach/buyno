import axios from "axios";

export const createEvent = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "createEventRequest",
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/events/create`,
      formData,
      config
    );
    console.log(data);

    dispatch({
      type: "createEventSuccess",
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: "createEventFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};
