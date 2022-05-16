import React from "react";
import { Button } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { DitheringOptions } from "../../Constants";
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

  const handleDitheringAlgorithmChange = (event) => {
    props.setAppState({
      ...props.appState,
      dither: event.target.value
    });
  }

  const generateDitheringAlgorithmSelectMenuItems = () => {  

    let menuItems = []

    for(const [key, value] of Object.entries(DitheringOptions)) {
      menuItems = [...menuItems, <MenuItem key={key} value={value}>{ value }</MenuItem>]
    }

    return menuItems;
  }

  return (
    <div className="toolbar-wrapper">
      <div className="toolbar">
        <Button variant="contained">Upload</Button>
        <Button variant="contained">Download</Button>
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
            { generateDitheringAlgorithmSelectMenuItems() }
          </Select>
        </FormControl>
      </div>
    </div>
  )

}

export default ToolBar;