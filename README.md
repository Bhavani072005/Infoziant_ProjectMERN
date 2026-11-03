# DOC-CONNECT – Online Doctor Appointment Booking System

## 1. Project Overview

DOC-CONNECT is a web-based hospital appointment booking system developed using the MERN stack. It allows patients to book doctor appointments online, make simulated payments, and track their appointment status. Doctors can manage appointments, while administrators can manage patients, doctors, and bookings.

## 2. Problem Statement

Traditional hospital appointment systems often require patients to visit hospitals or wait in long queues to book consultations. DOC-CONNECT aims to simplify this process through an online appointment booking and queue tracking platform.

## 3. Project Objectives

- Provide online doctor appointment booking.
- Allow patients to select doctors, dates, and time slots.
- Provide appointment status and queue tracking.
- Allow doctors to manage their appointments.
- Allow administrators to manage the hospital booking system.
- Provide secure user authentication.

## 4. Technologies Used

| Component | Technologies |
|---|---|
| Frontend | React.js, HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT, bcrypt, Google Sign-In |
| Deployment | Vercel, Render |

## 5. Main Features

### Patient Module
- Patient registration and login.
- Google Sign-In.
- Doctor selection.
- Appointment date and time selection.
- Patient details and symptoms submission.
- QR-based simulated payment.
- Appointment status and queue tracking.

### Doctor Module
- Doctor login.
- Doctor dashboard.
- View patient appointments.
- Manage appointment status.

### Admin Module
- Admin login.
- Dashboard overview.
- Doctor management.
- Patient management.
- Booking management.

## 6. System Architecture

🏗️ System Architecture
The frontend communicates with the backend through HTTP API requests. The backend handles authentication and application logic, and reads/writes application data in MongoDB.
<img width="1120" height="1262" alt="mermaid-diagram" src="https://github.com/user-attachments/assets/acef56b8-fb03-4500-8b3b-90a7303e011f" />



## 7. Database Design

The application uses MongoDB collections.

- **Patients:** Stores patient account and profile information.
- **Doctors:** Stores doctor account and professional information.
- **Admins:** Stores administrator login information.
- **Bookings:** Stores appointment details, patient and doctor references, date, time, symptoms, and appointment status.

## 8. API Documentation

The backend exposes REST APIs under the `/api` path.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/booking` | Create an appointment |
| GET | `/api/booking/patient` | Get logged-in patient's bookings |
| GET | `/api/booking/doctor` | Get logged-in doctor's bookings |
| PATCH | `/api/booking/:id/status` | Update appointment status |

Other authentication and management routes are available in the backend source code.

## 9. Live Deployment

- **Frontend:** https://mern-infoziant-project.vercel.app/
- **Backend:** Add your public Render backend URL here.
- **GitHub Repository:** https://github.com/syadali025-commits/MERN-INFOZIANT-PROJECT

## 10. Run the Project Locally

### Prerequisites
- Node.js and npm
- MongoDB Atlas account
- Git

### Clone the repository

```bash
git clone https://github.com/syadali025-commits/MERN-INFOZIANT-PROJECT.git
cd MERN-INFOZIANT-PROJECT
```

### Run the backend

```bash
cd backend
npm install
npm start
```

### Run the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The Vite development server runs on `http://localhost:5173`.

### Environment Variables

Configure the required environment variables in the backend `.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=docconnect
JWT_SECRET=your_jwt_secret
```

Configure the frontend environment variables as required by your deployment:

```env
VITE_API_URL=your_backend_url
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Never upload `.env` files, database credentials, or private secrets to GitHub.

## 11. Application Screenshots

Add your application screenshots in the `screenshots/` folder and link them here.

Suggested screenshots:
- Landing Page
- Patient Login and Registration
- Patient Dashboard
- Doctor Selection and Appointment Booking
- Payment Page
- Appointment Status Page
- Doctor Dashboard
- Admin Dashboard

## 12. Future Enhancements

- Integration with a real payment gateway.
- SMS and email appointment notifications.
- Advanced hospital analytics.
- Improved real-time queue updates.

## 13. Conclusion

DOC-CONNECT provides a convenient online platform for hospital appointment booking and management. It connects patients, doctors, and administrators through a centralized web application, helping simplify the appointment process and reduce manual queue management.
