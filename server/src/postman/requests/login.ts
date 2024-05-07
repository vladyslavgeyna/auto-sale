import { Item } from "postman-collection";
import { API_ENDPOINT } from "../utils/api-endpoint";
import { requestHeaderJson } from "../utils/request-header-json";

export const loginRequest = new Item({
  name: "Login user",
  request: {
    header: requestHeaderJson,
    url: API_ENDPOINT + "/account/login",
    method: "POST",
    body: {
      mode: "raw",
      raw: JSON.stringify({
        email: "example@gmail.com",
        password: "this_is_just_an_example_password",
      }),
    },
  },
});
