exports.handler = async (event, context) => {
  try {
    // Extract parameters from the request if needed
    const { param1, param2 } = event.queryStringParameters; 

    // Construct the URL for the external API
    const API_URL =  process.env.CHRONOS_APP_BASE_URL;
    const API_KEY =  process.env.CHRONOS_API_KEY;

    // Make the request to the external API
    const response = await fetch(`${API_URL}?apiKey=${API_KEY}`); // Example with query parameter
    
    const data = await response.json();

    console.log(JSON.stringify(data));

    // Return the data from the external API
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow CORS for your frontend
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Success!", data: data }),
    };
  } catch (error) {
    console.error("Error calling external API:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch data from external API" }),
    };
  }
};