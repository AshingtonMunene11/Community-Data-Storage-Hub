# Community Data Storage Hub

## Project Team
- Frank Ashington Munene  
- Mercy Kinya  
- Mike Muteithia  

## Overview
The Community Data Storage Hub is a web-based platform designed to manage digital storage allocations in shared environments. It enables users to register, submit file metadata, and assign storage nodes. Administrators can monitor usage, manage allocations, and ensure equitable distribution of digital resources.

This project addresses the growing need for transparent, scalable, and accountable data management in contexts such as educational institutions, community networks, and enterprise infrastructure.

## MVP Scope
The Minimum Viable Product (MVP) focuses on:
- Metadata tracking for uploaded files
- User-to-node storage allocation
- Administrative oversight of usage and capacity

The MVP is designed to meet academic evaluation criteria while remaining extensible for real-world deployment.

## Technologies Used

### Backend
- Flask  
- SQLAlchemy  
- Flask-Marshmallow or SQLAlchemy-Serializer  
- Flask-CORS  

### Frontend
- Next.js  
- Formik  
- Yup  
- Axios  

## Backend Architecture

### Features
- RESTful API with full CRUD operations for:
  - **User**: name, email
  - **StorageNode**: location, capacity
  - **Upload**: filename, size, associated user, assigned node
  - **Allocation**: links users to storage nodes with specified storage size

- Relational data modeling using SQLAlchemy:
  - One-to-many: `User` to `Upload`
  - Many-to-many: `User` to `StorageNode` via `Allocation`

- JSON serialization using Flask-Marshmallow or SQLAlchemy-Serializer  
- CORS enabled for frontend integration  
- Modular route structure implemented using Flask Blueprints  

## Frontend Architecture

### Components
- **UploadForm**: Built with Formik and validated using Yup  
- **UserForm**: Includes email format validation  
- **AllocationForm**: Assigns storage size to user-node pairs  
- **NavBar**: Provides navigation across application routes  
- **StorageNodeCard**: Displays node details and current usage  

### API Integration
- Axios-based service layer for HTTP requests  
- Integration with Flask backend for data retrieval and submission  
- Includes handling for loading states, success confirmations, and error feedback  

## MVP Workflow

1. A user registers through the user interface  
2. An administrator adds storage nodes to the system  
3. The user submits file metadata for tracking  
4. The administrator assigns storage allocations to users  
5. A dashboard view summarizes total usage per storage node  

## Real-World Applications

This project is applicable in various sectors, including:

- **Education**: Managing student submissions and departmental quotas  
- **Telecommunications**: Tracking data usage across distributed infrastructure  
- **Community Networks**: Facilitating shared digital archives  
- **Enterprise IT**: Monitoring internal storage allocations and usage patterns  

## Setup Instructions

### Backend
```bash
cd server
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
flask db init
flask db migrate
flask db upgrade
flask run
```

## 📜 License & Use

&copy; 2025  — Moringa School.
All rights reserved.

