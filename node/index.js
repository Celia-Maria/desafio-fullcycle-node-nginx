const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;


const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const connection = mysql.createConnection(config);

let people = [];

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err);
    return;
  }

  const names = [];
  for (let i = 0; i < 3; i++) {
    const random = Math.floor(Math.random() * 10000);
    names.push([`Fullcycle-${random}`]);
  }

const insertSql = 'INSERT INTO people(name) VALUES ?';

connection.query(insertSql, [names], err => {
  if (err) {
    console.error('Erro no INSERT:', err);
    return;
  }

  const selectSql = 'SELECT name FROM people';

  connection.query(selectSql, (err, results) => {
    if (err) {
      console.error('Erro no SELECT:', err);
      return;
    }

    people = results.map(row => row.name);
  });
});

});

app.get('/', (req, res) => {
  let list = '<ul>';
  people.forEach(name => {
    list += `<li>${name}</li>`;
  });
  list += '</ul>';

  res.send(`
    <h1>Full Cycle Rocks!</h1>
    ${list}
  `);
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
