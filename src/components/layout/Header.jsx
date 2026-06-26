import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Search, ChevronDown } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';
import { NAV_ITEMS } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchTerm.trim();
    navigate(query ? `/search?q=${encodeURIComponent(query)}` : '/search');
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass bg-[var(--bekri-bg)]/80 shadow-lg shadow-black/5 dark:shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-sm bg-[var(--bekri-accent)] flex items-center justify-center">
                <span className="text-white font-bold text-sm md:text-lg">B</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[var(--bekri-text)] font-bold text-sm md:text-base tracking-wide">سنگ بکری</span>
                <span className="text-[var(--bekri-text-secondary)] dark:text-white/80 text-[10px] md:text-xs tracking-widest">BEKRI STONE</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.path)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.path}
                    className={`px-4 py-2 text-sm font-medium transition-colors duration-300 flex items-center gap-1 ${
                      location.pathname === item.path
                        ? 'text-[var(--bekri-accent)]'
                        : 'text-[var(--bekri-text)] dark:text-white hover:text-[var(--bekri-accent)] dark:hover:text-[var(--bekri-accent)]'
                    }`}
                  >
                    {item.label}
                    {item.children && <ChevronDown className="w-3 h-3" />}
                  </Link>
                  {item.children && (
                    <AnimatePresence>
                      {activeDropdown === item.path && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.25 }}
                          className="absolute top-full right-0 mt-1 w-48 py-2 rounded-lg glass bg-[var(--bekri-card)]/95 shadow-xl shadow-black/10 dark:shadow-black/30 border border-[var(--bekri-border)]"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className="block px-4 py-2.5 text-sm text-[var(--bekri-text)] dark:text-white hover:text-[var(--bekri-accent)] hover:bg-[var(--bekri-accent)]/5 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[var(--bekri-text)] dark:text-white hover:text-[var(--bekri-accent)] transition-colors border border-[var(--bekri-border)] hover:border-[var(--bekri-accent)]/40"
                aria-label="تغییر تم"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>

              <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--bekri-text)] dark:text-white pointer-events-none" />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="جستجوی سنگ..."
                  className="w-36 xl:w-44 h-10 pr-9 pl-3 rounded-full text-sm bg-transparent border border-[var(--bekri-border)] text-[var(--bekri-text)] dark:text-white placeholder:text-[var(--bekri-text)] dark:placeholder:text-white focus:outline-none focus:border-[var(--bekri-accent)]/60 transition-colors"
                  aria-label="جستجوی سنگ"
                />
              </form>

              <Link
                to="/contact"
                className="hidden md:flex items-center px-5 py-2 rounded-full text-sm font-medium bg-[var(--bekri-accent)] text-white hover:opacity-90 transition-opacity"
              >
                درخواست مشاوره
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center text-[var(--bekri-text)]"
                aria-label="منو"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute top-0 right-0 bottom-0 w-[300px] bg-[var(--bekri-bg)] shadow-2xl p-6 pt-24 overflow-y-auto"
            >
              <div className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <div key={item.path}>
                    <Link
                      to={item.path}
                      className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                        location.pathname === item.path
                          ? 'text-[var(--bekri-accent)] bg-[var(--bekri-accent)]/10'
                          : 'text-[var(--bekri-text)] hover:bg-[var(--bekri-surface)]'
                      }`}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="pr-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="block px-4 py-2.5 text-sm text-[var(--bekri-text-secondary)] hover:text-[var(--bekri-accent)] transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--bekri-text-secondary)] pointer-events-none" />
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="جستجوی محصول یا سنگ..."
                    className="w-full h-12 pr-11 pl-4 rounded-full text-sm bg-[var(--bekri-surface)] border border-[var(--bekri-border)] text-[var(--bekri-text)] placeholder:text-[var(--bekri-text-secondary)] focus:outline-none focus:border-[var(--bekri-accent)]/60 transition-colors"
                    aria-label="جستجوی محصول یا سنگ"
                  />
                </form>
                <Link
                  to="/contact"
                  className="flex items-center justify-center px-4 py-3 rounded-full text-sm font-medium bg-[var(--bekri-accent)] text-white"
                >
                  درخواست مشاوره
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}