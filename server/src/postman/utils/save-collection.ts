import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "..", "postman-collection.json");

export const saveCollection = (collection: string) => {
  console.log("Saving...");
  fs.writeFile(filePath, collection, (err) => {
    if (err) {
      console.log("Unable to save postman collection:", err);

      return;
    }
    console.log("Postman collection saved successfully!");
  });
};
