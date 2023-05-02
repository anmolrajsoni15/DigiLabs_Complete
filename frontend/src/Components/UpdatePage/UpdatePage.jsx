import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./UpdatePage.css";
import { loadPage, updatePage } from "../../Actions/Page";
import Loader from "../Loader/Loader";

function UpdatePage() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.user);
  const {
    loading: pageLoading,
    page,
    error: pageError,
  } = useSelector((state) => state.page);

  const [text, setText] = useState(page ? page.text: '');
    const [image, setImage] = useState(page ? page.image.url: '');
    const [imagePreview, setImagePreview] = useState(page && page.image.url);

    const submitHandler = async(e) => {
        e.preventDefault();
        await dispatch(updatePage(text, image));
        alert.success("Updated Successfully");
        navigate("/signup");
    };

    const handleImageChange = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            if(reader.readyState === 2){
                setImage(reader.result);
                setImagePreview(reader.result);
            }
        };
    };



  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (pageError) {
      alert.error(pageError);
      dispatch({ type: "clearErrors" });
    }
    if (page) {
      dispatch({ type: "clearErrors" });
    }
    else{
        dispatch(loadPage());
    }
  }, [dispatch, alert, error, pageError, page]);

  return loading ? (
    <Loader />
  ) : (
    <div className="updatePageContainer">
      <div className="updatePage">
        <h1>Update Page</h1>
        <form className="updatePageForm" onSubmit={submitHandler}>
            <img src={imagePreview} alt="image" style={{height: "200px", width: "200px"}}/>
          <div className="updatePageInput">
            <label htmlFor="image" className="Label">Image</label>
            <input type="file" accept="image/*" name="image" id="image" onChange={handleImageChange} />
          </div>
          <div className="updatePageInput">
            <label htmlFor="text" className="Label">Text</label>
            <input
              type="text"
              name="text"
              id="text"
              required
              placeholder="Text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <button disabled={pageLoading} type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePage;
