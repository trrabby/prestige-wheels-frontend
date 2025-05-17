# 🚗 Prestige Wheels

**Prestige Wheels** is a modern and responsive car shop web application offering secure user authentication, intuitive product browsing, and seamless order management. Designed with both users and administrators in mind, it ensures a smooth and secure shopping experience.

## 🌟 Features

### 🔐 User Authentication
- Secure Registration and Login (Name, Email, Password)
- Passwords stored using hashing
- Role-based access (User / Admin)
- JWT token-based authentication
- Logout functionality with redirection

### 🏠 Public Pages
- **Home Page**:  
  - Logo, favicon, and navigation menu  
  - Banner with carousel or special offers  
  - 6 Featured Cars  
  - Testimonials / Blogs  
  - Footer with social links and contact details

- **All Products Page**:  
  - Search by brand, name, or category  
  - Filter by price, model, brand, category, availability  
  - Dynamic search and filter results  
  - Product cards with details and "View Details" button

- **Product Details Page**:  
  - Full product information with images  
  - “Buy Now” button redirects to Checkout

- **About Page**:  
  - Info about the shop, mission, and story

### 🔒 Private Pages
- **Checkout Page**:  
  - Order form with user/product info  
  - Quantity validation (stock check)  
  - Total price calculation  
  - SurjoPay integration for payments  
  - "Order Now" button

- **Dashboard**  
  - **User Dashboard**:  
    - View orders  
    - Manage profile  
    - Update password (with current password verification)  
  - **Admin Dashboard**:  
    - Manage Users (Activate/Deactivate)  
    - Manage Products (Create, Read, Update, Delete)  
    - Manage Orders (CRUD and status update)

### 🛠 Optional Features
- **Track Order Section (User Side)**:  
  - Display order progress (Pending → Delivered)  
  - Show delivery date, order ID, product details  
- **Admin Order Status Control**:  
  - Update order status and set delivery estimate  
  - Changes reflected in user dashboard

## 🖌 UI/UX
- Fully responsive design for all screen sizes
- Proper alignment, typography, and clean layout
- Friendly error messages:
  - Invalid login credentials
  - Duplicate registration
  - Failed operations (e.g., out-of-stock)
- Loading spinners during API calls
- Toast notifications for actions like login, order success

## 📂 Technologies Used
- Frontend: HTML, CSS, JavaScript / React (as per your stack)
- Backend: Node.js / Express.js
- Database: MongoDB / PostgreSQL
- Authentication: JWT
- Payment: SurjoPay Integration

## 🚀 Getting Started

<pre lang="markdown"> ```markdown ## 🚀 Getting Started 1. **Clone the repository** ```bash git clone https://github.com/trrabby/prestige-wheels-frontend.git cd prestige-wheels-frontend ``` 2. **Install dependencies** ```bash npm install ``` 3. **Set up environment variables** Create a `.env` file in the root directory and add: ```env DB_URL=your_database_url JWT_SECRET=your_secret_key NEXT_PUBLIC_API_URL=http://localhost:3000/api ``` 4. **Start the development server** ```bash npm run dev ``` > The app will be running at: `http://localhost:3000` ``` </pre>

