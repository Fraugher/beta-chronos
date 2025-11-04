    import axios from 'axios';
    jest.mock('axios');
    
    import { render, screen, waitFor } from '@testing-library/react';
    import PartDescription from './PartDescription.js';
    import handler from '../../functions/getPart.js';
    import React, { } from 'react';

    describe('PartDescription', () => {
        beforeEach(() => {
            axios.get = jest.fn(); // Explicitly make axios.get a mock function
        });
        test('should return return a part description when the API call is successful', async () => {
            const expectedJson = {"data":{"uuid":"ec332ad9-f96d-46e2-bdc4-7c9a10419644","name":"Time Machine","version":null,"status":"configuration","unit":"lbs2"}}

            axios.get.mockResolvedValue(expectedJson);
zrw
            render(<PartDescription uuid="ec332ad9-f96d-46e2-bdc4-7c9a10419644" />);
            await waitFor(() => expect(screen.getByText('UUID')).toBeInTheDocument());
            expect(fetch).toHaveBeenCalledTimes(1);
        });
        test('shows error message on API failure', async () => {
            axios.get.mockRejectedValue(new Error('Failed to fetch machines'));
            render(<MachineList />);
            await waitFor(() => expect(screen.getByText('Failed to fetch data from external API')).toBeInTheDocument());
        });
        afterEach(() => {
            jest.restoreAllMocks();
        });
    });