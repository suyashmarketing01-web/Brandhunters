import { Outlet, useNavigate } from 'react-router-dom';
import { LogOut, MessageCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ClientLayout() {
  const { logoutClient, clientInfo } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutClient();
    navigate('/portal/login');
  };

  // Marquee text repeated for seamless loop
  const marqueeText = '🔥 Every post will have more than 1000+ views   •   🚀 Guaranteed reach & engagement   •   ✨ Premium social media marketing   •   ';

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
      {/* ═══ Scrolling Marquee Banner ═══ */}
      <div
        style={{
          background: 'linear-gradient(90deg, #C20000, #FF2222, #C20000)',
          color: '#ffffff',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          position: 'relative',
          zIndex: 101,
          padding: '10px 0',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 2px 12px rgba(194, 0, 0, 0.3)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            animation: 'marqueeScroll 20s linear infinite',
          }}
        >
          {/* Duplicate text 4 times for seamless loop */}
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              style={{
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                fontFamily: '"Space Grotesk", sans-serif',
                paddingRight: '60px',
              }}
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

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

      {/* ═══ Floating WhatsApp Support Button ═══ */}
      <a
        href="https://wa.me/917798484935?text=Hi%20Brand%20Hunters%2C%20I%20need%20support%20with%20my%20account."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: '#25D366',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(37, 211, 102, 0.45), 0 2px 8px rgba(0,0,0,0.1)',
          zIndex: 9999,
          textDecoration: 'none',
          transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(37, 211, 102, 0.55), 0 4px 12px rgba(0,0,0,0.12)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.45), 0 2px 8px rgba(0,0,0,0.1)';
        }}
        title="Chat with us on WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* WhatsApp tooltip label */}
      <div
        className="whatsapp-label"
        style={{
          position: 'fixed',
          bottom: '40px',
          right: '96px',
          background: '#ffffff',
          color: '#111',
          padding: '8px 14px',
          borderRadius: '10px',
          fontSize: '13px',
          fontWeight: 600,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          zIndex: 9998,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          animation: 'fadeInLabel 0.5s ease 2s forwards',
          opacity: 0,
          fontFamily: '"Space Grotesk", sans-serif',
        }}
      >
        Need help? Chat with us! 💬
      </div>

      <style>{`
        @media (min-width: 640px) {
          .client-meta-desktop {
            display: block !important;
          }
        }

        /* Marquee infinite scroll animation */
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* WhatsApp button pulse ring */
        .whatsapp-fab::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid #25D366;
          animation: whatsappPulse 2s ease-out infinite;
        }

        @keyframes whatsappPulse {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }

        /* Tooltip fade in after delay */
        @keyframes fadeInLabel {
          0% {
            opacity: 0;
            transform: translateX(10px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Hide tooltip on mobile to save space */
        @media (max-width: 640px) {
          .whatsapp-label {
            display: none !important;
          }
          .whatsapp-fab {
            bottom: 20px !important;
            right: 20px !important;
            width: 52px !important;
            height: 52px !important;
          }
        }
      `}</style>
    </div>
  );
}
