# 🧑‍💼 HR Dashboard Management System

A responsive, feature-rich HR management dashboard built with **Next.js 15**, **TailwindCSS**, and **Framer Motion**. This project lets users view, search, bookmark, and analyze employee profiles with a smooth modern UI.

---

## 🔗 Live Demo

👉 [dashboard-management-five.vercel.app](https://dashboard-management-five.vercel.app/)

---

## 📸 Screenshots & Demo Previews

### 🏠 Homepage
![Homepage](https://drive.google.com/uc?id=1vBlM5Pm1euZU0Xgg6iSASkgM9d7zMCm-)

### 👤 Create User
![User Details](https://drive.google.com/uc?id=12NKUG2Ty0JN1CURgDx-vkmlJ7Fos6_do)

### 📌 Bookmarks
![Bookmarks](https://drive.google.com/uc?id=1_rkMO6k0Gh1XSWa2oPUcI4dm8RcVIkJv)

### 📊 Analytics
![Analytics](https://drive.google.com/uc?id=1VMcIpWkD725WwSHCQAnPMhMDH5Be_rnl)

### 🔐 User Model
![Login](https://drive.google.com/uc?id=1qY_zjp03zxnKaNblBsvFJ3jLG15vhplV)

### ➕
![Create User Modal](https://drive.google.com/uc?id=1J9IjKqu6tcSHsRmcWOBACHvou5oz91Ua)

---

## 🧾 Login Details

> 🔐 Auth is handled through a mocked login flow (Context API). Use the following:

- **Email:** `admin@example.com`  
- **Password:** `admin123`  

Redirects to homepage on successful login.

---

## 🏗️ Features

### 1. 🏠 Dashboard Homepage (`/`)
- Renders a card layout of all users with:
  - Full Name, Email, Age, Department
  - Performance rating (1–5 stars)
  - Buttons: `View`, `Bookmark`, and `Promote`
- **Pagination** support
- **Create User Modal** to quickly add a new profile
- **Responsive UI** with TailwindCSS

---

### 2. 🔍 Search & Filter
- A search bar to filter users by:
  - Name
  - Email
  - Department
- Multi-select filter dropdown:
  - By department
  - By rating (1–5 stars)

---

### 3. 👤 Dynamic User Details (`/employee/[id]`)
- Detailed profile page showing:
  - Address, Phone, Bio, and Performance History
  - Star rating & colored performance badges
- **Tabbed UI**:
  - `Overview`, `Projects`, `Feedback` (loads dynamically)

---

### 4. 📌 Bookmark Manager (`/bookmarks`)
- View all bookmarked employees
- Allows:
  - Remove bookmarks
  - Trigger `Promote` or `Assign to Project` (UI action only)
- Includes custom toast notifications like:
  > 💾 “The GOATs don’t wait – save ‘em or regret later.” 🐐

---

### 5. 📊 Analytics (`/analytics`)
- Charts powered by **Chart.js**
  - Department-wise average ratings
  - Bookmark activity trends (mocked)
- Fully responsive data visualizations

---

## ⚙️ Tech Stack

- **Frontend**: Next.js 15, React 19  
- **Styling**: Tailwind CSS, Shadcn UI, AOS (Animate on Scroll)  
- **Charts**: Chart.js + react-chartjs-2  
- **Animation**: Framer Motion  
- **State Management**: Context API  
- **Icons**: Lucide React  
- **Toasts**: react-hot-toast / sonner  

---

## 📦 Getting Started (Local Dev)

```bash
# 1. Clone the repo
git clone https://github.com/your-username/hr-dashboard-management.git
cd hr-dashboard-management

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
