const express = require('express');
const logger = require('morgan');
const app = express();
const port = 3000;

app.use(express.json());

// Logger middleware
app.use(logger('combined'));

let issues = [];

// Create an issue
app.post('/issues', (req, res) => {
  const issue = req.body;
  issue.id = issues.length + 1;
  issues.push(issue);
  res.status(201).send(issue);
});

// View all issues
app.get('/issues', (req, res) => {
  res.send(issues);
});

// View a single issue
app.get('/issues/:id', (req, res) => {
  const issue = issues.find(i => i.id === parseInt(req.params.id));
  if (!issue) return res.status(404).send(`Issue with ID : ${req.params.id} not found`);
  res.send(issue);
});

// Update an issue
app.put('/issues/:id', (req, res) => {
  const issue = issues.find(i => i.id === parseInt(req.params.id));
  if (!issue) return res.status(404).send(`Issue with ID : ${req.params.id} not found`);

  Object.assign(issue, req.body);
  res.send(issue);
});

// Delete an issue
app.delete('/issues/:id', (req, res) => {
  const issueIndex = issues.findIndex(i => i.id === parseInt(req.params.id));
  if (issueIndex !== -1) issues.splice(issueIndex, 1);
  res.status(200).send('Issue deleted');
});

app.listen(port, () => {
  console.log(`Issue tracker service running on port ${port}`);
});
