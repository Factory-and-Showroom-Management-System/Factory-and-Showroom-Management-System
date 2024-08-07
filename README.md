# 🎛️ Polythene Factory Management System 🎛️

The Polythene Factory Management System is a comprehensive web application designed to manage various operations within a polythene factory. This system includes modules for inventory management, order processing, production tracking, attendance, and salary management.

## 📚 Table of Contents
- 📝 Description
- ⚙️ Installation
- ✨ Features
- 💻 Technologies Used
- 📞 Contact

## 📝 Description
The Polythene Factory Management System is your one-stop solution for managing a polythene factory's operations efficiently. From tracking inventory to managing employee attendance, this system has got you covered!

## ⚙️ Installation

### Prerequisites
- 🟢 Node.js
- 📦 npm (Node Package Manager)
- ☕ JDK 11 or later
- 🛠️ Apache Maven
- 🐬 MySQL

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Factory-and-Showroom-Management-System/Factory-and-Showroom-Management-System.git
   cd Factory-and-Showroom-Management-System
   ```

2. **Download and extract files:**
   - Extract the downloaded files if necessary.

3. **Open the project folder:**
   ```bash
   cd Factory-and-Showroom-Management-System
   ```

4. **Open the project location with CMD:**
   - Navigate to the project directory in the command line.

5. **Open Visual Studio Code:**
   ```bash
   code .
   ```

6. **Open two terminal windows in VS Code:**
   - In the first terminal:
     ```bash
     cd Api
     npm install
     ```
   - In the second terminal:
     ```bash
     cd Front
     npm install
     npm run dev
     ```

7. **Set up the back-end:**
   - Navigate to the Api directory and follow steps for setting up the Node.js and Express.js application.
     ```bash
     cd Api
     ```
   - Configure Database Settings:
     Open `config/database.js` and update the database configuration with your MySQL database details. For example:
     ```javascript
     module.exports = {
       host: 'localhost',
       user: 'your-username',
       password: 'your-password',
       database: 'your-database'
     };
     ```

   - Run the Node.js application:
     ```bash
     node server.js
     ```

8. **Access the application:**
   - The application should automatically open in your web browser. If not, navigate to [http://localhost:3000](http://localhost:3000).

9. **Set up the database:**
   - Configure your MySQL database settings in the back-end configuration files.
   - **Note:** Database credentials are not included in the repository for security reasons. Add your database username and password to the configuration files.

## ✨ Features
- 📦 Inventory Management
- 📝 Order Processing
- 🏭 Production Tracking
- 🕒 Attendance Management
- 💰 Salary Management

## 💻 Technologies Used
- **Front-end:** ReactJS ⚛️
- **Back-end:** Node.js, Express.js 🟢
- **Database:** MySQL 🐬
- **Languages:** JavaScript, CSS 📜
- **Other Tools:** Tailwind CSS, Visual Studio Code 🎨

## 📞 Contact
If you have any questions or suggestions, feel free to reach out to the project maintainers:
- [G.W.M.D. Rupasinghe](https://www.linkedin.com/in/gwmd-rupasinghe) 🌟
- [K.A.D.P.M. Siriwardhana](https://www.linkedin.com/in/kadpm-siriwardhana) 🌟
- [H.P.G.L.P. Jayathilake](https://www.linkedin.com/in/hpglp-jayathilake) 🌟
- [N.W.V.B.S.B. Weragoda](https://www.linkedin.com/in/nwvsb-weragoda) 🌟

