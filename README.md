# nePress

A simple and self-contained blogging platform

## Tech

Powered by node.js, angular2. Self-contained long term storage is based on nedb javascript database engine.

## First configuration

* Edit `config/nepress.json` for a database storage directory.
* Install npm dependencies

  ```
  cd server
  npm install
  ```
  ```
  cd nepress-client
  npm install
  ```
* Setup SSH keys and certificates in `server/cert`

## Start

```
cd server
npm start
```

and

```
cd nepress-client
npm start
```

## Status

Current status of the project: work in progress