import { Header } from "postman-collection";

const rawHeaderMultipartFormDataString =
  "Content-Type:multipart/form-data\ncache-control:no-cache\n";

const rawHeadersMultipartFormData = Header.parse(
  rawHeaderMultipartFormDataString
);

export const requestHeaderMultipartFormData = rawHeadersMultipartFormData.map(
  (h) => new Header(h)
);
