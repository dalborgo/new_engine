import couchbase from 'couchbase'

const cluster = new couchbase.Cluster('couchbase://localhost', {
  username: 'Administrator',
  password: 'Emergenza',
})

const bucket = cluster.bucket('test')

const collection = bucket.defaultCollection()

const getByKey = async key => {
  try {
    const result = await collection.get(key)
    console.log('Get Result: ')
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}

/*
getByKey('test').then(res => {
  console.log(res)
}).catch(err => {
  console.error(err.message)
})
*/
