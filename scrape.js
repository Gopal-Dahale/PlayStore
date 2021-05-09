// Scraping Google play store data using google-play-scraper

const gplay = require("google-play-scraper"); // Scraper library
const fs = require("fs"); // File Handling

/**
 * Function to fetch apps data via search
 * @param {string[]} searchList - List of search terms
 * @param {string[]} priceList - Prices list. Possibles values: all, free, paid
 * @param {number} maxCount - maximum count of data to fetch
 */
function googlePlayAppsListViaSearch(searchList, priceList, maxCount = 250) {
  maxCount = maxCount > 250 ? 250 : maxCount;
  console.log(maxCount);
  searchList.forEach((term) => {
    priceList.forEach((price) => {
      gplay
        .search({
          term: term,
          num: maxCount,
          lang: "en",
          country: "in",
          price: price,
          throttle: 5, // The method will perform batches of 5 requests per second
        })
        .then((res) => {
          console.log("Successful: " + term + " " + price);

          // Write to file
          filePath =
            "Data/" +
            term.toUpperCase().replace(/ /g, "_") +
            "_" +
            price.toUpperCase() +
            ".json";
          stream = fs.createWriteStream(filePath, { flags: "a" });
          stream.write(JSON.stringify(res));
        })
        .catch((err) => {
          console.log("Error for " + term + " " + price + ": " + err);
        });
    });
  });
}

/**
 *
 * @param {string[]} collections - List of valid collections. See gplay.collection
 * @param {string[]} categories - List of valid categories. See gplay.category
 * @param {number} maxCount - maximum count of data to fetch
 */
async function googlePlayAppsList(collections, categories, maxCount = 500) {
  let stream, filePath;
  for (catKey in categories) {
    for (collnKey in collections) {
      gplay
        .list({
          category: categories[catKey],
          collection: collections[collnKey],
          num: maxCount,
          country: "in",
          lang: "en",
          throttle: 5, // The method will perform batches of 5 requests per second
        })
        .then((res) => {
          console.log("Successful: " + catKey + " " + collnKey);

          // Write to file
          filePath = "Data/" + catKey + "_" + collnKey + ".json";
          stream = fs.createWriteStream(filePath, { flags: "a" }); // Beware of overwriting, use flags carefully
          stream.write(JSON.stringify(res));
        })
        .catch((err) => {
          console.log("Error for " + catKey + " " + collnKey + ": " + err);
        });

      await new Promise((resolve) => setTimeout(() => resolve(), 5000)); // Wait for 5 seconds
    }
  }
}

// Main

let collections = gplay.collection; // Object of collections
let categories = gplay.category; // Object of categories

console.log(collections, Object.keys(collections).length);

for (collection in collections) {
  console.log(collection);
}

console.log(categories, Object.keys(categories).length);

googlePlayAppsList(collections, categories, 2000);
googlePlayAppsListViaSearch(
  (searchList = ["Kids", "Google Cast"]),
  (priceList = ["free", "paid"]),
  2000
);
