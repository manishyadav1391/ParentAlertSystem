# Alert System Clone

## Description
This project is a clone of an alert system that allows users to manage leave forms and authenticate users. It is built using Node.js, Express, and MongoDB.

## Installation Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/alertsystemclone.git
   cd alertsystemclone
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB URI and JWT secret:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Usage
The API has the following endpoints:

- **Authentication**
  - `POST /api/auth/login`: Log in a user.
  - `POST /api/auth/register`: Register a new user.

- **Leave Forms**
  - `GET /api/leave-forms`: Retrieve all leave forms.
  - `POST /api/leave-forms`: Create a new leave form.

- **Ward Management**
  - `GET /api/warden`: Retrieve all wards.
  - `POST /api/warden`: Create a new ward.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is licensed under the ISC License.
