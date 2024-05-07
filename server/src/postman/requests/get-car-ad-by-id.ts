import { Item } from "postman-collection";
import { API_ENDPOINT } from "../utils/api-endpoint";
import { requestHeaderJson } from "../utils/request-header-json";

export const getCarAdById = new Item({
  name: "Get car ad by id",
  request: {
    header: requestHeaderJson,
    url: API_ENDPOINT + "/car-ads/${PUT_ID_HERE}",
    method: "GET",
  },
});
