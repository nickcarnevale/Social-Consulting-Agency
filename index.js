const express = require('express');
const app = express();
const port = 3001;

const pgp = require('pg-promise')();
const db = pgp('postgres://dnjkzflf:mNHGBAGJPlRDVCxwaEeIsA6dpGNcMLCb@dumbo.db.elephantsql.com/dnjkzflf');

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
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

// Endpoint to add a new outcome
app.post('/outcomes', async (req, res) => {
    try {
        const { name, stakeholder, stakeholderDescription, scale, indicator, proxy, proxyDescription, value, euroValue, reportName, reportLink } = req.body;
        const outcome = await db.one('INSERT INTO outcomes (name, stakeholder, stakeholderDescription, scale, indicator, proxy, proxyDescription, value, euroValue, reportName, reportLink) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *', [name, stakeholder, stakeholderDescription, scale, indicator, proxy, proxyDescription, value, euroValue, reportName, reportLink]);
        res.json(outcome);
    } catch (err) {
        res.json({ error: err.message || err });
    }
});

// Endpoint to update an existing outcome
app.put('/outcomes/:id', async (req, res) => {
  const id = req.params.id;
  const { name, stakeholder, stakeholderDescription, scale, indicator, proxy, proxyDescription, value, euroValue, reportName, reportLink} = req.body;

  try {
      await db.none('UPDATE outcomes SET name=$1, stakeholder=$2, stakeholderDescription=$3, scale=$4, indicator=$5, proxy=$6, proxyDescription=$7, value=$8, euroValue=$9, reportName=$10, reportLink=$11 WHERE id=$12',
          [name, stakeholder, stakeholderDescription, scale, indicator, proxy, proxyDescription, value, euroValue,reportName, reportLink, id]);
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
