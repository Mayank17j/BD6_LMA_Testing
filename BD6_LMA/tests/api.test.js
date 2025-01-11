//import supertest for mock testing
const request = require('supertest');

//import all function from controllers
const {
  getAllPackages,
  getPackagesByDest,
  addNewBooking,
  updatePackageBySlot,
  getBookingByPackageId,
} = require('../controllers');

//import app from index
const { app } = require('../index.js');

//get http for connection with server
const http = require('http');

//mocking the function defined in controllers
jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getAllPackages: jest.fn(),
  getPackagesByDest: jest.fn(),
  addNewBooking: jest.fn(),
  updatePackageBySlot: jest.fn(),
  getBookingByPackageId: jest.fn(),
}));

//sync server
let server;
beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});
afterAll(async () => {
  server.close();
});

//declaring mock tests
describe('API Endpoint tests', () => {
  it('Test 1: Retrieve All Packages', async () => {
    const mockValue = [
      {
        packageId: 1,
        destination: 'Paris',
        price: 1500,
        duration: 7,
        availableSlots: 10,
      },
      {
        packageId: 2,
        destination: 'Rome',
        price: 1200,
        duration: 5,
        availableSlots: 15,
      },
    ];
    //creating mock function
    getAllPackages.mockResolvedValue(mockValue);
    //getting the result of mock API
    const result = await request(server).get('/packages');
    expect(result.statusCode).toBe(200);
    expect(result.body.packages).toEqual(mockValue);
  });

  it('Test 2: Retrieve Package by Destination', async () => {
    const mockValue = [
      {
        packageId: 1,
        destination: 'Paris',
        price: 1500,
        duration: 7,
        availableSlots: 10,
      },
    ];
    getPackagesByDest.mockResolvedValue(mockValue);
    const result = await request(server).get('/packages/Paris').send(mockValue);
    expect(result.statusCode).toBe(200);
    expect(result.body.package).toEqual(mockValue);
  });

  it('Test 3: Add a New Booking', async () => {
    const mockValue = [
      {
        bookingId: 6,
        packageId: 4,
        customerName: 'Raj Kulkarni',
        bookingDate: '2024-12-20',
        seats: 2,
      },
    ];
    addNewBooking.mockResolvedValue(mockValue);
    const result = await request(server).post('/bookings').send({
      packageId: 4,
      customerName: 'Raj Kulkarni',
      bookingDate: '2024-12-20',
      seats: 2,
    });
    expect(result.statusCode).toBe(201);
    expect(result.body.booking).toEqual(mockValue);
  });
  
  it('Test 4: Update Available Slots', async () => {
    const mockValue = {
      packageId: 1,
      destination: 'Paris',
      price: 1500,
      duration: 7,
      availableSlots: 8,
    };
    updatePackageBySlot.mockResolvedValue(mockValue);
    const result = await request(server)
      .post('/packages/update-seats')
      .send({
        packageId: 1,
        seatsBooked: 2,
      });
    expect(result.statusCode).toBe(200);
    expect(result.body.package).toEqual(mockValue);
  });

  it('Test 5: Retrieve Bookings for a Package', async () => {
    const mockValue = [
      {
        bookingId: 1,
        packageId: 1,
        customerName: 'Anjali Seth',
        bookingDate: '2024-12-01',
        seats: 2,
      },
    ];
    getBookingByPackageId.mockResolvedValue(mockValue);
    const result = await request(server).get('/bookings/1');
    expect(result.statusCode).toBe(200);
    expect(result.body.bookings).toEqual(mockValue);
  });
});
