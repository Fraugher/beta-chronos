exports.handler = async (event, context) => {
  try {
    // Extract parameters from the request if needed
    const { param1, param2 } = event.queryStringParameters; 

    // Construct the URL for the external API
    const API_URL =  process.env.CHRONOS_APP_BASE_URL;
    const API_KEY =  process.env.CHRONOS_API_KEY;


    const response = await fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`, // Or other authentication method
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: `API request failed: ${response.statusText}` })
            };
        }

    // Make the request to the external API
//    const response = await fetch(`${API_URL}?x-api-key=${API_KEY}`); // Example with query parameter
    
    const data = await response.json();

  
    // Return the data from the external API
      return {
          statusCode: 200,
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*' // Allow CORS for all origins, or specify a domain
          },
          body: JSON.stringify(data)
      };
    } 
    catch (error) {
        console.error('Error in serverless function:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};