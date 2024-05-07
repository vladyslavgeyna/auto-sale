import { Item } from "postman-collection";
import { API_ENDPOINT } from "../utils/api-endpoint";
import { requestHeaderJson } from "../utils/request-header-json";

export const getCarAdsRequest = new Item({
  name: "Get all car ads",
  request: {
    header: requestHeaderJson,
    url: API_ENDPOINT + "/car-ads",
    method: "GET",
  },
});
