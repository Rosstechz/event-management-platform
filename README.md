OVERVIEW:
- This is a full-stack Event Management Platform that allows users to view, register for events, and read blogs. Admins can manage events, create blogs.

Features
- User Registration and Login
- Admin Panel for Creating, Editing, and Managing Events
- User Registration for Events
- Blog Management System

Technologies Used
- Frontend: React, TypeScript, TailwindCSS, Axios, React-Router-Dom
- Backend: Node.js, Express, MongoDB, Mongoose
- Storage: AWS S3 for Image Uploads
- Authentication: JWT

Installation 

1) Clone the repository
 - git clone <repository url>
 - cd event-management-platform

2) Install Dependencies
 - cd client
 - npm install
 - cd server
 - npm install

3) Environment Variables: set env variables in server directory
  - PORT=5000
  -  MONGO_URI=<your_mongodb_uri>
  - CLIENT_URL=http://localhost:3000
  - ADMIN_EMAIL=<your_admin_email>
  - ADMIN_PASSWORD=<your_admin_password>
  - ADMIN_JWT_SECRET=<your_admin_jwt_secret>
  - USER_JWT_SECRET=<your_user_jwt_secret>
  - AWS_ACCESS_KEY_ID=<your_aws_access_key>
  - AWS_SECRET_ACCESS_KEY=<your_aws_secret_key>
  - AWS_BUCKET_NAME=<your_bucket_name>
  - AWS_REGION=<your_aws_region>
  - EMAIL_USER=<your_email>
  - EMAIL_PASS=<your_email_password>

4) Running the Application
 - cd client
 - npm run dev : access the frontend at http://localhost:3000
 - cd server
 - npm run dev : access the server at http://localhost:5000

Usage
1) General User
  - Visit the website
  - Browse events, register for events, read blogs.
  - View Blogs

2) Admin
  - admin login page : /admin/login
  - login as admin : (credentials in .env file in server dir)
  - Admin can create events, edit events, delete events and view events, displayed on events page
  - Admin can create blogs, edit blogs, delete blogs and view blogs , displayed on blogs page



  






  

