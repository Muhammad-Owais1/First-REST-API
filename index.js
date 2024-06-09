const express = require('express')
const users = require('./MOCK_DATA.json')

const app = express()
const PORT = 3000



app.get('/api/users', (req, res) => {
    return res.json(users)
})


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
