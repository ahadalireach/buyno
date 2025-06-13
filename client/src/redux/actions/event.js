import axios from "axios";

export const createEvent = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "createEventRequest",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/events/create`,
      payload,
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
      `${process.env.REACT_APP_BACKEND_URL}/events/event/${id}`,
      {
        withCredentials: true,
      }
    );

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
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const getAllEventsByAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsRequestByAdmin",
    });

    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/events/admin/all-events`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "getAllEventsSuccessByAdmin",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllEventsFailByAdmin",
      payload: error.response.data.message,
    });
  }
};
