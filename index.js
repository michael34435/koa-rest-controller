const Router = require('koa-router')
const _ = require('lodash')

module.exports = ({ resource, controller } = {}) => {
  const defaultResource = _.defaultTo(resource, [])
  const resourceController = _.defaultTo(controller, {})
  const resourceGroup = _.isArray(defaultResource) ? defaultResource : [defaultResource]
  const prefix = _.join(
    _.flattenDeep(
      _.map(
        resourceGroup,
        (name, index) => {
          if (_.size(resourceGroup) === (index + 1)) {
            return name
          } else {
            return [
              name,
              `:${_.camelCase(`${name}Id`)}`
            ]
          }
        }
      )
    ),
    '/'
  )

  const router = new Router()

  if (resourceController.show) {
    router.get(`/${prefix}/:id`.replace(/\/{1,}/, '/'), resourceController.show)
  }

  if (resourceController.index) {
    router.get(`/${prefix}`.replace(/\/{1,}/, '/'), resourceController.index)
  }

  if (resourceController.update) {
    router.put(`/${prefix}/:id`.replace(/\/{1,}/, '/'), resourceController.update)
  }

  if (resourceController.edit) {
    router.get(`/${prefix}/:id/edit`.replace(/\/{1,}/, '/'), resourceController.edit)
  }

  if (resourceController.create) {
    router.get(`/${prefix}/create`.replace(/\/{1,}/, '/'), resourceController.create)
  }

  if (resourceController.destroy) {
    router.delete(`/${prefix}/:id`.replace(/\/{1,}/, '/'), resourceController.destroy)
  }

  if (resourceController.store) {
    router.post(`/${prefix}`.replace(/\/{1,}/, '/'), resourceController.store)
  }

  return router.routes()
}
