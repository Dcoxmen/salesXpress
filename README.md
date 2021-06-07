# Product Business Model Overview

![Image of Yaktocat](https://Dcoxmen.github.com/img/salesXpressBizModel.png)

# SalesXpress Backend API Specifications

Created this application for a salesXpress sales portal website. The frontend/UI will be created with ReactJS and Redux for state management. We have implemented an admin dashboard template using coreui reactJS free template and have customized it to our needs.
The dashboard and navigation are the main features at entry after being authenticated. The goal of this app is to centralize sales data and goals to track progress and achievements. To organize company culture and distribution of common documentations. Promote sales campaigns, contests, and rewards. Provide customized set of field applications for sales execs.
All of the functionality below needs to be fully implmented in this project.

### Technology Used

- BackEnd Tech.
  -MongoDB,
  -express,
  -bcryptjs,
  -config,
  -express,
  -express-validator,
  -jsonwebtoken,
  -mongoose,
  -request

- FrontEnd Tech. (coreui reactjs template assets and other packages)
  -@coreui/chartjs,
  -@coreui/coreui,
  -@coreui/icons,
  -@coreui/icons-react,
  -@coreui/react,
  -@coreui/react-chartjs,
  -@coreui/utils,

  -axios,
  -classnames,
  -core-js,
  -enzyme,
  -moment,
  -prop-types,
  -react,
  -react-app-polyfill,
  -react-dom,
  -react-moment,
  -react-redux,
  -react-router-dom,
  -redux,
  -redux-devtools-extension,
  -redux-thunk,
  -sass,
  -uuid

### Sales Person View (User info display)

- List all sales accounts relative to logged in user.
  - Pagination
  - Select specific fields in result
  - Limit number of results
  - Filter by fields
- Get single sales account detail
- Create new sales account
  - Authenticated admin user only
  - Must have the role "admin"
  - Field validation via Mongoose
- Update sales accounts
  - Admin only
  - Validation on update
- Delete sales account
  - Admin only
- Commission Tracker
  - Calculate the average total of all commissons for a current weeks accounts for this user
  - Calculate the average sales account for the week.
- PDF Document Library
  - Upload PDF and description to MongoDB
  - View PDF documents in library with pagination
  - Delete PDF document by id

### Regional Sales Info

- List all sales for users region by office
- List all users in region
  - Pagination, filtering, etc
- Get single user sales in a region
- Create new region
  - Authenticated admin only
  - Must have the role "admin"
  - Only admin can create a region for a sales account
- Update region
  - admin only
- Delete region
  - admin only

### Users & Authentication

- Authentication will be ton using JWT/cookies
  - JWT and cookie should expire in 30 days
- User registration
  - Register as a "sales rep", "district manager", "region manager", or "admin"
  - Once registered, a token will be sent along with a cookie (token = xxx)
  - Passwords must be hashed
- User login
  - User can login with email and password
  - Plain text password will compare with stored hashed password
  - Once logged in, a token will be sent along with a cookie (token = xxx)
- User logout
  - Cookie will be sent to set token = none
- Get user
  - Route to get the currently logged in user (via token)
- Password reset (lost password)
  - User can request to reset password
  - A hashed token will be emailed to the users registered email address
  - A put request can be made to the generated url to reset password
  - The token will expire after 10 minutes
- Update user info
  - Authenticated user only
  - Separate route to update password
- User CRUD
  - Admin only
- Users can only be made admin by updating the database field manually

## Security

- Encrypt passwords and reset tokens
- Prevent cross site scripting - XSS
- Prevent NoSQL injections
- Add a rate limit for requests of 100 requests per 10 minutes
- Protect against http param polution
- Add headers for security (helmet)
- Use cors to make API public (for now)

## Documentation

- Use Postman to create documentation
- Use docgen to create HTML files from Postman
- Add html files as the / route for the api

## Deployment (AWS)

- Push to Github
- Create a droplet - https://m.do.co/c/5424d440c63a
- Clone repo on to server
- Use PM2 process manager
- Enable firewall (ufw) and open needed ports
- Create an NGINX reverse proxy for port 80
- Connect a domain name
- Install an SSL using Let's Encrypt

## Code Related Suggestions

- NPM scripts for dev and production env
- Config file for important constants
- Use controller methods with documented descriptions/routes
- Error handling middleware
- Authentication middleware for protecting routes and setting user roles
- Validation using Mongoose and no external libraries
- Use async/await (create middleware to clean up controller methods)
- Create a database seeder to import and destroy data

### Front-End Specifications (User info display)

- ReactJS coreUI template implementation.
- Redux state management (jwt, admin, etc)
- Connect and display backend data
- Form validation and security
