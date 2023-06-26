const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;
const pgp = require('pg-promise')();
const db = pgp('postgres://dnjkzflf:mNHGBAGJPlRDVCxwaEeIsA6dpGNcMLCb@dumbo.db.elephantsql.com/dnjkzflf');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/build')));

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});

// Endpoint to register a new user
app.post('/users/register', async (req, res) => {
    console.log(req.body);  // Add this line
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);  // Hash the password
        const user = await db.one('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, hashedPassword]);
        res.json({ message: "User registered successfully", user });
    } catch (err) {
        res.json({ error: err.message || err });
    }
});

// Endpoint to login a user
app.post('/users/login', async (req, res) => {
    console.log(req.body);  // Add this line
    try {
        const { email, password } = req.body;
        const user = await db.one('SELECT * FROM users WHERE email = $1', [email]);
        if (user && await bcrypt.compare(password, user.password)) {  // Check the password
            const token = jwt.sign({ id: user.id, email: user.email }, 'bG9jYWxob3N0OjMwMDE=', { expiresIn: '1h' });  // Generate a token
            res.json({ message: "Logged in successfully", token });
        } else {
            res.json({ error: "Invalid email or password" });
        }
    } catch (err) {
        res.json({ error: err.message || err });
    }
});


// Endpoint to get all outcomes
app.get('/outcomes', async (req, res) => {
    try {
        const outcomes = await db.any('SELECT * FROM outcomes');
        res.json(outcomes);
    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).json({ error: 'Database Error' });
    }
});

// Endpoint to get a single outcome
app.get('/outcomes/:id', async (req, res) => {
    try {
        const id = req.params.id;  // Extract the id from the request parameters
        const outcome = await db.one('SELECT * FROM outcomes WHERE id = $1', id);
        res.json(outcome);
    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).json({ error: 'Database Error' });
    }
});

// Endpoint to add a new outcome
app.post('/outcomes', async (req, res) => {
    try {
        const { name, nombreEspanol, stakeholder, stakeholderDescription, scale, indicator, proxy, proxyDescription, value, euroValue, reportName, reportLink } = req.body;
        const outcome = await db.one('INSERT INTO outcomes (name, nombreEspanol, stakeholder, stakeholderDescription, scale, indicator, proxy, proxyDescription, value, euroValue, reportName, reportLink) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *', [name, nombreEspanol, stakeholder, stakeholderDescription, scale, indicator, proxy, proxyDescription, value, euroValue, reportName, reportLink]);
        res.json(outcome);
    } catch (err) {
        res.json({ error: err.message || err });
    }
});

// Endpoint to update an existing outcome
app.put('/outcomes/:id', async (req, res) => {
  const id = req.params.id;
  const { name, nombreEspanol, stakeholder, stakeholderDescription, scale, indicator, proxy, proxyDescription, value, euroValue, reportName, reportLink} = req.body;

  try {
      await db.none('UPDATE outcomes SET name=$1, nombreEspanol=$2, stakeholder=$3, stakeholderDescription=$4, scale=$5, indicator=$6, proxy=$7, proxyDescription=$8, value=$9, euroValue=$10, reportName=$11, reportLink=$12 WHERE id=$13',
          [name, nombreEspanol, stakeholder, stakeholderDescription, scale, indicator, proxy, proxyDescription, value, euroValue,reportName, reportLink, id]);
      res.status(200).json({ status: 'success', message: 'Outcome updated' });
  } catch (error) {
      console.error('ERROR:', error);
      res.status(500).json({ error: 'Database Error' });
  }
});

// Endpoint to delete an outcome
app.delete('/outcomes/:id', async (req, res) => {
  const id = req.params.id;
  console.log(`Attempting to delete outcome with id ${id}`);

  try {
      const result = await db.result('DELETE FROM outcomes WHERE id=$1', id);
      if (result.rowCount === 0) {
          res.status(404).json({ status: 'failure', message: 'Outcome not found' });
      } else {
          res.status(200).json({ status: 'success', message: 'Outcome deleted' });
      }
  } catch (error) {
      console.error('ERROR:', error);
      res.status(500).json({ error: 'Database Error' });
  }
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

