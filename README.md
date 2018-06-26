koa-rest-controller
---

`koa-rest-controller` is a super simple tool to build `Koa.js` controller like `Laravel` controller

## Install
```bash
yarn add koa-rest-controller
```

## Usage
Basically, you can assign an object to get koa-router routes

```js
const rest = require('koa-rest-controller')

const controller = {
  index (req, res) {

  },
  store (req, res) {

  },
  // ...
}

controller({
  resource: 'foo',
  controller
})
```

Or, you can assign nested resource like this
```js
controller({
  resource: ['foo', 'bar'],
  controller
})
```

The path is look like `/foo/:fooId/bar/:id`
