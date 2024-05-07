import { Header } from "postman-collection";

const rawHeaderJsonString =
  "Content-Type:application/json\ncache-control:no-cache\n";

const rawHeadersJson = Header.parse(rawHeaderJsonString);

export const requestHeaderJson = rawHeadersJson.map((h) => new Header(h));
