const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { sampleStations, sampleTrains } = require('./sampleData');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:8080', 'http://127.0.0.1:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:8080'],
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.post('/api/search-trains', async (req, res) => {
  const { fromStation, toStation, date } = req.body;

  if (!fromStation || !toStation || !date) {
    return res.status(400).json({ error: 'Missing required parameters: fromStation, toStation, date' });
  }

  try {
    // Find trains that match the route (case-insensitive search)
    const matchingTrains = sampleTrains.filter(train => {
      const fromMatch = train.from.toLowerCase().includes(fromStation.toLowerCase()) ||
                       fromStation.toLowerCase().includes(train.from.toLowerCase());
      const toMatch = train.to.toLowerCase().includes(toStation.toLowerCase()) ||
                     toStation.toLowerCase().includes(train.to.toLowerCase());
      return fromMatch && toMatch;
    });

    // Transform to match frontend expectations
    const transformedTrains = matchingTrains.map(train => ({
      id: train.id,
      name: train.name,
      from: train.from,
      to: train.to,
      departure: train.departure,
      arrival: train.arrival,
      duration: train.duration,
      price: train.price,
      availability: train.availability,
      class: train.class
    }));

    res.json({ trains: transformedTrains });
  } catch (error) {
    console.error('Error in /api/search-trains:', error);
    res.status(500).json({ error: 'Failed to fetch train data' });
  }
});

app.post('/api/get-station-code', async (req, res) => {
  const { stationName } = req.body;

  if (!stationName) {
    return res.status(400).json({ error: 'Missing required parameter: stationName' });
  }

  try {
    // Find stations that match the search query (case-insensitive)
    const matchingStations = sampleStations.filter(station =>
      station.name.toLowerCase().includes(stationName.toLowerCase()) ||
      station.code.toLowerCase().includes(stationName.toLowerCase())
    );

    res.json({ stations: matchingStations });
  } catch (error) {
    console.error('Error in /api/get-station-code:', error);
    res.status(500).json({ error: 'Failed to fetch station codes' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
