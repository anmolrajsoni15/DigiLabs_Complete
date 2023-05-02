import axios from "axios";

export const updatePage = (text, image) => async (dispatch) => {
  try {
    dispatch({ type: "updatePageRequest" });

    const { data } = await axios.post(
      `/api/v1/page/update`,
      { text, image },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "updatePageSuccess", payload: data.page });
  } catch (error) {
    dispatch({
      type: "updatePageFailure",
      payload: error.response.data.message,
    });
  }
};

export const loadPage = () => async (dispatch) => {
  try {
    dispatch({ type: "loadPageRequest" });

    const { data } = await axios.get(`/api/v1/page`);
    dispatch({ type: "loadPageSuccess", payload: data.page });
  } catch (error) {
    dispatch({
      type: "loadPageFailure",
      payload: error.response.data.message,
    });
  }
};
