import { getChronosAPI } from './getChronosAPI.js';

exports.handler = async (event, context) => {
    const uuid = event.queryStringParameters.uuid ?? ""; 
    const route = "api/parts/{uuid}/allowable-statuses";
    return await getChronosAPI(route,uuid);
};
