require('dotenv').config()
const express  = require('express');
const db = require('./data/dataConfig')
const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json())
app.use(express.static('public'))


/**Get All To-Do's */
app.get('/posts', async (req, res) => {
  try {
    let client = await db.connect();
    const {rows} =  await client.query('SELECT * FROM todo;')

    res.json(rows)

    client.release();

  } catch (error) {
    console.log(error)
  }
})


/**Add to do item */
app.post('/posts', async (req, res) => {
  try {
    const {title, content} = req.body

    let client = await db.connect();
    const addPost = await client.query('INSERT INTO todo (Title, Content) VALUES($1, $2) RETURNING *;', [title, content])

    res.json(addPost.rows[0])

    client.release();

  } catch (error) {
    console.log(error)
  }
})


/**delete to do */
app.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id

    let client = await db.connect();
    const { rows } = await client.query('DELETE FROM todo WHERE id = $1', [id])

    res.json({message: "To-do item deleted succesfully"})

    client.release();

  } catch (error) {
    console.log(error)
  }
})


/**edit to do */
app.put('/:id', async (req, res)=>{
 try {
   
   const id = req.params.id

   let client = await db.connect();
   let entityToUpdate = await client.query('SELECT * FROM todo WHERE id = $1;', [id])
   
   const title = req.body.title || entityToUpdate.rows[0].title;
   const content = req.body.content || entityToUpdate.rows[0].content;
   
   const update = await client.query('UPDATE todo SET title=$1, content=$2 WHERE id = $3 RETURNING *;', [title, content, id])
   
   res.json(update.rows[0])
   client.release();

 } catch (error) {
   console.log(error)
 }
})

app.listen(PORT,()=> console.log(`Server is running on port ${PORT}`))