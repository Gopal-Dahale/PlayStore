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

async function suggestions(categories) {
  let suggestionList = [];
  categories.forEach(async (cat) => {
    gplay
      .suggest({
        term: cat,
      })
      .then((res) => {
        suggestionList.push(...res);
      })
      .catch((err) => {
        console.log(err);
      });
    await new Promise((resolve) => setTimeout(() => resolve(), 2000)); // Wait for 2 seconds
  });
  return suggestionList;
}

const main = async () => {
  let categories = []; // Array of categories
  for (cat in gplay.category) {
    categories.push(cat.toLowerCase().split("_").join(" "));
  }
  let s = await suggestions(categories);
  await new Promise((resolve) => setTimeout(() => resolve(), 20000)); // Wait for 20 seconds
  categories = s
    .filter((x) => !categories.includes(x))
    .concat(categories.filter((x) => !s.includes(x)));
  stream = fs.createWriteStream("search_terms.txt", { flags: "a" });
  stream.write(categories.toString());
};

main();
