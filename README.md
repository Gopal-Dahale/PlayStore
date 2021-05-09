# PlayStore Network Science
We focused on analyzing the apps from the Google Play store that provides a wide range of data features (price, rating, etc.). A network of apps is formed usingthe scraped data from the official play store website and different centrality measures were analyzed. We checked the scale-free nature of the network and evaluated 3network community detection algorithms which led to interesting results. Our findings leverage graph theory and network analysis.

For a more information regarding the project, see the [project report](https://github.com/Gopal-Dahale/PlayStore/tree/main/Report). Not all the data, but some data can be found [here](https://drive.google.com/drive/folders/15LAIw1yWfalFb013H7llwSWIc_NpHKg6?usp=sharing).
## Scraping App Data
Data was scraped using [google-play-scraper](https://github.com/facundoolano/google-play-scraper). `scrape.js` scrapes the data. `search_terms.js` was used to find search terms related to the categories name (`search_terms.txt`) and then `search_scrape.js` was used to scrape the data considering the searched terms. All the scraped app data is stored in `Data` directory.
## App Dataset Formation
`Dataset_formation.ipynb` contains the code to form the dataset of the app data. `Data_Null` directory was created as a supplement. The finl dataset is in `Dataset.csv`.
## Reviews Data Scraping
For review scraping use [this](https://github.com/JoMingyu/google-play-scraper) python package. The code is in `Reviews_Scraping.ipynb`.
## Network Data Structuring
Code is in `Network_data_structuring.ipynb`. A folder `Netowrk_Data` was created in which app data is put along with the name of the reviewers who reviewed the app in json format. A sample file is present in this repo `sample_network_structured_data.json`.
## Network Data Formation
In continuation from the previous step, a file `Reviewers.csv` is created which contains reviewer's name and the corresponding app reviewed. Note the the column `name` can have duplicates. A sample of the data is shown below.
![review](https://user-images.githubusercontent.com/49199003/117569971-cdb32080-b0e5-11eb-8f32-0ec9e0794a2e.PNG)

A `nodes.json` file is created. Edges basic data is created in `Network_data_formation.ipynb` which contains number of reviewers files. Each file represents a reviewer and contains the apps reviewed by him/her in json format. An example file is shown `sample_edge_basic.json`.
## Edge Clique Formation
Using the data obtained from the previous step, we create cliques of the apps reviewed by a particular reviewer(batch-wise). The code is in `Edge_clique_formation.ipynb`. Some reviewer's were skipped who had reviewed more than 46 apps (as the clique size went to approx 2000 edges). Their names are stored in `fails.txt`. I have not considered the apps data of `fails.txt` in network formation because they were taking huge amount of memory and time. A sample file is `sample_edge_clique_formation.json`
## Joining Files
The code for joining all the files obtained from previous step to form 1 file of edges is in `Edge_formation_join_files.ipynb`. Although 1 single file is not created (due to RAM issues); the code creates several json files (batch-wise).
## Network in csv
Earlier, we were using json files but as they take lot of storage, we started to work with csv files. `Network_csv.ipynb` contains the code to form 1 single edges csv file. The final edges file is `Edges.csv` and nodes file is `Dataset.csv`.
## Graph Sampling
Since it was not possible for us to work on such a huge network, we took a sample out of it using [this](https://github.com/Ashish7129/Graph_Sampling) library. The code for sampling is in `shrinkatinator.ipynb` and the sampled network is in `Sampled Graph`.
## Network Analysis
### Original Network
Some analysis done on the original network is present in `Network Analysis Orig.ipynb`.
### Sampled Network
Most of the analysis was done on the sampled network and can be found in `Analysis on Sampled Network.ipynb`. Columns were added to `Dataset.csv` during the analysis is present in `WIP` directory.
