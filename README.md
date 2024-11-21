# Trekker On the Go
A web-based platform to streamline shared auto (trekker) availability between the city and university, providing a seamless experience for both passengers and drivers.

## Table of Contents
1. About the Project
2. Features
3. Tech Stack
4. Installation
5. Usage
6. Contributing
7. License
8. Contact

### 1. About the Project
Trekker On the Go solves the hassle of checking availability and coordinating shared rides. It includes:
  * A passenger interface to view available trekkers and receive notifications.
  * A driver interface to manage status updates (e.g., availability, route changes).

This project was created to simplify commuting between my university and the city while leveraging modern web technologies for real-time updates, by just giving the availability system not booking mangement system.

### 2. Features
* Real-Time Notifications: Passengers receive live updates when a trekker is departing or arriving.
* Trekker Availability List: Display of available trekkers on the passenger dashboard.
* User Authentication: Secure login/signup functionality for both passengers and drivers.
* Driver Status Management: Drivers can update their status dynamically.
* Modern UI: Sleek and responsive design with animations for an enhanced user experience.

### 3. Tech Stack
* Frontend: ReactJS with Chakra UI
*  Backend: Node.js, Express.js
* Database: MongoDB
* Other Technologies: TypeScript, WebSockets

### 4. Installation
1. Clone the repository:
  - `git clone https://github.com/your-usernmae/Trekker-On-the-Go.git`
  - `cd Trekker-On-the-Go`
2. Install dependencies:
   * For the backend:
      - `cd backend`
      - `npm install`
   * For the frontend:
      - `cd frontend`
      - `npm install`
3. Set up environment variables:
  * Create a `.env` file in the root of your backend directory with the following keys:
    - `PORT = 5000`
    - `DATABASE_URL = your_mongodb_connection_string`  
    - `JWT_SECRET=your_jwt_secret`
4. Run the Application:
  * Start the backend server:
    - `npm start`
  * Start the frontend server:
    - `npm run dev`

### 5. Usage
1. Navigate to the landing page.
2. Sign up or log in based on your role (Passenger/Driver).
3. Passengers can view available trekkers and receive notifications in real time.
4. Drivers can update their trekker status (e.g., "go up" or "reached college").

### 6. Contribution
Contributors are welcome!
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Added some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request.

### 7. License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

### 8. Contact
* Name: Vyom Singhal
* Email: [vilsium28@gmail.com](vilsium28@gmail.com)
* Github: [https://github.com/Vilsium](https://github.com/Vilsium)
