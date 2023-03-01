import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CompareFilter = ({
  DUMMY_RESORT,
  getFilterResorts,
  resetFilterResorts,
}) => {
  const dummyKey = Object.keys(DUMMY_RESORT[0]);
  const [filterKeys, setFilterKeys] = useState([]);
  const [first, setfirst] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilterKeys(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const removeKeyFilter = (i) => {
    const temp = filterKeys.filter((key, index) => {
      return index !== i;
    });
    console.log(temp);
    setFilterKeys([...temp]);
  };
  return (
    <div className="flex  items-center">
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-multiple-checkbox-label">Filter Me</InputLabel>
        <Select
          size="small"
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={filterKeys}
          onChange={handleChange}
          input={<OutlinedInput label="Filter Me" size="small" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {dummyKey.map((key) => (
            <MenuItem key={key} value={key} size="small">
              <Checkbox size="small" checked={filterKeys.indexOf(key) > -1} />
              <ListItemText size="small" primary={key} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <button
        className="bg-blue-500 p-1 rounded-sm "
        onClick={() => getFilterResorts(filterKeys)}
      >
        Filter
      </button>
      <button
        className="bg-red-500 p-1 rounded-sm "
        onClick={() => {
          resetFilterResorts();
          setFilterKeys([]);
        }}
      >
        Reset
      </button>
      <div className=" flex ml-auto gap-3 ">
        {filterKeys.map((key, index) => (
          <div key={index} className="text-sm bg-gray-200 p-1 rounded-lg">
            <span className="mr-2">{key}</span>
            <button onClick={() => removeKeyFilter(index)}>
              <HighlightOffIcon fontSize="small" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CompareFilter;
