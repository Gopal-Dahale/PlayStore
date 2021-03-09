const gplay = require("google-play-scraper"); // Scraper library
const fs = require("fs"); // File Handling

async function googlePlayAppsListViaSearch(
  searchList,
  priceList,
  maxCount = 250
) {
  console.log("Fetching begins ...");
  maxCount = maxCount > 250 ? 250 : maxCount;
  searchList.forEach(async (term) => {
    priceList.forEach(async (price) => {
      gplay
        .search({
          term: term,
          num: maxCount,
          lang: "en",
          country: "in",
          price: price,
          throttle: 10, // The method will perform batches of 10 requests per second
        })
        .then((res) => {
          console.log("Successful: " + term + " " + price);

          // Write to file
          filePath =
            "Data/Search/" +
            term.toUpperCase().split(" ").join("_") +
            "_" +
            price.toUpperCase() +
            ".json";
          stream = fs.createWriteStream(filePath, { flags: "a" });
          stream.write(JSON.stringify(res));
        })
        .catch((err) => {
          console.log("Error for " + term + " " + price + ": " + err);
        });
      await new Promise((resolve) => setTimeout(() => resolve(), 5000)); // Wait for 5 seconds
    });
  });
}

const main = async () => {
  searchTerms = fs.readFileSync("search_terms.txt", "utf8");
  categories = searchTerms.split(",");
  console.log(categories.length);
  priceList = ["free", "paid"];
  for (let i = 0; i < categories.length; i++) {
    for (let j = 0; j < priceList.length; j++) {
      filePath =
        "Data/Search/" +
        categories[i].toUpperCase().split(" ").join("_") +
        "_" +
        priceList[j].toUpperCase() +
        ".json";
      if (fs.existsSync(filePath)) continue;
      gplay
        .search({
          term: categories[i],
          num: 250,
          lang: "en",
          country: "in",
          price: priceList[j],
          throttle: 10, // The method will perform batches of 10 requests per second
        })
        .then((res) => {
          console.log(
            i.toString() + " Successful: " + categories[i] + " " + priceList[j]
          );
          // Write to file
          stream = fs.createWriteStream(filePath, { flags: "a" });
          stream.write(JSON.stringify(res));
        })
        .catch((err) => {
          console.log(
            "Error for " + categories[i] + " " + priceList[j] + ": " + err
          );
        });
      await new Promise((resolve) => setTimeout(() => resolve(), 10000)); // Wait for 10 seconds
    }
  }
};

main();
