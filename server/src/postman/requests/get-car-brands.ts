import { Item } from "postman-collection";
import { API_ENDPOINT } from "../utils/api-endpoint";
import { requestHeaderJson } from "../utils/request-header-json";

export const getCarBrandsRequest = new Item({
  name: "Get all car brands",
  request: {
    header: requestHeaderJson,
    url: API_ENDPOINT + "/car-brands",
    method: "GET",
  },
});
