const express = require('express')
const fs = require('fs')
const users = require('./MOCK_DATA.json')

const app = express()
const PORT = 3000

app.use(express.urlencoded({extended: false}))

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

.get((req, res) => {
    const id = Number(req.params.id) 
    const user = users.find((user) => user.id === id)
    return res.json(user)
})

.patch((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    const updatedUser = { ...users[index], ...req.body };
    users[index] = updatedUser;
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), () => {
        return res.json(updatedUser);
    });
})
.delete((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    const deletedUser = users.splice(index, 1);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), () => {
        return res.json(deletedUser[0]);
    });
})
 
app.post('/api/users', (req, res) => {
    const body = req.body
    users.push({...body, id: users.length + 1 })
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({status: 'pending'})
    })
}) 



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})