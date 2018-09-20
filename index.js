const Router = require('koa-router')
const _ = require('lodash')

module.exports = ({ resource, controller, routeMiddleware = {}, prefix, middleware } = {}) => {
  const defaultResource = _.defaultTo(resource, [])
  const resourceController = _.defaultTo(controller, {})
  const resourceGroup = _.isArray(defaultResource) ? defaultResource : [defaultResource]
  const routePrefix = _.join(
    _.flattenDeep(
      _.map(
        resourceGroup,
        (name, index) => _.size(resourceGroup) === (index + 1)
          ? name : [
            name,
            `:${_.camelCase(`${name}Id`)}`
          ]
      )
    ),
    '/'
  )

  const router = new Router()

  if (prefix) {
    router.prefix(prefix)
  }

  if (middleware) {
    router.use(middleware)
  }

  const routes = {
    show: `/${routePrefix}/:id`.replace(/\/+/, '/'),
    index: `/${routePrefix}`.replace(/\/+/, '/'),
    update: `/${routePrefix}/:id`.replace(/\/+/, '/'),
    edit: `/${routePrefix}/:id/edit`.replace(/\/+/, '/'),
    create: `/${routePrefix}/create`.replace(/\/+/, '/'),
    destroy: `/${routePrefix}/:id`.replace(/\/+/, '/'),
    store: `/${routePrefix}`.replace(/\/+/, '/')
  }

  if (resourceController.show) {
    if (routeMiddleware.all || routeMiddleware.show) {
      router.get(routes.show, routeMiddleware.all || routeMiddleware.show, resourceController.show)
    } else {
      router.get(routes.show, resourceController.show)
    }
  }

  if (resourceController.index) {
    if (routeMiddleware.all || routeMiddleware.index) {
      router.get(routes.index, routeMiddleware.all || routeMiddleware.index, resourceController.index)
    } else {
      router.get(routes.index, resourceController.index)
    }
  }

  if (resourceController.update) {
    if (routeMiddleware.all || routeMiddleware.update) {
      router.put(routes.update, routeMiddleware.all || routeMiddleware.update, resourceController.update)
    } else {
      router.put(routes.update, resourceController.update)
    }
  }

  if (resourceController.edit) {
    if (routeMiddleware.all || routeMiddleware.edit) {
      router.get(routes.edit, routeMiddleware.all || routeMiddleware.edit, resourceController.edit)
    } else {
      router.get(routes.edit, resourceController.edit)
    }
  }

  if (resourceController.create) {
    if (routeMiddleware.all || routeMiddleware.create) {
      router.get(routes.create, routeMiddleware.all || routeMiddleware.create, resourceController.create)
    } else {
      router.get(routes.create, resourceController.create)
    }
  }

  if (resourceController.destroy) {
    if (routeMiddleware.all || routeMiddleware.destroy) {
      router.delete(routes.destroy, routeMiddleware.all || routeMiddleware.destroy, resourceController.destroy)
    } else {
      router.delete(routes.destroy, resourceController.destroy)
    }
  }

  if (resourceController.store) {
    if (routeMiddleware.all || routeMiddleware.store) {
      router.post(routes.store, routeMiddleware.all || routeMiddleware.store, resourceController.store)
    } else {
      router.post(routes.store, resourceController.store)
    }
  }

  return router.routes()
}
