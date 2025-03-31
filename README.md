# Travel Packages and Bookings

> Implement API route, Perform Unit testing and Working CI-CD Pipeline

> Used Tech: Express.js, cors, jest, sequelize, sqlite3, supertest

This project shows a simple CRUD Operation over express server. Unit testing using jest and supertest. Using sqlite3 as a database by implementing sequelize methods.

API requests: \
1: Retrieve All Travel Packages (GET) /packages \
2: Retrieve Travel Package by Destination (GET) /packages/:destination \
3: Add a New Booking (POST) /bookings \
4: Update Available Slots for a Package(POST) \
5: Retrieve All Bookings for a Package (GET) /bookings/:packageId 

Unit Tests: API Endpoint tests \
Test 1: Retrieve All Packages \
Test 2: Retrieve Package by Destination \
Test 3: Add a New Booking \
Test 4: Update Available Slots \
Test 5: Retrieve Bookings for a Package

Run command: \
server: node server \
test: npm run test

## CI/CD Github Actions

To set up CI/CD for your project using Vercel, follow these steps:

1. **Create `vercel.json` file**
1.  **file**
    
    In the root of your project, create a file named `vercel.json` with the following content:
    
    ```json
    {
      "version": 2,
      "builds": [{ "src": "server.js", "use": "@vercel/node" }],
      "rewrites": [{ "source": "/(.*)", "destination": "server.js" }]
    }
    ```
    
    Ensure you replace `server.js` with the appropriate file path for your server if it's located elsewhere.
    
2. **Create CI/CD Workflow File**
    
    Create a `.github/workflows/cicd.yaml` file at the root of your project with the following content:   [**CI/CD YAML File**](https://gist.github.com/imrhlrvndrn/d402c2a784f50051d8eced617bbb9fef) 
    
3. **Push Code to GitHub**
    
    Connect your project to a GitHub repository and push the code to the repository.
    
4. **Add Vercel Token to GitHub Secrets**
    
    Go to your GitHub repository, navigate to **Settings > Secrets and variables > Actions**. Create a new secret named `VERCEL_TOKEN` and add your Vercel token.
    
    You can create a Vercel token by visiting this [link](https://vercel.com/account/settings/tokens).
    
5. **Deploy on Vercel** 
    
    After setting up the GitHub Actions workflow and adding the secret, your application will be automatically deployed to Vercel on every push to the `main` branch. 


Check out the [express documentation](https://expressjs.com/) for more information.
