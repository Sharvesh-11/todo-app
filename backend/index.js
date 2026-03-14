const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/todos', (req, res) => {
  db.all('SELECT * FROM todos', [], (err, rows) => {
    res.json(rows);
  });
});

app.post('/todos', (req, res) => {
  const { title } = req.body;
  db.run('INSERT INTO todos (title, done) VALUES (?, ?)', [title, 0], function () {
    res.json({ id: this.lastID, title, done: 0 });
  });
});

app.delete('/todos/:id', (req, res) => {
  db.run('DELETE FROM todos WHERE id = ?', [req.params.id], () => {
    res.json({ success: true });
  });
});

app.listen(5000, () => console.log('Backend running on port 5000'));
