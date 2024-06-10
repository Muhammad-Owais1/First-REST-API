const express = require('express')
const users = require('./MOCK_DATA.json')

const app = express()
const PORT = 3000

app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `
    res.send(html)
})


app.get('/api/users', (req, res) => {
    return res.json(users)
})

app.route('/api/users/:id')

.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id) 
    const user = users.find((user) => user.id === id)
    return res.json(user)
})

.patch((req, res) => {
    return res.json({status: 'pending'})
})
.delete((req, res) => {
    return res.json({status: 'pending'})
})

app.post('/api/users', (req, res) => {
    return res.json({status: 'pending'})
})



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
// *