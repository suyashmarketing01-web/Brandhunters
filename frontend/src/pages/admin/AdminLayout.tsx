import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  LayoutDashboard, Users, FileImage, LogOut,
  Menu, X, ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { path: '/admin/clients', label: 'Clients', icon: Users, end: false },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logoutAdmin, adminEmail } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const SidebarContent = () => (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 12px',
      }}
    >
      {/* Brand */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '8px 12px',
          marginBottom: '32px',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            padding: '6px',
            boxSizing: 'border-box'
          }}
        >
          <img
            src="/images/logo-icon.png"
            alt="Brand Hunters Logo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
        {sidebarOpen && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontSize: '16px',
              fontWeight: 800,
              color: '#fff',
              fontFamily: '"Space Grotesk", sans-serif',
              whiteSpace: 'nowrap',
            }}
          >
            Brand Hunters
          </motion.span>
        )}
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            onClick={() => setMobileOpen(false)}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 14px',
              borderRadius: '12px',
              textDecoration: 'none',
              color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
              background: isActive
                ? 'rgba(194, 0, 0, 0.15)'
                : 'transparent',
              border: isActive
                ? '1px solid rgba(194, 0, 0, 0.3)'
                : '1px solid transparent',
              fontSize: '14px',
              fontWeight: isActive ? 600 : 400,
              transition: 'all 0.2s ease',
            })}
          >
            <item.icon size={20} />
            {sidebarOpen && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User / Logout */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '16px',
        }}
      >
        {sidebarOpen && (
          <p
            style={{
              fontSize: '11px',
              color: 'rgba(255,255,255,0.3)',
              padding: '0 14px',
              marginBottom: '8px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {adminEmail}
          </p>
        )}
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 14px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.03)',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <LogOut size={18} />
          {sidebarOpen && 'Logout'}
        </button>
      </div>
    </div>
  );

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#0A0A0F',
        color: '#fff',
      }}
    >
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 72 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          background: 'rgba(255,255,255,0.02)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          zIndex: 50,
          overflow: 'hidden',
          display: 'none',
        }}
        className="admin-sidebar-desktop"
      >
        <SidebarContent />
        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            position: 'absolute',
            top: '28px',
            right: '-14px',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.1)',
            background: '#0A0A0F',
            color: 'rgba(255,255,255,0.5)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
        >
          <ChevronRight
            size={14}
            style={{
              transform: sidebarOpen ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.3s ease',
            }}
          />
        </button>
      </motion.aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 90,
          }}
        />
      )}

      {/* Mobile sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: mobileOpen ? 0 : -280 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          width: '260px',
          background: '#0A0A0F',
          borderRight: '1px solid rgba(255,255,255,0.08)',
          zIndex: 100,
          display: 'block',
        }}
        className="admin-sidebar-mobile"
      >
        <SidebarContent />
      </motion.aside>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
        className="admin-main-content"
      >
        {/* Top bar */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(10, 10, 15, 0.8)',
            backdropFilter: 'blur(10px)',
            position: 'sticky',
            top: 0,
            zIndex: 40,
          }}
        >
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              padding: '8px',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            className="admin-mobile-toggle"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #C20000, #FF4444)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontWeight: 700,
                color: '#fff',
              }}
            >
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: '24px' }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .admin-sidebar-desktop {
            display: block !important;
          }
          .admin-sidebar-mobile {
            display: none !important;
          }
          .admin-mobile-toggle {
            display: none !important;
          }
          .admin-main-content {
            margin-left: ${sidebarOpen ? '240px' : '72px'};
            transition: margin-left 0.3s ease;
          }
        }
      `}</style>
    </div>
  );
}
