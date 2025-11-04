import { useState, useEffect } from 'react';
import Configurations from './Configurations.js';
import PartDescription from './PartDescription.js';
import axios from 'axios';
import React, { } from 'react';

// These are all top level machines with an endUnitSerialNo
function MachineList(props) {
      const [machines, setMachines] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      const route = "/.netlify/functions/getMachines";

      const [openDiv, setOpenDiv] = useState(false);

      const handleClick = () => {
          setOpenDiv(!openDiv);
      };

      useEffect(() => {
        const fetchMachines = async () => {
          try {
            const response = await axios.get(route);

            if (response.status === 200) {
              setMachines(response.data);
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
        fetchMachines();
      }, []);

      if (loading) return <div>Loading machines..</div>;
      if (error) return <div>Error: {error.message}</div>;

      return (
        <div className="machines">
          {machines ? 
            (<h3>Here are all of your current machines, you have {Object.keys(machines.data).length}:</h3>) :
            (<h3>You currently do not have any machines</h3>)
          }

          { (props.verbose) && <pre>{JSON.stringify(machines, null, 2)}</pre> }
          
          {machines && machines.data && (
            <ul>
              {machines.data.map((data, index) => (
                // (index <2) && 
                <li>
                <div>
                   <PartDescription uuid={data.partUuid} verbose={props.verbose} prefix={data.endUnitSerialNo} />
                </div>
                {/* <Button
                  sx={{ minWidth: 150, height: 22 }}
                  onClick={handleClick}
                  variant="contained"
                  endIcon={openDiv ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                >
                  {openDiv ? 'Hide Configurations' : 'Show Configurations'}
                </Button>
                <Collapse in={openDiv}> */}
                  <div>
                    <Configurations uuid={data.uuid} verbose={props.verbose} depth="1" />
                  </div>
                {/* </Collapse> */}
                </li> 
            
                )
                )
              }
            </ul>
          )}
        </div>
      );
}

export default MachineList;