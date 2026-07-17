import { Routes, Route } from "react-router-dom";

/* ROUTE GUARDS */
import ProtectedRoute from "../routes/ProtectedRoute";
import AdminRoute from "../routes/AdminRoute";
import ProviderRoute from "../routes/ProviderRoute";
import GuestRoute from "../routes/GuestRoute";

/* HOME */
import Home from "../pages/home/Home";
import About from "../pages/home/About";
import Contact from "../pages/home/Contact";
import NotFound from "../pages/home/NotFound";

/* AUTH */
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

/* CUSTOMER */
import CustomerDashboard from "../pages/customer/Dashboard";
import SearchProviders from "../pages/customer/SearchProviders";
import ProviderDetails from "../pages/customer/ProviderDetails";
import CreateBooking from "../pages/customer/CreateBooking";
import MyBookings from "../pages/customer/MyBookings";
import CustomerPayments from "../pages/customer/Payments";
import CustomerReviews from "../pages/customer/Reviews";
import CustomerProfile from "../pages/customer/Profile";
import CustomerComplaints from "../pages/customer/Complaints";
import PaymentPage from "../pages/customer/PaymentPage";
import CreateInstantBooking from "../pages/customer/CreateInstantBooking";

/* PROVIDER */
import ProviderDashboard from "../pages/provider/Dashboard";
import Jobs from "../pages/provider/Jobs";
import Availability from "../pages/provider/Availability";
import Earnings from "../pages/provider/Earnings";
import ProviderReviews from "../pages/provider/Reviews";
import ProviderProfile from "../pages/provider/Profile";
import ProviderComplaints from "../pages/provider/Complaints";

/* ADMIN */
import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Providers from "../pages/admin/Providers";
import Bookings from "../pages/admin/Bookings";
import AdminPayments from "../pages/admin/Payments";
import Reports from "../pages/admin/Reports";
import Complaints from "../pages/admin/Complaints";
import Settings from "../pages/admin/Settings";
import ProviderUpdateRequests from "../pages/admin/ProviderUpdateRequests";
import SearchingProvider from "../pages/customer/SearchingProvider";

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* GUEST */}
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Route>

      {/* PUBLIC PASSWORD ROUTES */}

      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/reset-password" element={<ResetPassword />} />

      {/* CUSTOMER */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard/customer" element={<CustomerDashboard />} />

        <Route path="/customer/providers" element={<SearchProviders />} />
        <Route path="/customer/providers/:id" element={<ProviderDetails />} />
        <Route path="/customer/bookings/create" element={<CreateBooking />} />
        <Route path="/customer/bookings" element={<MyBookings />} />
        <Route path="/customer/payments" element={<CustomerPayments />} />
        <Route path="/customer/reviews" element={<CustomerReviews />} />
        <Route path="/customer/profile" element={<CustomerProfile />} />
        <Route path="/customer/complaints" element={<CustomerComplaints />} />
        <Route path="/payment/:bookingId" element={<PaymentPage />} />
        <Route path="/customer/instant-booking" element={<CreateInstantBooking />} />
        <Route
    path="/customer/searching/:bookingId"
    element={<SearchingProvider />}
/>
      </Route>

      {/* PROVIDER */}
      <Route element={<ProviderRoute />}>
        <Route path="/dashboard/provider" element={<ProviderDashboard />} />
        <Route path="/provider/jobs" element={<Jobs />} />
        <Route path="/provider/availability" element={<Availability />} />
        <Route path="/provider/earnings" element={<Earnings />} />
        <Route path="/provider/reviews" element={<ProviderReviews />} />
        <Route path="/provider/profile" element={<ProviderProfile />} />
        <Route path="/provider/complaints" element={<ProviderComplaints />} />
      </Route>

      {/* ADMIN */}
      <Route element={<AdminRoute />}>
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/providers" element={<Providers />} />
        <Route path="/admin/providers/provider-update-requests" element={<ProviderUpdateRequests />} />
        <Route path="/admin/bookings" element={<Bookings />} />
        <Route path="/admin/payments" element={<AdminPayments />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/complaints" element={<Complaints />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
