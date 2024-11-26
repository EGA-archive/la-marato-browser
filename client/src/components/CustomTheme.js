import { createTheme } from "@mui/material/styles";

const customTheme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #902b434d !important",
            borderRadius: "10px",
            boxShadow: "none",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #902b43 !important",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #902b43 !important",
          },
        },
        paper: {
          // Styles for the dropdown popover
          borderRadius: "10px",
          border: "1px solid #902b434d",
          boxShadow: "none",
        },
        listbox: {
          // Styles for the listbox
          padding: "0px",
          "& .MuiAutocomplete-option": {
            borderRadius: "5px",
            "&[aria-selected='true']": {
              backgroundColor: "#f0eaeb !important", // Keeps the selected option's background
            },
            // "&:hover": {
            //   backgroundColor: "inherit !important", // Keeps default MUI hover behavior
            // },
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: "0px", // Remove left margin
          marginRight: "0px", // Remove right margin
          color: "#FF0000", // Set the color to red for error text
        },
      },
    },
  },
});

export default customTheme;
