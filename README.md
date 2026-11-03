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

<img width="742" height="611" alt="image" src="https://github.com/user-attachments/assets/84fcd297-3304-48af-a98f-64040f8a4b18" />

# DOC-CONNECT – Database Design

## i. Introduction

DOC-CONNECT uses MongoDB as its database. Mongoose is used to define schemas and interact with the database.

## ii. Main Collections

The application uses the following main collections:

### Patients
Stores information about registered patients and their accounts.

### Doctors
Stores doctor information and login details.

### Admins
Stores administrator account information and access details.

### Bookings
Stores appointment details, including:
- Patient reference
- Doctor reference
- Appointment date
- Appointment time
- Symptoms
- Appointment status
- Payment status

## iii. Database Relationships

- One patient can create multiple bookings.
- One doctor can receive multiple bookings.
- Each booking is associated with one patient and one doctor.
- Admins manage the application.

## iv. Database Technology

- Database: MongoDB Atlas
- ODM: Mongoose
- Data format: BSON (JSON-like documents)

## v. Conclusion

The MongoDB database stores patient, doctor, admin, and appointment information. It helps DOC-CONNECT manage appointment bookings and track their status.

## 8. API Documentation
# DOC-CONNECT – API Documentation

## i. Introduction

DOC-CONNECT uses REST APIs to connect the React frontend with the Node.js and Express.js backend. These APIs handle authentication, appointment booking, and queue management.

## ii. Booking APIs

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/booking` | Create a new appointment booking |
| GET | `/api/booking/patient` | Get bookings for the logged-in patient |
| GET | `/api/booking/doctor` | Get bookings for the logged-in doctor |
| PATCH | `/api/booking/:id/status` | Update an appointment's status |

## iii. Authentication

The application uses JWT-based authentication to protect authorized routes. Patients and doctors access their respective dashboards after login.

## iv. Appointment Status Management

The doctor can update an appointment's status. Patients can view the latest booking status and queue information through their dashboard.

## v. Backend Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)

## vi. Note

The endpoints listed above are the booking routes currently documented. Authentication, admin, doctor-management, and other routes should be added after checking the actual backend source code.
Other authentication and management routes are available in the backend source code.

## 9. Live Deployment

- **Frontend:** https://mern-infoziant-project.vercel.app/
- **Backend:** https://mern-infoziant-project-7.onrender.com
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

### Landing Page
![Landing Page](Screenshots/Landing%20page.jpeg)

### Patient Portal
![Patient Login](Screenshots/Patient%20Login.jpeg)

![Patient Dashboard](Screenshots/Patient%20Dashboard.jpeg)

![Appointment Booking](Screenshots/Appoinment%20Booking.jpeg)

![Payment Page](Screenshots/Payment%20Page.jpeg)

![Appointment Status](Screenshots/Appoinment%20Status.jpeg)

### Doctor Portal
![Doctor Dashboard](Screenshots/Doctor%20Dashboard.jpeg)

### Admin Portal
![Admin Dashboard](Screenshots/Admin%20Dashboard.jpeg)

## 12. Future Enhancements

- Integration with a real payment gateway.
- SMS and email appointment notifications.
- Advanced hospital analytics.
- Improved real-time queue updates.

## 13. Conclusion

DOC-CONNECT provides a convenient online platform for hospital appointment booking and management. It connects patients, doctors, and administrators through a centralized web application, helping simplify the appointment process and reduce manual queue management.
