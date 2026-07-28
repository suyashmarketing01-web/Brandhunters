import { Outlet, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ClientLayout() {
  const { logoutClient, clientInfo } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutClient();
    navigate('/portal/login');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f8f9fa',
        color: '#111',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Navbar */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              boxSizing: 'border-box',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
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
          <span
            style={{
              fontSize: '16px',
              fontWeight: 800,
              color: '#111',
              fontFamily: '"Space Grotesk", sans-serif',
              letterSpacing: '0.02em',
            }}
          >
            Brand Hunters
          </span>
        </div>

        {/* Client identity & Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right', display: 'none' }} className="client-meta-desktop">
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#111', margin: 0 }}>
              {clientInfo?.company_name}
            </p>
            {clientInfo?.contact_person && (
              <p style={{ fontSize: '11px', color: 'rgba(0,0,0,0.4)', margin: 0 }}>
                {clientInfo?.contact_person}
              </p>
            )}
          </div>

          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              borderRadius: '10px',
              border: '1px solid rgba(0,0,0,0.08)',
              background: 'rgba(0,0,0,0.02)',
              color: 'rgba(0,0,0,0.6)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.04)';
              (e.currentTarget as HTMLElement).style.color = '#111';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.02)';
              (e.currentTarget as HTMLElement).style.color = 'rgba(0,0,0,0.6)';
            }}
          >
            <LogOut size={16} />
            <span className="logout-text-desktop">Logout</span>
          </button>
        </div>
      </header>

      {/* Main layout context */}
      <main style={{ flex: 1, padding: '24px', maxWidth: '1200px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
        <Outlet />
      </main>

      <style>{`
        @media (min-width: 640px) {
          .client-meta-desktop {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
