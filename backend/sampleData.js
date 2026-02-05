// Sample train schedule data for demonstration
const sampleStations = [
  { code: 'NDLS', name: 'New Delhi' },
  { code: 'CSMT', name: 'Mumbai CST' },
  { code: 'PUNE', name: 'Pune Junction' },
  { code: 'MMCT', name: 'Mumbai Central' },
  { code: 'BCT', name: 'Mumbai Bandra Terminus' },
  { code: 'LTT', name: 'Mumbai Lokmanya Tilak Terminus' },
  { code: 'KYN', name: 'Kalyan Junction' },
  { code: 'NK', name: 'Nashik Road' },
  { code: 'BSL', name: 'Bhusaval Junction' },
  { code: 'NAG', name: 'Nagpur' },
  { code: 'HYB', name: 'Hyderabad Deccan' },
  { code: 'MAS', name: 'Chennai Central' },
  { code: 'HWH', name: 'Howrah Junction' },
  { code: 'SBC', name: 'Bangalore City' },
  { code: 'ADI', name: 'Ahmedabad Junction' },
  { code: 'JP', name: 'Jaipur Junction' },
  { code: 'JU', name: 'Jodhpur Junction' },
  { code: 'AGC', name: 'Agra Cantt' },
  { code: 'CNB', name: 'Kanpur Central' },
  { code: 'LKO', name: 'Lucknow' }
];

const sampleTrains = [
  // Trains from Delhi to Nashik
  {
    id: '12107',
    name: 'LUCKNOW MAIL',
    from: 'New Delhi',
    to: 'Nashik Road',
    fromCode: 'NDLS',
    toCode: 'NK',
    departure: '22:45',
    arrival: '18:30',
    duration: '19h 45m',
    price: 1850,
    availability: 'Available',
    class: '2A',
    days: ['Mon', 'Wed', 'Sat']
  },
  {
    id: '12109',
    name: 'PANCHAVATI EXP',
    from: 'New Delhi',
    to: 'Nashik Road',
    fromCode: 'NDLS',
    toCode: 'NK',
    departure: '16:20',
    arrival: '12:45',
    duration: '20h 25m',
    price: 1650,
    availability: 'Available',
    class: '3A',
    days: ['Daily']
  },
  {
    id: '12511',
    name: 'RAPTI SAGAR EXP',
    from: 'New Delhi',
    to: 'Nashik Road',
    fromCode: 'NDLS',
    toCode: 'NK',
    departure: '14:30',
    arrival: '10:15',
    duration: '19h 45m',
    price: 2100,
    availability: 'Available',
    class: '2A',
    days: ['Tue', 'Wed', 'Sun']
  },

  // Trains from Mumbai to Nashik
  {
    id: '12109',
    name: 'PANCHAVATI EXP',
    from: 'Mumbai CST',
    to: 'Nashik Road',
    fromCode: 'CSMT',
    toCode: 'NK',
    departure: '07:05',
    arrival: '12:45',
    duration: '5h 40m',
    price: 450,
    availability: 'Available',
    class: 'CC',
    days: ['Daily']
  },
  {
    id: '12111',
    name: 'CSMT AMI EXP',
    from: 'Mumbai CST',
    to: 'Nashik Road',
    fromCode: 'CSMT',
    toCode: 'NK',
    departure: '23:45',
    arrival: '05:30',
    duration: '5h 45m',
    price: 380,
    availability: 'Available',
    class: 'CC',
    days: ['Daily']
  },
  {
    id: '12117',
    name: 'LTT MANMAD EXP',
    from: 'Mumbai Lokmanya Tilak Terminus',
    to: 'Nashik Road',
    fromCode: 'LTT',
    toCode: 'NK',
    departure: '06:35',
    arrival: '12:45',
    duration: '6h 10m',
    price: 420,
    availability: 'Available',
    class: 'CC',
    days: ['Daily']
  },

  // Trains from Pune to Nashik
  {
    id: '12129',
    name: 'AZAD HIND EXP',
    from: 'Pune Junction',
    to: 'Nashik Road',
    fromCode: 'PUNE',
    toCode: 'NK',
    departure: '22:45',
    arrival: '01:30',
    duration: '2h 45m',
    price: 320,
    availability: 'Available',
    class: '2A',
    days: ['Daily']
  },
  {
    id: '12135',
    name: 'PUNE NAGPUR EXP',
    from: 'Pune Junction',
    to: 'Nashik Road',
    fromCode: 'PUNE',
    toCode: 'NK',
    departure: '14:25',
    arrival: '17:10',
    duration: '2h 45m',
    price: 280,
    availability: 'Available',
    class: 'CC',
    days: ['Mon', 'Tue', 'Wed', 'Fri', 'Sat']
  },

  // Trains from Bangalore to Nashik
  {
    id: '12627',
    name: 'KARNATAKA EXP',
    from: 'Bangalore City',
    to: 'Nashik Road',
    fromCode: 'SBC',
    toCode: 'NK',
    departure: '22:20',
    arrival: '18:30',
    duration: '20h 10m',
    price: 2450,
    availability: 'Available',
    class: '2A',
    days: ['Daily']
  },

  // Trains from Chennai to Nashik
  {
    id: '12655',
    name: 'NAVJEEVAN EXP',
    from: 'Chennai Central',
    to: 'Nashik Road',
    fromCode: 'MAS',
    toCode: 'NK',
    departure: '07:15',
    arrival: '03:45',
    duration: '20h 30m',
    price: 2350,
    availability: 'Available',
    class: '2A',
    days: ['Daily']
  },

  // Trains from Kolkata to Nashik
  {
    id: '12321',
    name: 'HWH MUMBAI MAIL',
    from: 'Howrah Junction',
    to: 'Nashik Road',
    fromCode: 'HWH',
    toCode: 'NK',
    departure: '19:40',
    arrival: '18:30',
    duration: '22h 50m',
    price: 2650,
    availability: 'Available',
    class: '2A',
    days: ['Daily']
  }
];

module.exports = {
  sampleStations,
  sampleTrains
};