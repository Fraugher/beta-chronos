    import { handler } from '../getMachines.js';
    import expectedJson from './getMachines.test.json'; 

    describe('getMachines', () => {
        it('should return machines regardless of query string', async () => {
            const event = {
                queryStringParameters: { uuid: '' },
            };

            const response = await handler(event, {});
            const body = JSON.parse(response.data);
            await waitFor(() => {
                expect(response.statusCode).toBe(200);
                expect(body).toEqual(expectedJson);
            });
        });
    });