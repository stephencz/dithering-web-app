import React from "react";
import { useEffect } from "react";

import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { DitheringOptions, QuantizationOptions, ResizeOptions } from "../../Constants";

import { useFilePicker } from "use-file-picker";

import "./ToolBar.scss";

/**
 * The ToolBar component is the part of the application that
 * the user does the bulk of their interaction with. It provides
 * an interface for loading an image, applying the different effects
 * to it, and downloading the final product.
 */
const ToolBar = (props) => {

  // The useFilePicker hook provides an easy way to open the file selection dialog
  // filesContent is an array of files, clear, clears the array.
  const [openFileSelector, {filesContent, clear}] = useFilePicker({
    readAs: 'DataURL',
    accept: 'image/*',
    multiple: false,
    maxFileSize: 50,
  })

  // Because the component will re-render when filesContent is updated,
  // this effect checks if the filesContent array of files has a file in
  // it, updates the applications state with that file, and then clears
  // the filesContent array to avoid maximum depth exceeded error from
  // update loop.
  useEffect(() => {
    if(filesContent.length > 0) {
      props.setAppState({...props.appState, originalImage: filesContent[0]});
      clear();
    }

  }, [filesContent, clear, props]);

  /**
   * Clears existing loaded files, and opens the file selector.
   * @param {*} event 
   */
  const handleImageUpload = (event) => {
    if(filesContent.length > 0) {
      clear();
    }

    openFileSelector();
  }

  /**
   * Updates the quanitzation algorithm the application is using.
   * @param {*} event 
   */
  const handleQuantizationAlgorithmChange = (event) => {
    props.setAppState({
      ...props.appState,
      quantization: event.target.value
    });
  }

  /**
   * Updates the dithering algorithm the application is using.
   * @param {*} event 
   */
  const handleDitheringAlgorithmChange = (event) => {
    props.setAppState({
      ...props.appState,
      dither: event.target.value
    });
  }

  /**
   * Updates the resize method the application is using, and sets
   * the shouldResize flag to true or false.
   * @param {*} event 
   */
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

  /**
   * Generates a MUI Select menu items from the passed in dictionary.
   * @param {*} dictionary A dictionary of string values.
   * @returns React Elements
   */
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
        <Grid container spacing={4}>
          <Grid item md={2}>
            <Button 
              variant="contained" 
              fullWidth 
              onClick={ handleImageUpload }
            >
              Upload
            </Button>
          </Grid>
          <Grid item md={2}>
            <Button variant="contained" fullWidth>Render</Button>
          </Grid>
          <Grid item md={2}>
            <Button variant="contained" fullWidth>Download</Button>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={4}>
            <FormControl fullWidth>
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
          </Grid>
        
          <Grid item xs={4}>
            <FormControl fullWidth>
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
          </Grid>
        </Grid>
        
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="resize-select-label">Resize Method</InputLabel>
              <Select fullWidth
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
          </Grid>

          <Grid item xs={2}>
            <TextField fullWidth
              id="resize-width-textfield" 
              label="Width" 
              variant="filled" 
              size="small" 
              disabled={ !props.appState.shouldResize }
            />
          </Grid>
          
          <Grid item xs={2}>
            <TextField fullWidth
              id="resize-height-textfield" 
              label="Height" 
              variant="filled" 
              size="small" 
              disabled={ !props.appState.shouldResize }
            />
          </Grid>
        </Grid>
    
      </div>
    </div>
  )

}

export default ToolBar;