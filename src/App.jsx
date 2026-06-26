import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import { ThemeProvider } from '@/lib/ThemeContext';

import SiteLayout from '@/components/layout/SiteLayout';
import Home from '@/pages/Home';
import Collections from '@/pages/Collections';
import CollectionDetail from '@/pages/CollectionDetail';
import ProductDetail from '@/pages/ProductDetail';
import SearchPage from '@/pages/Search';
import Projects from '@/pages/Projects';
import Magazine from '@/pages/Magazine';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Admin from '@/pages/Admin';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <ScrollToTop />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              <Route element={<SiteLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/collection/:category" element={<CollectionDetail />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/magazine" element={<Magazine />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Router>
          <Toaster />
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App