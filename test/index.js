const assert = require('assert')
const rest = require('..')
const index = (ctx) => {}
const store = (ctx) => {}
const edit = (ctx) => {}
const update = (ctx) => {}
const create = (ctx) => {}
const destroy = (ctx) => {}

describe('Test controller builder', () => {
  it('Test builder with string resource and single controller', () => {
    const router = rest({ controller: { index }, resource: 'foo' })

    assert.equal(router.router.stack.length, 1)
    assert.equal(router.router.stack[0].path, '/foo')
    assert.deepEqual(router.router.stack[0].methods, ['HEAD', 'GET'])
  })

  it('Test builder with string resource and multiple controllers', () => {
    const router = rest({
      controller: {
        index,
        store,
        edit,
        update,
        create,
        destroy
      },
      resource: 'foo'
    })

    router.router.stack.forEach(route => {
      const name = route.stack[0].name
      const routePath = route.path
      const routeMethods = route.methods
      const map = {
        index: {
          path: '/foo',
          methods: ['HEAD', 'GET']
        },
        store: {
          path: '/foo',
          methods: ['POST']
        },
        edit: {
          path: '/foo/:id/edit',
          methods: ['HEAD', 'GET']
        },
        update: {
          path: '/foo/:id',
          methods: ['PUT']
        },
        create: {
          path: '/foo/create',
          methods: ['HEAD', 'GET']
        },
        destroy: {
          path: '/foo/:id',
          methods: ['DELETE']
        }
      }
      const { path, methods } = map[name]

      assert.equal(path, routePath)
      assert.deepEqual(methods, routeMethods)
    })
  })

  it('Test builder with array resource', () => {
    const router = rest({ controller: { index }, resource: ['foo', 'bar'] })

    assert.equal(router.router.stack.length, 1)
    assert.equal(router.router.stack[0].path, '/foo/:fooId/bar')
    assert.deepEqual(router.router.stack[0].methods, ['HEAD', 'GET'])
  })

  it('Test builder with array resource and multiple controllers', () => {
    const router = rest({
      controller: {
        index,
        store,
        edit,
        update,
        create,
        destroy
      },
      resource: ['foo', 'bar']
    })

    router.router.stack.forEach(route => {
      const name = route.stack[0].name
      const routePath = route.path
      const routeMethods = route.methods
      const map = {
        index: {
          path: '/foo/:fooId/bar',
          methods: ['HEAD', 'GET']
        },
        store: {
          path: '/foo/:fooId/bar',
          methods: ['POST']
        },
        edit: {
          path: '/foo/:fooId/bar/:id/edit',
          methods: ['HEAD', 'GET']
        },
        update: {
          path: '/foo/:fooId/bar/:id',
          methods: ['PUT']
        },
        create: {
          path: '/foo/:fooId/bar/create',
          methods: ['HEAD', 'GET']
        },
        destroy: {
          path: '/foo/:fooId/bar/:id',
          methods: ['DELETE']
        }
      }
      const { path, methods } = map[name]

      assert.equal(path, routePath)
      assert.deepEqual(methods, routeMethods)
    })
  })

  it('Test builder with undefined resource', () => {
    const router = rest({ controller: { index } })

    assert.equal(router.router.stack.length, 1)
    assert.equal(router.router.stack[0].path, '/')
    assert.deepEqual(router.router.stack[0].methods, ['HEAD', 'GET'])
  })

  it('Test builder with undefined controller', () => {
    const router = rest()

    assert.equal(router.router.stack.length, 0)
  })
})
