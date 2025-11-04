    import axios from 'axios';
    jest.mock('axios');
    
    import { render, screen, waitFor } from '@testing-library/react';
    import MachineList from './MachineList.js';
    import Configurations from './Configurations.js';
    import PartDescription from './PartDescription.js';
    import handler from '../../functions/getMachines.js';
    import React, { } from 'react';
       
    import expectedJson from './getMachines.test.json'; 
    
    jest.mock('./Configurations.js', () => {
        return function MockConfigurations(props) {
            return <div data-testid="configurations" {...props} />;
        };
    });

    describe('MachineList', () => {
        beforeEach(() => {
            axios.get = jest.fn(); // Explicitly make axios.get a mock function
        });
        test('should return return a list of machines when the API call is successful', async () => {
            axios.get.mockResolvedValue(expectedJson);
            // const event = {
            //     queryStringParameters: { uuid: '' },
            // };
            // const result = await handler(event,{});

            render(<MachineList />);
            await waitFor(() => expect(screen.getByText('00001')).toBeInTheDocument());
            expect(axios.get).toHaveBeenCalledTimes(21); // well it has to make CORS, so it will be like 43
        });
        afterEach(() => {
            jest.restoreAllMocks();
        });
    });