exports.handler = async (event, context) => {
  try {
    // Extract parameters from the request if needed
    const { param1, param2 } = event.queryStringParameters; 

    // Construct the URL for the external API
    const externalApiUrl = `https://ssuowapy4e.execute-api.us-east-1.amazonaws.com/prod/swagger/`;

    // Make the request to the external API
    const response = await fetch(externalApiUrl);
    const data = await response.json();

    // Return the data from the external API
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow CORS for your frontend
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error calling external API:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch data from external API" }),
    };
  }
};