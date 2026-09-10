# ⚖️ ISTISHARA — Frontend

The frontend of **ISTISHARA**, a legal consultation platform that connects clients with licensed lawyers.

Built with **React + Vite**, the application provides dedicated interfaces for clients, lawyers, and administrators, with Arabic RTL support and role-based navigation.

---

## 📝 Description

**ISTISHARA** is a web-based legal consultation platform designed to connect clients with licensed lawyers in Jordan.

The frontend provides a complete user interface for browsing lawyers, booking consultations, managing appointments, handling payments, submitting complaints, and managing accounts based on the user's role.

The application communicates with the ISTISHARA backend through REST API endpoints.

---

## 👤 User Roles

### 👤 Clients

Clients can:

- Create an account and sign in
- Browse licensed lawyers
- Search and filter lawyers
- Filter lawyers by specialization and city
- View lawyer profiles
- View consultation types and prices
- Book legal consultations
- Select consultation date and time
- Provide consultation details
- View their consultations
- View payment information
- Rate completed consultations
- Submit complaints against lawyer
- Update their personal information
- Read the latest news through the Blog page

### ⚖️ Lawyers

Lawyers can:

- Register as lawyers
- Submit professional information
- Upload identification / Bar Association documents
- Wait for administrator verification
- Manage their profile
- Update their biography and specialization
- Set prices for consultation types
- Accept or reject consultation requests
- Manage active consultations
- Complete consultations
- Send meeting links
- Send office locations
- Submit complaints against clients

### 🛡️ Administrators

Administrators can:

- Access the administration dashboard
- Manage lawyer accounts
- Manage client accounts
- Review lawyer registrations
- Approve or reject lawyer registrations
- Activate or suspend accounts
- Delete accounts
- Review and manage complaints

---

## ✨ Main Features

- 🔐 JWT-based authentication
- 👥 Role-based navigation
- 🛡️ Protected dashboards
- 💾 Session persistence using `localStorage`
- ⚖️ Lawyer browsing and filtering
- 🔎 Lawyer search
- 📅 Consultation booking
- 💳 Payment management
- ⭐ Lawyer ratings
- 📢 Complaint management
- 📰 News feed
- 📄 Lawyer document upload
- 📱 Responsive interface
- 🇯🇴 Arabic RTL interface
- 🔤 Cairo font
- 🌐 REST API integration

---

## 🔐 Authentication & Authorization

The application uses **JWT (JSON Web Tokens)** for authentication.

After successful login, authentication information is stored in the browser using `localStorage`.

The frontend uses the authenticated user's role to provide the appropriate experience.

```text
                         Sign In
                            │
                            ▼
                     Authentication
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
           Client         Lawyer         Admin
              │             │             │
              ▼             ▼             ▼
      Client Dashboard  Lawyer Dashboard  Admin       Dashboard
```

Different users are redirected to their corresponding dashboard after authentication.

---

## 📰 Blog & GNews Integration

The **Blog** page displays recent Arabic news articles using the **GNews API**.

To improve security and avoid browser-side CORS issues, GNews requests are handled through the ISTISHARA backend.

The frontend communicates only with the ISTISHARA API:

```text
React Blog
    │
    ▼
GET /api/news
    │
    ▼
ISTISHARA Backend
    │
    ▼
GNews API
```

The GNews API key is stored on the backend and is **not exposed in the frontend**.

---

## 🛠️ Technologies

### Frontend

- React
- Vite
- JavaScript (ES6+)
- React Router
- Fetch API
- Axios
- Material UI (MUI)
- lucide-react
- localStorage
- CSS
- Cairo Font
- RTL Layout

### API Integration

- REST API
- JWT Authentication
- GNews API

---

## 📁 Project Structure

```text
Estsharah-client/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │   └── images/
│   │
│   ├── components/
│   │   ├── admin/
│   │   ├── client/
│   │   ├── lawyers/
│   │   ├── shared/
│   │   └── ui/
│   │
│   ├── data/
│   │
│   ├── pages/
│   │   ├── admin/
│   │   ├── clients/
│   │   ├── lawyers/
│   │   ├── login/
│   │   └── visitors/
│   │
│   ├── routes/
│   │
│   ├── styles/
│   │   ├── componentsStyle/
│   │   │   ├── clientStyle/
│   │   │   ├── lawyersStyle/
│   │   │   ├── sharedStyle/
│   │   │   └── UiStyle/
│   │   │
│   │   └── pagesStyle/
│   │
│   ├── utils/
│   │   ├── auth.js
│   │   └── labels.js
│   │
│   ├── App.css
│   └── config.js
|   └── App.jsx
│
└── package.json
```

