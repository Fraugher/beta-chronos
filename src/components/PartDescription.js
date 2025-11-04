import React, { useState, useEffect } from 'react';
import { Modal,  Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PartModal from './PartModal.js';
import axios from 'axios';

// These are all top level machines with an endUnitSerialNo
function PartDescription(props) {
      const [part, setPart] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [isOpen, setIsOpen] = useState(false);

      const handleClose = (data, reason) => {
        if (reason && reason === 'backdropClick') {
          return; 
        }
        try {
          if (data) {
            setPart(data);
          }
        }
        catch {}
        finally
        {
          setIsOpen(false);
        }
      };

      const handleOpen = () => {
        setIsOpen(true);
      };

      const route = "/.netlify/functions/getPart?uuid=";
      const prefix = props.prefix ?? "";
      const isMachine = (prefix!=="");
      const uuid = props.uuid;
      const quantity = props.quantity ?? "1";
      const useRoute = route + uuid;

      useEffect(() => {
        const fetchPart = async () => {
          try {
            const response = await axios.get(useRoute);
            if (response.status === 200) {
              setPart(response.data);
            }
            else {
              throw new Error(`HTTP error! Status: ${response.status}, Message: ${response.error || 'Unknown error'}`);
            }
          } catch (e) {
            setError(e);
          } finally {
            setLoading(false);
          }
        };

        fetchPart();
      }, [uuid, useRoute]);

      if (loading) return <div>Loading part...</div>;
      if (error) return <div>Error: {error.message}</div>;

      const hasData =  (part && part.data);
      const uuId = part.data.uuid ?? "";
      
      const name = part.data.name ?? "";
      const status = part.data.status ?? "";
      const partTitle = isMachine ? ("Machine #" + prefix + ":") : "";
      const quantityText = isMachine ? "" : quantity + "×"; // "\\\\U+00D7 ";
      const uuIdTitle = isMachine ? "" : "-- UUID #" + uuId;

      const version = part.data.version ?? "n/a";
      const unit = part.data.unit ?? "n/a";
      
      const modalStyle = {
        'max-width': '80%'
      };
    

      return (
        <div className="part">
          <div>
            { (props.verbose) && (<pre>{JSON.stringify(part, null, 2)}</pre>) }
            
            {hasData && (
              <div>
                  <p key={uuId}><span className="accent">{quantityText}</span>
                  <span className="title">{partTitle} {name}</span>
                  <IconButton sx={{ color: '#007bff',verticalAlign: 'middle', transform: 'translateY(-3px)', marginLeft: '-5px'}} aria-label="open" onClick={handleOpen}>
                    <OpenInNewIcon />
                  </IconButton>
                  {uuIdTitle}
                  </p>
                  {(!isMachine) && 
                  <p>Part Version: {version} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Unit: {unit}
                  </p>
                  }
                  <p>Status: {status}
                  </p>
              </div>
            )}
          </div>

          {isOpen && (
          <Modal
              open={isOpen} 
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              slotProps={{
              backdrop: {
                sx: {
                  backgroundColor: 'rgba(0, 13, 63, 1)',
                  border: '2px solid #000',
                  boxShadow: 24,
                  padding: 40, 
                  color: 'primary.main', 
                  position: 'fixed',
                  top: 20,
                  left: 20,
                  right: 20,
                  bottom: 20
                },
              },
            }}
            >
              <Box sx={modalStyle}>
                <div className="inner-div">
                  <PartModal open={isOpen} handleClose={handleClose} uuid={uuid}  />
                </div>
              </Box>
            </Modal>
          )}
        </div>
      );
}

export default PartDescription;