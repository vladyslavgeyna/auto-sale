import { Item } from "postman-collection";
import { API_ENDPOINT } from "../utils/api-endpoint";
import { requestHeaderJson } from "../utils/request-header-json";

export const getCarModelsByCarBrandIdRequest = new Item({
  name: "Get all car models by car brand id",
  request: {
    header: requestHeaderJson,
    url: API_ENDPOINT + "/car-models?carBrandId=${PUT_ID_HERE}",
    method: "GET",
  },
});
