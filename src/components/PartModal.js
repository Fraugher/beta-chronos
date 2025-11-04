import { useState, useEffect } from 'react';
import {ThemeProvider } from '@mui/material/styles';
import { Grid, TextField,  Button, Typography, Tooltip, Autocomplete  } from '@mui/material';
import partFormTheme from './../themes/partFormTheme.js'; 
import axios from 'axios';

export default function PartModal(props) {
    const uuid = props.uuid;
    const handleClose = props.handleClose;
    const putRoute = "/.netlify/functions/putPart?uuid=" + uuid;

    const [part, setPart] = useState(null);
    const [partStatuses, setPartStatuses] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({ uuid: uuid, name: '', status: '', version: '', unit: ''});
    const [spanText, setSpanText] = useState(null);
    
    useEffect(() => {
        if(!props.open) return null;
        const fetchPart = async () => {
          try {
            let route = "/.netlify/functions/getPart?uuid=";
            const response = await axios.get(route + uuid);
            if (response.status === 200) {
              setPart(response.data);
            }
            else {
              throw new Error(`HTTP error! Status: ${response.status}, Message: ${response.error || 'Unknown error'}`);
            }
            
            route = "/.netlify/functions/getPartStatus?uuid=";
            
            const responseStatuses = await axios.get(route + uuid);
            if (responseStatuses.status === 200) {
              setPartStatuses(responseStatuses.data);
            }
            else {
              throw new Error(`HTTP error! Status: ${responseStatuses.status}, Message: ${responseStatuses.error || 'Unknown error'}`);
            }
          } catch (e) {
            setError(e);
          } finally {
            setLoading(false);
          }
        };
        fetchPart();
      }, [uuid]);

    if (loading) return <div>Loading part...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const hasData =  (part && part.data);
    const partName = part.data.name;
    const status = part.data.status;

    const version = part.data.version ?? "n/a";
    const unit = part.data.unit ?? "n/a";
    const allowableStatuses = partStatuses.data.allowableStatuses;

    // updates formData when text field changes
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setStatus('pending changes...');
    };
    // for status combo box to store value in hidden field
    const handleAutocompleteChange = (e, newValue) => {
      setFormData({ ...formData, status: newValue});
    }
    const setStatus= (msg) => {
      setSpanText(msg);
    };
    const handleCancel = (event) => {
      handleClose(); // without data
    };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const getFormDataFields = new FormData(event.target);
    const formObject = Object.fromEntries(getFormDataFields.entries());
    const jsonPayload = JSON.stringify(formObject);
    console.log(JSON.stringify(jsonPayload));

    try {
          const response = await fetch(putRoute, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: jsonPayload,
          });

          const data = await response.json();

          if (response.ok) {
            setStatus('Form submitted successfully!');
            const updatedData = {
              data: data
            };
            handleClose(updatedData); // Close modal after submission
          } else {  // comes here if Saves with no changes
            setStatus(`Error: ${data.message || 'Something went wrong.'}`);
            handleClose();
          }
    } catch (error) {
        console.error('Error submitting form:', error);
        setStatus('Error submitting form.');
    }
  };

  return (
    <div>
        <ThemeProvider theme={partFormTheme}>     
            <Typography id="modal-modal-title" sx={{ color: 'white' }} variant="h6" component="h2">
                Part Information&nbsp;&nbsp;
                <span className="alert">{spanText}</span>
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                    <Grid size={12}>
                        <Tooltip title="The Part ID cannot be changed.">
                          <TextField 
                            label="Part ID"
                            value={uuid}
                            fullWidth
                            readOnly
                            margin="normal"
                            />
                        </Tooltip>
                        <input type="hidden" name="uuid" value={uuid} />
                    </Grid>
                    <Grid size={12}>
                      <Tooltip title="The Part Name cannot be changed.">
                        <TextField 
                            label="Name"
                            name="name"
                            value={partName}
                            // onChange={handleChange} // originally I thought this could be changed
                            fullWidth
                            readOnly
                            margin="normal"
                        />
                      </Tooltip>
                    </Grid>
                    <Grid size={{ xs: 12, sm:6}}>
                      <Tooltip title="The Part Version cannot be changed.">
                        <TextField 
                            label="Version"
                            name="version"
                            value={version}
                            // onChange={handleChange} // originally I thought this could be changed
                            fullWidth 
                            readOnly
                            margin="normal"
                        />
                        </Tooltip>
                    </Grid>
                    <Grid size={{ xs: 12, sm:6 }}>
                        <TextField 
                            label="Unit"
                            name="unit"
                            defaultValue={unit}
                            onChange={handleChange}
                            fullWidth 
                            margin="normal"
                        />
                    </Grid>
                    <Grid size={12} sx={{ mt: 2.5, mb: 2}}>         
                        <Autocomplete
                            id="partStatusAutocomplete"
                            label="Status"
                            options={allowableStatuses}
                            disablePortal
                            autoHighlight
                            defaultValue={status}
                            renderInput={(params) => <TextField {...params} label="Select a status:" />}
                            onChange={handleAutocompleteChange}
                            fullWidth 
                        />
                        <input type="text" name="status" value={formData.status} style={{ display: 'none' }} />
                        {/* // <input type="hidden" name="status" defaultValue={formData.status ?? status} /> */}
                    </Grid>
                </Grid>
                <div></div>

                <Button type="submit" variant="contained"  sx={{ mt: 2 }}>
                Save
                </Button>&nbsp;&nbsp;
                <Button type="button" onClick={handleCancel} variant="contained" sx={{ mt: 2 }}>
                Cancel / Close
                </Button>
            </form>
        </ThemeProvider>
    </div>
  );
}