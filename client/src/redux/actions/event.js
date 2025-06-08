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

export const getAllSellerEvents = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllSellerEventsRequest",
    });

    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/events/seller/${id}`
    );
    dispatch({
      type: "getAllSellerEventsSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllSellerEventsFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteEventRequest",
    });

    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/events/seller/${id}`,
      {
        withCredentials: true,
      }
    );

    console.log(data);

    dispatch({
      type: "deleteEventSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteEventFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsRequest",
    });

    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/events/all`
    );
    dispatch({
      type: "getAllEventsSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllEventsFail",
      payload: error.response.data.message,
    });
  }
};
