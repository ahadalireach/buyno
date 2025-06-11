import axios from "axios";

export const getUserOrders = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "getUserOrdersRequest",
    });

    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/orders/user/${userId}`
    );

    dispatch({
      type: "getUserOrdersSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getUserOrdersFail",
      payload: error.response.data.message,
    });
  }
};

export const getSellerOrders = (sellerId) => async (dispatch) => {
  try {
    dispatch({
      type: "getSellerOrdersRequest",
    });

    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/orders/seller/${sellerId}`
    );

    dispatch({
      type: "getSellerOrdersSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getSellerOrdersFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllOrdersByAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersRequestByAdmin",
    });

    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/orders/admin/all-orders`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "getAllOrdersSuccessByAdmin",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersFailByAdmin",
      payload: error.response.data.message,
    });
  }
};
