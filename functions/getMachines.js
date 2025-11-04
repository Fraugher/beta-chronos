import { getChronosAPI } from './getChronosAPI.js';

export const handler = async (event, context) => {
    const uuid = event.queryStringParameters.uuid ?? ""; // a pattern for all apis even if they don't user a uuid
    const route = "api/configs/children";
    const response = await getChronosAPI(route,uuid);
    return response;
};