## 🔌 API Configuration

The frontend uses a centralized API URL configuration.

Example:

```js
export const API_URL =
  import.meta.env.VITE_API_URL;
```

This allows the same frontend code to work in both development and production environments.

### Development

```text
http://localhost:5000/api
```

### Production

```text
https://estsharah-app-server-production.up.railway.app/api
```

---

## 🔐 Environment Variables

Create a `.env` file in the frontend root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

For production, configure the appropriate API URL through the deployment environment.

> **Important:** Do not store private API keys, passwords, JWT secrets, or database credentials in the frontend repository.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-frontend-repository-url>
```

### 2. Navigate to the frontend project

```bash
cd Estsharah-client
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

### 5. Start the development server

```bash
npm run dev
```

The application will normally run at:

```text
http://localhost:5173
```

The ISTISHARA backend must be running for features that require API access.

## 🔒 Security

The frontend follows several security practices:

- JWT-based authentication
- Protected role-based routes
- Authorization tokens for authenticated API requests
- Environment-based API configuration
- GNews API key kept on the backend
- No hardcoded backend production credentials
- File type validation for lawyer documents
- File size validation for uploaded documents

## 🧪 Development Commands

### Start Development Server

```bash
npm run dev
```

### Build Production Application

```bash
npm run build
```

---

## 📱 Responsive Design

The frontend is designed to provide a responsive experience across different screen sizes.

The interface uses:

- Responsive layouts
- Reusable components
- Flexible CSS
- Material UI components
- RTL support for Arabic content

---

## 🇯🇴 Arabic & RTL Support

ISTISHARA is primarily designed for Arabic-speaking users.

The frontend supports:

- Arabic text
- Right-to-left layout
- Arabic navigation
- Arabic labels
- Cairo font
- RTL-compatible UI components

This provides a more natural experience for users in Jordan and Arabic-speaking environments.

---

## 🗂️ Main Frontend Modules

### `components/`

Contains reusable React components organized by role and purpose.

```text
components/
├── admin/
├── client/
├── lawyers/
├── shared/
└── ui/
```

### `pages/`

Contains the application's main pages.

```text
pages/
├── admin/
├── clients/
├── lawyers/
├── login/
└── visitors/
```

### `routes/`

Contains frontend routing and route configuration.

### `styles/`

Contains component-level and page-level CSS.

```text
styles/
├── componentsStyle/
│   ├── clientStyle/
│   ├── lawyersStyle/
│   ├── sharedStyle/
│   └── UiStyle/
│
└── pagesStyle/
```

### `utils/`

Contains shared utility functions such as authentication and labels.

```text
utils/
├── auth.js
└── labels.js
```

### `data/`

Contains frontend application data used by the interface.

---


## 📌 Important Notes

- The frontend requires the ISTISHARA backend to be available for API-dependent functionality.
- Authentication sessions are maintained using `localStorage`.
- The application is designed primarily for Arabic-speaking users.
- The interface uses RTL layout.
- News content is retrieved through the backend using the GNews API.
- The frontend does not directly expose the GNews API key.
- Environment variables should be configured separately for development and production.

---

## 🎯 Project Goals

ISTISHARA aims to provide a centralized digital platform for legal consultations by making it easier for clients to:

- Find suitable lawyers
- Compare lawyers and specializations
- Book consultations
- Communicate with legal professionals
- Manage consultation information
- Submit ratings and complaints

At the same time, lawyers can manage their professional profiles, consultation requests, pricing, and client interactions through a dedicated dashboard.

Administrators can oversee users, verify lawyers, and manage complaints through the administration interface.

---

## 👨‍💻 Project

**ISTISHARA — Legal Consultation Platform**

A web application designed to connect clients with licensed lawyers and provide an organized platform for managing legal consultations.

### Frontend Stack

```text
React
   +
Vite
   +
JavaScript
   +
React Router
   +
REST API
   +
Material UI
   +
CSS / RTL
```

---

## 📄 License

This project is proprietary software developed by **Hussam Atharbeh**.

The source code may not be copied, modified, distributed, published, or used without the explicit permission of the author.

© 2026 Hussam Atharbeh. All rights reserved.