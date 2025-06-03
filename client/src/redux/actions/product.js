import axios from "axios";

export const addProduct = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "addProductRequest",
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/products/add`,
      formData,
      config
    );

    dispatch({
      type: "addProductSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "addProductFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getSellerProductsRequest",
    });

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/products/seller/${id}`,
      config
    );

    dispatch({
      type: "getSellerProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getSellerProductsFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/products/seller/${productId}`,
      config
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response?.data?.message || error.message,
    });
  }
};
