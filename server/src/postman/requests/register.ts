import { Item } from "postman-collection";
import { API_ENDPOINT } from "../utils/api-endpoint";
import { requestHeaderMultipartFormData } from "../utils/request-header-multipart-form-data";

export const registerRequest = new Item({
  name: "Register user",
  request: {
    header: requestHeaderMultipartFormData,
    url: API_ENDPOINT + "/account/register",
    method: "POST",
    body: {
      mode: "formdata",
      formdata: [
        {
          key: "email",
          value: "example@gmail.com",
        },
        {
          key: "name",
          value: "Vladyslav",
        },
        {
          key: "surname",
          value: "Geyna",
        },
        {
          key: "phone",
          value: "0968863436",
        },
        {
          key: "password",
          value: "this_is_just_an_example_password",
        },
        {
          key: "passwordConfirm",
          value: "this_is_just_an_example_password",
        },
      ],
    },
  },
});
