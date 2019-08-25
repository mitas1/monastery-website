# The official website of the Benedictine monastery in Horné Orešany

The official website of the Benedictine monastery in Horné Orešany written in
[next.js](https://nextjs.org/).

## General requirements

Make sure you have [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed.

## Development

To install the dependencies:

```sh
$ npm install
```

To build and serve the site run:

```sh
$ npm run dev
```

## Deployment

Currently the website is hosted via [netlify.com](https://www.netlify.com/).

To export the site run the following:

```sh
$ npm run export
```

This command will create `out` directory. Read more about the static export [here](https://nextjs.org/docs/#static-html-export).

## Development

To install the dependencies, type the following:

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
