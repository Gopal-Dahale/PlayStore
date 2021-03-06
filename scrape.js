const gplay = require("google-play-scraper"); // Scraper library
const fs = require("fs"); // File Handling
const stream = fs.createWriteStream("Data/data.json", { flags: "a" }); // Beware of overwriting, use flags carefully

function googlePlayAppsList(collections, categories, maxCount = 100) {
  let stream, fileName;
  for (i in categories) {
    for (j in collections) {
      fileName = "Data/" + i + "_" + j + ".json";
      console.log(fileName);
    }
  }

  // gplay
  //   .list({
  //     category: gplay.category.GAME_ADVENTURE,
  //     collection: gplay.collection.TOP_PAID,
  //     num: 10,
  //     country: "in",
  //     lang: "en",
  //     throttle: 10,
  //   })
  //   .then((res) => {
  //     stream.write(JSON.stringify(res));
  //   });
}

let collections = gplay.collection; // Object of collections
let categories = gplay.category; // Object of categories

// These collections are deleted to avoid duplicate data collection
delete collections.TOP_FREE_GAMES;
delete collections.TOP_GROSSING_GAMES;
delete collections.TOP_PAID_GAMES;
delete collections.NEW_PAID_GAMES;
delete collections.NEW_FREE_GAMES;

// console.log(collections, Object.keys(collections).length);

// These categories are deleted to avoid duplicate data collection
delete categories.APPLICATION;
delete categories.GAME;
delete categories.FAMILY;

// console.log(categories, Object.keys(categories).length);

googlePlayAppsList(collections, categories, 500);
