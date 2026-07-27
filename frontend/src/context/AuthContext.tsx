import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ClientInfo {
  id: string;
  company_name: string;
  contact_person?: string;
  email: string;
}

interface AuthContextType {
  // Admin
  adminToken: string | null;
  adminEmail: string | null;
  loginAdmin: (email: string, password: string) => Promise<void>;
  logoutAdmin: () => void;
  isAdminAuthenticated: boolean;

  // Client
  clientToken: string | null;
  clientInfo: ClientInfo | null;
  loginClient: (email: string, password: string) => Promise<void>;
  logoutClient: () => void;
  isClientAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const API_BASE = '/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [adminToken, setAdminToken] = useState<string | null>(() =>
    localStorage.getItem('bh_admin_token')
  );
  const [adminEmail, setAdminEmail] = useState<string | null>(() =>
    localStorage.getItem('bh_admin_email')
  );
  const [clientToken, setClientToken] = useState<string | null>(() =>
    localStorage.getItem('bh_client_token')
  );
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>(() => {
    const stored = localStorage.getItem('bh_client_info');
    return stored ? JSON.parse(stored) : null;
  });

  // Persist tokens
  useEffect(() => {
    if (adminToken) {
      localStorage.setItem('bh_admin_token', adminToken);
    } else {
      localStorage.removeItem('bh_admin_token');
    }
  }, [adminToken]);

  useEffect(() => {
    if (adminEmail) {
      localStorage.setItem('bh_admin_email', adminEmail);
    } else {
      localStorage.removeItem('bh_admin_email');
    }
  }, [adminEmail]);

  useEffect(() => {
    if (clientToken) {
      localStorage.setItem('bh_client_token', clientToken);
    } else {
      localStorage.removeItem('bh_client_token');
    }
  }, [clientToken]);

  useEffect(() => {
    if (clientInfo) {
      localStorage.setItem('bh_client_info', JSON.stringify(clientInfo));
    } else {
      localStorage.removeItem('bh_client_info');
    }
  }, [clientInfo]);

  const loginAdmin = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/auth/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Login failed');
    setAdminToken(data.token);
    setAdminEmail(data.email);
  };

  const logoutAdmin = () => {
    setAdminToken(null);
    setAdminEmail(null);
  };

  const loginClient = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/auth/client/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Login failed');
    setClientToken(data.token);
    setClientInfo(data.client);
  };

  const logoutClient = () => {
    setClientToken(null);
    setClientInfo(null);
  };

  return (
    <AuthContext.Provider
      value={{
        adminToken,
        adminEmail,
        loginAdmin,
        logoutAdmin,
        isAdminAuthenticated: !!adminToken,
        clientToken,
        clientInfo,
        loginClient,
        logoutClient,
        isClientAuthenticated: !!clientToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
