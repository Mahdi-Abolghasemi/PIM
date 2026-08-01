# PIM App

This app is built to manage personal information. Information like contacts, bank accounts, notes, and login information for app accounts. At this stage, only the server side of the contacts section has been built.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

The things you need before installing the software.

- Node.js
- MongoDB

### Installation

A step by step guide that will tell you how to get the development environment up and running.

```
$ First step
Npm install
$ Second step
Create an .env file in the root of the project with the following content:
SERVER_IP="Your server IP"
SERVER_PORT="Your server port"
DATABASE_SERVER_IP="Your data base server IP"
DATABASE_PORT="Your data base port"
DATABASE_NAME="Your data base name"
USER_NAME="Your data base user name"
PASSWORD="Your data base password"
FRONTEND_ADDRESS="Your frontend server IP"
JWT_SECRET_KEY="Your secret key for create JWT token"
$ Third step
Open the browser and go to the address: "Your server IP/api/auth/registration"
$ Final step
Npm start
```
