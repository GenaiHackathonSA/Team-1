# Spendwise

- Created a comprehensive full-stack expense tracking web application utilizing Spring Boot, React.js, and MySQL, enabling efficient day-to-day financial management.
- Integrated multi-role functionality with user authentication to ensure secure access for both users and administrators, including features such as sign-in, sign-up, password reset, and email verification.
- Designed user-friendly dashboards for managing transactions, tracking upcoming/recurring expenses, generating monthly summaries and statistics, and overseeing budgets.
- Added management features such as search, filter, and pagination for enhanced usability.
  
## Local development startup:

### Pre-requisites

- Install extension packs for <b>Java and Spring boot in vscode</b>. These should take care of building the springboot backend.
  - Java Extension Pack: https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack
  - Spring Boot Extension Pack: https://marketplace.visualstudio.com/items?itemName=vmware.vscode-boot-dev-pack
- Install <b>Node</b> version 20.16 and npm (node package manager) version 10.8.1. These should help with building and serving the React frontend project locally
- Install <b>docker and docker compose</b>. Docker and docker compose are packaged together if you download docker desktop
- Recommended to install <b>MySQL Workbench</b> (or a similar db viewer) to efficiently use and update the MySQL db
  - https://dev.mysql.com/downloads/workbench/

### Startup

1. While on the root directory in the project folder, run `docker compose up`. This will create a mysql container with the database <b>expensetracker</b> and initialize it with test data. 
  - admin: admin@gmail.com / testing123
  - user: user@gmail.com / testing123

2. Under backend/src/main/java/com/fullStack/expenseTracker `open the file ExpenseTrackerApplication.java`. Run the Java program by clicking the run button on the top right. 
<br>Which Java and spring boot version to use is configured in pom.xml. This will start the backend server.

4. Go into the frontend folder and run `npm install` to install the required node packages.

5. In the same frontend folder run `npm run start` to start the local react web application

---

# Full-Stack Expense Tracker Application
A modern expense tracking solution built with Spring Boot, React, and MySQL.

## Prerequisites

### Development Tools
- IDE, for example:
  - [Visual Studio Code](https://code.visualstudio.com/)
  - [IntelliJ IDEA](https://www.jetbrains.com/idea/) (Community or Ultimate edition)

### Backend Requirements
- Java Development Kit (JDK) 21 or higher

### Frontend Requirements
- [Node.js](https://nodejs.org/) 20.x or higher
- npm 10.x or higher

### Database Requirements
- [Docker](https://www.docker.com/products/docker-desktop/) and Docker Compose (included with Docker Desktop)
- Database Client, for example:
  - [MySQL Workbench](https://www.mysql.com/products/workbench/)
  - [DBeaver](https://dbeaver.io/) (Universal Database Tool)
  - [TablePlus](https://tableplus.com/)

## Installation Steps

### 1. Setting Up Development Environment

#### Install Git
```bash
# macOS (using Homebrew)
brew install git

# Windows
Download and install from https://git-scm.com/
```

#### Install Java
```bash
# macOS (using Homebrew or your IDE or https://www.oracle.com/sa/java/technologies/downloads/)
brew install openjdk

# Windows
Download and install JDK from https://www.oracle.com/sa/java/technologies/downloads/
```

#### Install Node.js and npm
```bash
# macOS (using Homebrew)
brew install node

# Windows
Download and install from https://nodejs.org/
```

#### Install Docker
- Download and install Docker Desktop from [Docker's official website](https://www.docker.com/products/docker-desktop/)
- Ensure Docker Desktop is running before proceeding with the project setup

### 2. Database Setup
```bash
# Start the MySQL database using Docker Compose
docker-compose up -d
```

### 3. Backend Setup
- Run `ExpenseTrackerApplication.java` using your IDE

### 4. Frontend Setup
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

## Verifying Installation

1. Backend API should be running on `http://localhost:8080`
2. Frontend application should be accessible at `http://localhost:3000`
3. MySQL database should be running on port `3306`

## Common Issues and Troubleshooting

1. **Port Conflicts**: Ensure ports 8080, 3000, and 3306 are not in use by other applications
2. **Docker Issues**: Make sure Docker Desktop is running before starting the application
3. **Database Connection**: Verify MySQL container is running using `docker ps`
4. **Java Version**: Ensure JAVA_HOME is properly set to JDK 21
