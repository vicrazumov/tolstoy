// params: { user, traceId }

const service = {
  create (data, params) {
    console.log('CREATE', params)
    return { id: `${Math.floor(Math.random() * 9) + 1}` }
  },
  update (id, data, params) {
    console.log('UPDATE', params)
  },
  remove (id, params) {
    console.log('REMOVE', params)
  },
}

function f1({ data, params }) {
  console.log('f1 starts here')

  const item = service.create({ ...data, x: 1 })
  // const item = service.create({ ...data, x: 1 }, { user: params.user, traceId: params.traceId })

  service.update(item.id, { y: 2 })
  // service.update(item.id, { y: 2 }, { user: params.user, traceId: params.traceId })

  service.remove(item.id)
  // service.remove(item.id, { user: params.user, traceId: params.traceId })

  console.log('f1 ends here')
}

f1({ data: { a: 1, b: 2 }, params: { user: { id: 'userId', traceId: 'traceId' } } })

// complications:
// 1. non-destructured context
// 2. already has params
// 3. multiple calls per hook (how to handle user: params.user)
// 4. name collisions. safe:
//    a. calls of method
//    b. no params field
//    c. has params field, it is object and it doesn't have user and traceId