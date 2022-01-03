process.env.CONSOLE_DEBUG = 'true'

const start = Date.now()
require('./src/tracing')
console.log('end', Date.now() - start)

const { handler } = require('./src/index')

const run = async () => {
  const result = await handler()
  console.log({ result })
  await global.spanProcessor?.forceFlush()
}

run()
