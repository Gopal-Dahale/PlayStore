// Get suggested search terms

const gplay = require("google-play-scraper"); // Scraper library
const fs = require("fs"); // File Handling

/**
 * Function to fetch suggested search terms given the categories
 * @param {string[]} categories
 * @returns An array of strings containing the suggested search terms
 */
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
  let s = await suggestions(categories); // Fetch suggested terms
  await new Promise((resolve) => setTimeout(() => resolve(), 20000)); // Wait for 20 seconds

  // Write to file
  categories = s
    .filter((x) => !categories.includes(x))
    .concat(categories.filter((x) => !s.includes(x)));
  stream = fs.createWriteStream("search_terms.txt", { flags: "a" });
  stream.write(categories.toString());
};

main();
