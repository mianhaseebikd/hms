# Hospital Management System | Datalink Solution

This project is a practical implementation of a complete Hospital Management System (HMS), designed to streamline and digitize the overall hospital workflow. The system efficiently covers core operations and includes three essential user roles: Admin, Doctor, and Front Desk Officer (FDO). Each role has dedicated access and functionalities to manage patients, appointments, medical records, and administrative tasks.  

This project serves as a comprehensive practice example of how modern hospitals operate through an organized and automated system.

## Features
- Role-based access for Admin, Doctor, and FDO.
- Patient management: personal information, medical history, and appointments.
- Appointment scheduling with notifications and reminders.
- Prescription management for doctors.
- Billing and check-in management by FDO.
- Administrative controls for hospital settings and user management.
- Easy-to-use interface for daily hospital operations.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js / Express.js  
- **Database:** MongoDB / Mongoose  
- **Authentication:** Role-based access control  


## Installation
1. Clone the repository:  
   ```bash
   git clone https://github.com/yourusername/hospital-management-system.git.
2. Install dependencies:
    ```bash
    npm install
3. Create a .env file for environment variables (DB connection, etc.).
4. Run the server:
    ```bash
    npm start
5. Open your browser at http://localhost:3000 

## User Roles

- **Admin:** Full access to manage users, settings, and reports
- **Doctor:** Access to patient records, consultations, and prescriptions.
- **Front Desk Officer (FDO):** Handles patient appointments, billing, and check-ins

## Models

- **Admin Model:** Manages hospital settings, user roles, and overall administration
- **Doctor Model:** Handles patient consultations, medical records, prescriptions, and follow-ups
- **Front Desk Officer (FDO) Model:** Manages patient appointments, check-ins, billing, and communication between patients and doctors
- **Patient Model:** Stores patient personal information, medical history, and appointment details
- **Appointment Model:** Tracks appointments, schedules, and notifications for patients and doctors
- **Prescription Model:** Records diagnosis, prescribed medicines, and follow-up instructions for patients

