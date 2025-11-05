import React, { useState, useEffect } from 'react';
import Configurations from './Configurations.js';
import PartDescription from './PartDescription.js';
import { Collapse, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import axios from 'axios';

// These are all top level machines with an endUnitSerialNo
function ComponentList(props) {
      const [components, setComponents] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [isOpen, setIsOpen] = useState(false);

      const handleClick = () => {
          setIsOpen(!isOpen);
      };

      const uuid = props.uuid;
      const verbose = props.verbose ?? false;
      const depth = parseInt(props.depth) ?? 0;
      const MAX_DEPTH = 25; // prevent any unforeseen ∞ recursion, what is max level of configurations possible
      const depthClass = "level level" + depth;

      const route = "/.netlify/functions/getConfigurations?uuid=";
      const useRoute = encodeURI(route + uuid);

      useEffect(() => {
        if (isOpen && !components) {
          const fetchComponents = async () => {
            try {
              console.log("GETTING: " + useRoute);
              const response = await axios.get(useRoute);

              if (response.status === 200) {
                setComponents(response.data);
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
          fetchComponents();
        }
      }, [isOpen, components, useRoute]);

      if (loading) return (
        <Button
          sx={{ minWidth: 150, height: 22, color: "secondary"}}
          onClick={handleClick}
          variant="contained"
          endIcon={isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        >
          {isOpen ? 'Hide Configurations' : 'Show Configurations'}
        </Button>
      );
      if (error) return <div>Error: {error.message}</div>;

      const hasComponents = (Object.keys(components.data).length>0);
      return (
      <div>
        {(hasComponents) && 
          <Button
            sx={{ minWidth: 150, height: 22, color: "secondary"}}
            onClick={handleClick}
            variant="contained"
            endIcon={isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          >
            {isOpen ? 'Hide Configurations' : 'Show Configurations'}
          </Button> 
        }
      <Collapse in={isOpen}>
        <div className="component">
          {(hasComponents) ? 
           <p className="title-list">This part is composed of the following components:</p> :
           <p className="italics">There are no subcomponents of this part.</p>
          }

          { (props.verbose) && <pre>{JSON.stringify(components, null, 2)}</pre> }
          
          {components && components.data && (
            <ul>
              {components.data.map((data, index) => (
                <li className={depthClass} key={data.uuid}>
                  <PartDescription quantity={data.quantity} uuid={data.partUuid} verbose={props.verbose} />
                  <div className={depthClass}>
                    {(depth > MAX_DEPTH) ? 
                    (<p className="warning">Heirarchical components have exceeded max depth.</p>) : 
                    (<Configurations uuid={data.uuid} verbose={verbose} depth={depth + 1} />)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Collapse>
      </div>
      );
}

export default ComponentList;