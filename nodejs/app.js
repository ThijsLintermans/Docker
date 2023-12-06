const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const cors = require('cors');
const os = require('os');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'tl',
  host: 'postgres-TL',
  database: 'tldatabase',
  password: 'tlpassword',
  port: 5432,
});

app.use(cors())

app.get("/user", (req, res) => {
  pool.query("SELECT * FROM users LIMIT 1", (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).send("Internal Server Error");
    } else {
      const user = result.rows[0];
      console.log("User retrieved from the database:", user);
      res.send({ name: user.name });
    }
  });
});

app.get("/containerId", (req, res) => {
  const containerId = os.hostname();
  console.log("Container ID:", containerId);
  res.send({ containerId });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
