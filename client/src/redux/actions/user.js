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

export const updateUserInfo =
  (name, email, phoneNumber, password) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });

      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/users/update-info`,
        {
          name,
          email,
          password,
          phoneNumber,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        }
      );

      dispatch({
        type: "updateUserInfoSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "updateUserInfoFail",
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const updateUserAddress =
  (country, city, address1, address2, zipCode, addressType) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "updateUserAddressesRequest",
      });

      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/users/update-addresses`,
        {
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType,
        },
        { withCredentials: true }
      );
      console.log(data);

      dispatch({
        type: "updateUserAddressesSuccess",
        payload: {
          successMessage: "User address updated succesfully.",
          user: data.user,
        },
      });
    } catch (error) {
      dispatch({
        type: "updateUserAddressesFail",
        payload: error.response.data.message,
      });
    }
  };

export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteUserAddressRequest",
    });

    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/users/delete-address/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: "deleteUserAddressSuccess",
      payload: {
        successMessage: "User address deleted successfully.",
        user: data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "deleteUserAddressFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllUsersByAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUsersByAdminRequest",
    });

    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/users/admin/all-users`,
      { withCredentials: true }
    );
    console.log(data);

    dispatch({
      type: "getAllUsersSuccessByAdmin",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "getAllUsersByAdminFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};
