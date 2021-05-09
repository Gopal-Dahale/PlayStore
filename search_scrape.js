// Scrape data using suggested terms

const gplay = require("google-play-scraper"); // Scraper library
const fs = require("fs"); // File Handling

const main = async () => {
  searchTerms = fs.readFileSync("search_terms.txt", "utf8"); // open the search terms file
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

      // Fetch data from suggested search terms
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
