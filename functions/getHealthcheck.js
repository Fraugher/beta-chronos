exports.handler = async (event, context) => {
  try {
    
    const { param1, param2 } = event.queryStringParameters; 

    // Construct the URL for the external API
    const API_URL =  process.env.CHRONOS_API_BASE_URL; // "https://ssuowapy4e.execute-api.us-east-1.amazonaws.com/prod/";
    const API_KEY =  process.env.CHRONOS_API_KEY;

    const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}` // Example for authorization
            //   'Accept': 'application/json',
            //   'Access-Control-Allow-Origin': '*',
            //   "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            //  'X-API-KEY': API_KEY, // Include the API key in the header
              //credentials: 'include'
            }
        });

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: `API request 2 failed: ${response.statusText}` })
            };
        }

    // Make the request to the external API
//    const response = await fetch(`${API_URL}?x-api-key=${API_KEY}`); // Example with query parameter
    
    const data = await response.json();

  
    // Return the data from the external chronos API
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