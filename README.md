# The official website of the Benedictine monastery in Horné Orešany

The official website of the Benedictine monastery in Horné Orešany written in
[next.js](https://nextjs.org/).

## General requirements

Make sure you have [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed.

## Deployment

Currently the website is hosted via [Google Cloud](https://cloud.google.com/).

To deploy the app run the following:

```sh
$ gcloud app deploy --no-promote -v <tag>
```

## Development

Firstly, install the app dependencies:

```
$ npm install
```

Create `.env` file and set the following variables:

```
SANITY_PROJECT_ID="<PROJECT_ID>"
SANITY_DATASET="<DATASET>"
```

To build and serve the app run:

```
$ npm run dev
```
