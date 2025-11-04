
    const { handler } = require('../getConfigurations.js')
    describe('getConfigurations', () => {
        it('should return configurations if a valid UUID is provided', async () => {
            const event = {
                queryStringParameters: { uuid: '864985fe-40fe-41aa-a4d1-f323a5c09898' },
            };

            const response = await handler(event, {});
            const body = JSON.parse(response.body);

            expect(response.statusCode).toBe(200);

        });

        it('should return an error if an invalida UUID is provided', async () => {
            const event = {
            queryStringParameters: { uuid: '864985fe-40fe-41aa-a4d1-f323a5c098fe' },
            };

            const response = await handler(event, {});
            const body = JSON.parse(response.body);

            expect(response.statusCode).toBe(200);
            expect(body.message).toBe('Hello, world!');
        });
    });
