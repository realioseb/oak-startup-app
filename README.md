# My Startup Progress

## Install

```
yarn install
```

## Environment variables

```
REACT_APP_FACTS_URL=https://uselessfacts.jsph.pl/random.json
REACT_APP_REMOTE_API=http://localhost:8000
```

Create `.env` file and fill it according to the `.env.example` file which is located in the root directory.

## Create production build

```javascript
yarn build // will connect to local storage
```
or
```javascript
yarn build:gql // will connect to gql server using REACT_APP_REMOTE_API
```

## Run production build

```
yarn start:prod
```

## Run development mode and watch file changes

### Launch with local storage

```
yarn start:dev
```

### Launch with gql server

```
yarn start:dev:gql
```

Note that you should have backend service up and running and provide correct url to it using `REACT_APP_REMOTE_API`
