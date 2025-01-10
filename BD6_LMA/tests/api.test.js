const request = require('supertest');
const {
  getAllPackages,
  getPackagesByDest,
  addNewBooking,
  updatePackageBySlot,
  getBookingByPackageId,
} = require('../controllers');
const { app } = require('../index.js');
const http = require('http');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getAllPackages: jest.fn(),
  getPackagesByDest: jest.fn(),
  addNewBooking: jest.fn(),
  updatePackageBySlot: jest.fn(),
  getBookingByPackageId: jest.fn(),
}));

let server;
beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});
afterAll(async () => {
  server.close();
});

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
    getAllPackages.mockResolvedValue(mockValue);
    const result = await request(server).get('/packages').send(mockValue);
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
        packageId: 4,
        customerName: 'Raj Kulkarni',
        bookingDate: '2024-12-20',
        seats: 2,
      },
    ];
    addNewBooking.mockResolvedValue(mockValue);
    const result = await request(server).post('/bookings').send(mockValue);
    expect(result.statusCode).toBe(201);
    expect(result.body.booking).toEqual(mockValue);
  });
  
  it('Test 4: Update Available Slots', async () => {
    const mockValue = {
      packageId: 1,
      seatsBooked: 2,
    };
    updatePackageBySlot.mockResolvedValue(mockValue);
    const result = await request(server)
      .post('/packages/update-seats')
      .send(mockValue);
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
    const result = await request(server).get('/bookings/1').send(mockValue);
    expect(result.statusCode).toBe(200);
    expect(result.body.bookings).toEqual(mockValue);
  });
});
