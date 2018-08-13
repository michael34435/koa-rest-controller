koa-rest-controller ![build](https://api.travis-ci.org/michael34435/koa-rest-controller.svg?branch=master)
---

`koa-rest-controller` is a super simple tool to build `Koa.js` controller like `Laravel` controller

## Requirement
* node.js >= 8

## Install
```bash
yarn add koa-rest-controller
```

## Usage
Basically, you can assign an object to get koa-router routes

```js
const rest = require('koa-rest-controller')

const controller = {
  index (ctx) {

  },
  store (ctx) {

  },
  // ...
}

rest(
  {
    resource: 'foo',
    controller
  }
)
```

Or, you can assign nested resource like this
```js
rest(
  {
    resource: ['foo', 'bar'],
    controller
  }
)
```

The path looks like this `/foo/:fooId/bar/:id`

|key|description|type|
|---|---|---|
|resource|Route resources, it should be an array or a string.|string or array |
|controller|An object to define CRUD like Laravel project.|object|
|routeMiddleware|An object to define CRUD middleware like Laravel project.|object|
|prefix|Add prefix to all routes|string|
|middleware|Add koa middleware to all routes|function||
