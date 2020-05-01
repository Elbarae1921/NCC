# NCC
[National Catastrophe Center](https://nationalcatastrophecenter.herokuapp.com/)


# Installation

```npm install```

```npm run client install```

# Usage

create a `.env` following the same structure in `.env_sample` and provide your environment variables there.
then:

either <br />
```npm run dev```<br />
or<br />
```npm start``` and ```npm run client``` (on a seperate command line)

access the main app at `http://localhost:3000` and the api at `http://localhost:5000/api`.

Ultimately you can run
```npm run build```
to create a build folder, then run `node server.js` in the root directory, then you can access the app at `http://localhost:5000/` and the api at `/api` since the server redirects every route that isn't /api to the react build folder.