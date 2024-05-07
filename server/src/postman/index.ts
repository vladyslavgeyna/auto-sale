import { Collection } from "postman-collection";
import { requests } from "./requests";
import { saveCollection } from "./utils/save-collection";

const postmanCollection = new Collection({
  info: {
    name: "Auto Sale API",
  },
  item: [],
});

requests.forEach((request) => postmanCollection.items.add(request));

const collectionJSON = postmanCollection.toJSON();

saveCollection(JSON.stringify(collectionJSON));
