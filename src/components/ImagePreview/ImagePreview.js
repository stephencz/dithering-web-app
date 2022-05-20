import React from "react";
import { useState, useRef, useEffect } from "react";
import "./ImagePreview.scss";

/**
 * The ImagePreview component displays a live preview
 * of the user's image with their selected effects applied
 * to it. 
 */
const ImagePreview = (props) => {

  const imagePreviewRef = useRef(null);

  const [previewData, setPreviewData] = useState({
    drag: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    zoom: 300
  });

  const isEventInImagePreview = (event) => {
    const refOffsetLeft = imagePreviewRef.current.offsetLeft;
    const refOffsetRight = refOffsetLeft + imagePreviewRef.current.offsetWidth;
    const refOffsetTop = imagePreviewRef.current.offsetTop;
    const refOffsetBottom = refOffsetTop + imagePreviewRef.current.offsetHeight

    const targetX = event.offsetX;
    const targetY = event.offsetY;

    if(targetX >= refOffsetLeft && targetX <= refOffsetRight) {
      if(targetY >= refOffsetTop && targetY <= refOffsetBottom) {
        return true;
      }
    }

    return false;
  }

  const handleImageZoom = (event) => {
    if(isEventInImagePreview(event)) {

    }
  }

  const handleImageDrag = (event) => {
    if(isEventInImagePreview(event)) {
      
      console.log("VALID");
    }
  }

  useEffect(() => {

    document.addEventListener("scroll", handleImageZoom);
    document.addEventListener("click", handleImageDrag);

    return () => {
      document.removeEventListener("scroll", handleImageZoom);
      document.removeEventListener("click", handleImageDrag);
    }

  });

  const getImage = () => {
    if(props.appState.originalImage !== null) {

      const styles = {
        height: previewData.zoom
      }

      return (
        <img 
          style={ styles } 
          src={props.appState.originalImage.content}           
          alt="what you just uploaded."
        />
      );

    } else {
      return (
        <p>No image loaded</p>
      );
    }
  }

  return (
    <div className="image-preview-wrapper" ref={ imagePreviewRef }>
      <div className="image-preview">
        { getImage() }
      </div>
    </div>
  );

}

export default ImagePreview;