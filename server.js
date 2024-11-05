import jsonServer from "json-server";

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)

server.use(jsonServer.rewriter({
  '/api/v1/*': '/$1',
}))

router.render = (req, res) => {
  res.jsonp({
    data: res.locals.data,
    success: true,
    page: 0,
    totalPages: Math.ceil(res.locals.data.length / 20),
    total: res.locals.data.length,
    limit: 20
  })
}

server.listen(8080, () => {
  console.log('JSON Server is running')
})
