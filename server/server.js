const express = require('express');
const { exec } = require('child_process');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/iperfResults', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const IperfResultSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  results: Object,
});

const IperfResult = mongoose.model('IperfResult', IperfResultSchema);

app.get('/api/run-iperf', (req, res) => {
  exec('iperf3 -c your_server_address -J', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing iperf3: ${error.message}`);
      return res.status(500).send('Error running iperf3');
    }
    const results = JSON.parse(stdout);
    const newResult = new IperfResult({ results });
    newResult.save()
      .then(() => res.json(results))
      .catch(err => res.status(500).send('Error saving results'));
  });
});

app.get('/api/results', (req, res) => {
  IperfResult.find()
    .then(results => res.json(results))
    .catch(err => res.status(500).send('Error fetching results'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
