# Parent Alert System 

## Description
Parent Alert System 🚀
The Parent Alert System is a web-based application designed to facilitate seamless communication between wardens, students, and parents regarding leave applications. Built using the MERN stack, the system enables wardens to manage student leave requests, approve or reject them, and notify parents instantly.

Key Features
✅ Student Leave Management – Students can submit leave applications with necessary details.
✅ Warden Dashboard – Wardens can review, approve, or reject leave requests and raise complaints if necessary.
✅ Parent Notification System – Automated notifications are sent to parents upon leave approval or rejection.
✅ Student Leave History – Wardens can view a student’s leave history for better decision-making.
✅ Secure Authentication – Role-based authentication ensures data security and access control.

Tech Stack
Frontend: React.js
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT
This system enhances transparency between students, wardens, and parents, ensuring better leave management and parental involvement. 🚀

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
