import axios from "axios";

export const signUpUser =
  (name, email, password, confirmpassword) => async (dispatch) => {
    try {
      dispatch({
        type: "SignUpRequest",
      });

      const { data } = await axios.post(
        `/api/v1/signup`,
        { name, email, password, confirmpassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "SignUpSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "SignUpFailure",
        payload: error.response.data.message,
      });
    }
  };

  export const loadUser = () => async (dispatch) => {
    try {
      dispatch({
        type: "LoadUserRequest",
      });
  
      const { data } = await axios.get(`/api/v1/profile`);
      dispatch({
        type: "LoadUserSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "LoadUserFailure",
        payload: error.response.data.message,
      });
    }
  };

  export const logoutUser = () => async (dispatch) => {
    try {
      dispatch({
        type: "LogoutRequest",
      });
  
      await axios.get(`/api/v1/logout`);
  
      dispatch({
        type: "LogoutSuccess",
      });
    } catch (error) {
      dispatch({
        type: "LogoutFailure",
        payload: error.response.data.message,
      });
    }
  };

  export const updateProfile = (name, email, avatar) => async (dispatch) => {
    try {
      dispatch({
        type: "updateProfileRequest",
      });
  
      const { data } = await axios.post(
        `/api/v1/update/profile`,
        { name, email, avatar },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "updateProfileSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updateProfileFailure",
        payload: error.response.data.message,
      });
    }
  };