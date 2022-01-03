const https = require('https')
require('dns')

const TARGET_URL = 'https://example.com'

const makeRequest = () => new Promise(resolve => {
    const req = https.request(TARGET_URL)
    req.on('response', res => {
        res.on('data', () => {})
        res.on('end', resolve)
    })
    req.end()
})

exports.handler = async () => {
    await makeRequest()
    return { done: true }
}
