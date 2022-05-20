import React from "react";
import "./ImagePreview.scss";

/**
 * The ImagePreview component displays a live preview
 * of the user's image with their selected effects applied
 * to it. 
 */
const ImagePreview = (props) => {

  const getImage = () => {
    if(props.appState.originalImage !== null) {
      return (
        <img src={props.appState.originalImage.content} />
      );

    } else {
      return (
        <p>No image loaded</p>
      );
    }
  }

  return (
    <div className="image-preview-wrapper">
      <div className="image-preview">
        { getImage() }
      </div>
    </div>
  );

}

export default ImagePreview;