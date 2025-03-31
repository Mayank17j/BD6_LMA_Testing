const express = require('express');
const app = express();
app.use(express.static('static'));
app.use(express.json());

//https://writerank.notion.site/BD_6-Assignment-15fc77a2c9f380228975f39edac0f8ec

const {
  getAllPackages,
  getPackagesByDestination,
  addNewBooking,
  updatePackageBySlot,
  getBookingByPackageId,
} = require('./controllers');

//Exercise 1: Retrieve All Travel Packages (GET) /packages
app.get('/packages', async (req, res) => {
  try {
    const packages = await getAllPackages();
    if (!packages || packages.length === 0)
      return res.status(404).send('Package not found, empty packages!');
    res.status(200).json({ packages: packages });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Exercise 2: Retrieve Travel Package by Destination (GET) /packages/Paris
app.get('/packages/:destination', async (req, res) => {
  try {
    const packages = await getPackagesByDestination(req.params.destination);
    if (!packages) return res.status(404).send('Package not found by destination!');
    res.status(200).json({ package: packages });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Exercise 3: Add a New Booking (POST) /bookings
/*
{
  "packageId": 4,
  "customerName": "Raj Kulkarni",
  "bookingDate": "2024-12-20",
  "seats": 2
}
*/
app.post('/bookings', async (req, res) => {
  try {
    const newBooking = await addNewBooking(req.body);
    if (!newBooking) return res.status(404).send('Unable to add new booking!');
    res.status(201).json({ booking: newBooking });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Exercise 4: Update Available Slots for a Package(POST)
/*
{
	"packageId":1,
  "seatsBooked": 2
}
*/
app.post('/packages/update-seats', async (req, res) => {
  try {
    const updatedPackage = await updatePackageBySlot(req.body);
    //console.log('LOG:updatedPackage: ', updatedPackage);

    if (!updatedPackage)
      return res.status(404).send('Unable to update package!');
    res.status(200).json({ package: updatedPackage });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Exercise 5: Retrieve All Bookings for a Package (GET) /bookings/1
app.get('/bookings/:packageId', async (req, res) => {
  try {
    const packageId = parseInt(req.params.packageId);
    const bookings = await getBookingByPackageId(packageId);
    if (!bookings.length === 0)
      return res.status(404).send('Bookings not found by packageId!');
    res.status(200).json({ bookings: bookings });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//exporing app to used by other module
module.exports = { app };
