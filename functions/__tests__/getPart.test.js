    import { handler } from '../getPart.js';

    describe('getPart', () => {
        it('should return part if a valid UUID is provided', async () => {
            const event = {
                queryStringParameters: { uuid: 'ec332ad9-f96d-46e2-bdc4-7c9a10419644' },
            };

                const response = await handler(event, {});
                console.log(response);
                const body = JSON.parse(response.body);
                const expectedJson = {"data":{"uuid":"ec332ad9-f96d-46e2-bdc4-7c9a10419644","name":"Time Machine","version":null,"status":"configuration","unit":"lbs2"}}

                expect(response.statusCode).toBe(200);
                expect(body).toEqual(expectedJson);
        });

        it('should return an error if an invalid UUID is provided', async () => {
            const event = {
            queryStringParameters: { uuid: '864985fe-40fe-41aa-a4d1-f323a5c098fe' }, //bogus number
            };

            const response = await handler(event, {});
            const body = JSON.parse(response.body);
            const expectedResponse = { "error": "Part not found" }

            expect(response.statusCode).toBe(expectedResponse);
            expect(body.message).toEqual(expectedResponse);
        });
    });
