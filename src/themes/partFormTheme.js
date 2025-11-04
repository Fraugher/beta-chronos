import { createTheme } from '@mui/material/styles';

  const partFormTheme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-input': {
              color: 'white', 
            },
            // Target the label color
            '& .MuiInputLabel-root': {
              color: 'gray', 
            },
            '& .MuiFormHelperText-root': {
              color: 'red', 
            },
            '.MuiSvgIcon-root': {
              color: 'white !important',
            },
            '.MuiOutlinedInput-root': {
                '& fieldset': { // Targets the border (fieldset) when not focused
                    borderColor: 'blue', // Default border color
                },
                '&:hover fieldset': { // Targets the border on hover
                    borderColor: 'white',
                },
                '&.Mui-focused fieldset': { // Targets the border when focused
                    borderColor: 'red',
                },
            },
       } ,
      },
    },
  }});
export default partFormTheme;