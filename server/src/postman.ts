import fs from "fs";
import { Collection, Header, Item } from "postman-collection";

export const postmanCollection = new Collection({
  info: {
    name: "Auto Sale API",
  },
  item: [],
});

const rawHeaderJsonString =
  "Content-Type:application/json\ncache-control:no-cache\n";

const rawHeaderMultipartFormDataString =
  "Content-Type:multipart/form-data\ncache-control:no-cache\n";

const rawHeadersJson = Header.parse(rawHeaderJsonString);

const rawHeadersMultipartFormData = Header.parse(
  rawHeaderMultipartFormDataString
);

const requestHeaderJson = rawHeadersJson.map((h) => new Header(h));

const requestHeaderMultiPartFormData = rawHeadersMultipartFormData.map(
  (h) => new Header(h)
);

const apiEndpoint = "http://localhost:5000/api";

const getCarAdsRequest = new Item({
  name: "Get all car ads",
  request: {
    header: requestHeaderJson,
    url: apiEndpoint + "/car-ads",
    method: "GET",
  },
});

const getCarBrandsRequest = new Item({
  name: "Get all car brands",
  request: {
    header: requestHeaderJson,
    url: apiEndpoint + "/car-brands",
    method: "GET",
  },
});

const getCarModelsByCarBrandIdRequest = new Item({
  name: "Get all car models by car brand id",
  request: {
    header: requestHeaderJson,
    url: apiEndpoint + "/car-models?carBrandId=${PUT_ID_HERE}",
    method: "GET",
  },
});

const getCarAdById = new Item({
  name: "Get car ad by id",
  request: {
    header: requestHeaderJson,
    url: apiEndpoint + "/car-ads/${PUT_ID_HERE}",
    method: "GET",
  },
});

const registerRequest = new Item({
  name: "Register user",
  request: {
    header: requestHeaderMultiPartFormData,
    url: apiEndpoint + "/account/register",
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
          value: "this_is_just_a_test_password",
        },
        {
          key: "passwordConfirm",
          value: "this_is_just_a_test_password",
        },
      ],
    },
  },
});

const loginRequest = new Item({
  name: "Login user",
  request: {
    header: requestHeaderJson,
    url: apiEndpoint + "/account/login",
    method: "POST",
    body: {
      mode: "raw",
      raw: JSON.stringify({
        email: "example@gmail.com",
        password: "this_is_just_a_test_password",
      }),
    },
  },
});

postmanCollection.items.add(getCarAdsRequest);
postmanCollection.items.add(registerRequest);
postmanCollection.items.add(loginRequest);
postmanCollection.items.add(getCarAdById);
postmanCollection.items.add(getCarBrandsRequest);
postmanCollection.items.add(getCarModelsByCarBrandIdRequest);

const collectionJSON = postmanCollection.toJSON();

export function saveCollection() {
  fs.writeFile(
    "../postman-collection.json",
    JSON.stringify(collectionJSON),
    (err) => {
      if (err) {
        console.log(err);
      }
      console.log("Postman collection saved successfully!");
    }
  );
}
