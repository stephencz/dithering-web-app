import React from "react";
import { Button } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { DitheringOptions, QuantizationOptions, ResizeOptions } from "../../Constants";
import "./ToolBar.scss";

/**
 * The ToolBar component is the part of the application that
 * the user does the bulk of their interaction with. It provides
 * an interface for loading an image, applying the different effects
 * to it, and downloading the final product.
 * 
 * The view includes image panning and zooming.
 */
const ToolBar = (props) => {

  const handleQuantizationAlgorithmChange = (event) => {
    props.setAppState({
      ...props.appState,
      quantization: event.target.value
    });
  }

  const handleDitheringAlgorithmChange = (event) => {
    props.setAppState({
      ...props.appState,
      dither: event.target.value
    });
  }

  const handleResizeMethodChange = (event) => {
    console.log(event);

    if(event.target.value === "None") {
      props.setAppState({
        ...props.appState,
        shouldResize: false,
        resize: ResizeOptions.NONE,
        resizeWidth: 0,
        resizeHeight: 0
      });

    } else {
      props.setAppState({
        ...props.appState,
        shouldResize: true,
        resize: event.target.value,
      });
    }
  }

  const generateMenuItems = (dictionary) => {  

    let menuItems = []

    for(const [key, value] of Object.entries(dictionary)) {
      menuItems = [...menuItems, <MenuItem key={key} value={value}>{ value }</MenuItem>]
    }

    return menuItems;
  }

  return (
    <div className="toolbar-wrapper">
      <div className="toolbar">
        <Button variant="contained">Upload</Button>

        <FormControl >
          <InputLabel id="quantization-algorithm-select-label">Quantization Algorithm</InputLabel>
          <Select 
            labelId="quantization-algorithm-select-label"
            id="quantization-algorithm-select"
            value={ props.appState.quantization }
            label="Quantization Algorithm"
            size="small"
            onChange={ handleQuantizationAlgorithmChange }
          >
            { generateMenuItems(QuantizationOptions) }
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="dithering-algorithm-select-label">Dithering Algorithm</InputLabel>
          <Select 
            labelId="dithering-algorithm-select-label"
            id="dithering-algorithm-select"
            value={ props.appState.dither }
            label="Dithering Algorithm"
            size="small"
            onChange={ handleDitheringAlgorithmChange }
          >
            { generateMenuItems(DitheringOptions) }
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="resize-select-label">Resize Method</InputLabel>
          <Select 
            labelId="resize-select-label"
            id="resize-select"
            value={ props.appState.resize }
            label="Resize Method"
            size="small"
            onChange={ handleResizeMethodChange }
          >
            { generateMenuItems(ResizeOptions) }
          </Select>
        </FormControl>
        

        <Button variant="contained">Render</Button>
        <Button variant="contained">Download</Button>
      </div>
    </div>
  )

}

export default ToolBar;