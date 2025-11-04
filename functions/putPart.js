import { putChronosAPI } from './putChronosAPI.js';

exports.handler = async function (event, context) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ message: 'CORS pre-flight successful' }),
    };
  }

  const uuid = event.queryStringParameters.uuid;

  const requestBody = JSON.parse(event.body);

  // right now unit and part Status are the only things that can be changed
  const unit = requestBody.unit;
  const partStatus = requestBody.status;
  console.log("unit = " + unit);
  console.log("partStatus = " + partStatus);

  const newJson = (partStatus) ? 
    `{"unit" : "${unit}", "status" : "${partStatus}"}` :
    `{"unit" : "${unit}"}`;
    ;
  
  const route = "api/parts/{uuid}";

  jsonData = newJson.replace(/\\/g, ''); 
  try {
    const apiResponse = await putChronosAPI(route, uuid, newJson);
   // console.log("Received from Chronos put =" + JSON.stringify(apiResponse));
    return apiResponse;
  } 
  catch (error) {
    console.error("Error in serverless putPart:", error);
    return {
        statusCode: 500, 
        body: JSON.stringify({ error: error.message || "An unexpected error occurred." }),
    };
  }
};