import couchbase from 'couchbase'

let cluster
(async () => {
  try {
    const logFunc = log => (log.subsys === 'cccp' && log.severity > 3) && console.warn(log.severity, log.message, log.subsys)
    const options = { username: 'Administrator', password: 'Emergenza', logFunc }
    cluster = new couchbase.Cluster('couchbase://10.0.0.183', options)
    const bucket = cluster.bucket('test')
    const collection = bucket.defaultCollection()
    const getResult = await collection.get('test')
    console.table(getResult.value)
    await cluster.close()
  } catch (err) {
    console.error('message:', err.message)
    err.cause && console.error('code:', err.cause.code)
    await cluster.close()
  }
})()
