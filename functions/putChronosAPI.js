import { handleError } from './errorHandler.js';

export async function putChronosAPI (route, id, requestBody) {
  const useRoute = route.replace("{uuid}", id);
  const API_URL =  encodeURI(process.env.CHRONOS_API_BASE_URL + useRoute);
  const API_KEY =  process.env.CHRONOS_API_KEY;
  
  let code = 400;
  let jsonBody = { error: "An unexpected error occurred." };

  try {
    const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-API-KEY': API_KEY, 
            },
            body: requestBody
        });

    const data = await response.json();
    console.log("returned =" + JSON.stringify(data))

    if ("uuid" in data) { // successful
      console.log("HAS UUID");
      code = 200;
      jsonBody = data;
    }
   else if (("success" in data) && (!data.success)) {
        console.log("HAS SUCCESS is FALSE");
        console.error("Malformed request in serverless putChronosAPI with ok response:");
        jsonBody = {error: "Malformed request in serverless putChronosAPI with ok response" };
    }
    else {
        console.log("HAS OTHER JSON ERROR");
        console.error("Error in serverless putChronosAPI with ok response");
        jsonBody = { error: "Error in serverless putChronosAPI with ok response" };
    };
  } 
  catch (error) {
    console.log("HAS SERVER ERROR");
    console.error("Error in serverless putChronosAPI:", error);
    code = 400;
    jsonBody = { error: error.message || "An unexpected error occurred." };
  }
  finally {
    return {
        statusCode: code, 
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "PUT, GET, POST",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonBody),
    };
  }
};