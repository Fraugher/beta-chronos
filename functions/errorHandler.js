export const handleError = (error, info) => {
    console.error(`Error calling external API (${info}):`, error);
    return {
      statusCode: 500,
      headers: {
          "Access-Control-Allow-Origin": "*", // Allow CORS for your frontend
          "Access-Control-Allow-Methods": "GET",
          "Content-Type": "application/json",
        },
      body: JSON.stringify({ error: `Failed to fetch data from external API (${info})` }),
    };
};