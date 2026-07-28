import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Users, FileImage, Clock, CheckCircle,
  XCircle, Calendar, TrendingUp, ArrowUpRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface DashboardStats {
  total_clients: number;
  total_posts: number;
  pending_posts: number;
  approved_posts: number;
  declined_posts: number;
  todays_posts: number;
  upcoming_posts: number;
}

const statCards = [
  { key: 'total_clients', label: 'Total Clients', icon: Users, color: '#6366F1', gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)' },
  { key: 'total_posts', label: 'Total Posts', icon: FileImage, color: '#3B82F6', gradient: 'linear-gradient(135deg, #3B82F6, #60A5FA)' },
  { key: 'pending_posts', label: 'Pending', icon: Clock, color: '#F59E0B', gradient: 'linear-gradient(135deg, #F59E0B, #FBBF24)' },
  { key: 'approved_posts', label: 'Approved', icon: CheckCircle, color: '#10B981', gradient: 'linear-gradient(135deg, #10B981, #34D399)' },
  { key: 'declined_posts', label: 'Declined', icon: XCircle, color: '#EF4444', gradient: 'linear-gradient(135deg, #EF4444, #F87171)' },
  { key: 'todays_posts', label: "Today's Posts", icon: Calendar, color: '#EC4899', gradient: 'linear-gradient(135deg, #EC4899, #F472B6)' },
  { key: 'upcoming_posts', label: 'Upcoming', icon: TrendingUp, color: '#14B8A6', gradient: 'linear-gradient(135deg, #14B8A6, #2DD4BF)' },
];

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { adminToken } = useAuth();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch('/api/dashboard/admin', {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const data = await res.json();
      if (data.success) setStats(data.data);
    } catch (err) {
      console.error('Failed to fetch dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '60vh',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(0,0,0,0.1)',
            borderTopColor: '#C20000',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 800,
            color: '#111',
            fontFamily: '"Space Grotesk", sans-serif',
            marginBottom: '8px',
          }}
        >
          Dashboard
        </h1>
        <p style={{ color: 'rgba(0,0,0,0.5)', fontSize: '14px' }}>
          Overview of your content management platform
        </p>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        {statCards.map((card, i) => {
          const Icon = card.icon;
          const value = stats ? (stats as any)[card.key] : 0;

          return (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: '16px',
                padding: '24px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
              }}
              whileHover={{
                y: -2,
                borderColor: `${card.color}33`,
                boxShadow: `0 8px 30px ${card.color}15`,
              }}
            >
              {/* Background gradient accent */}
              <div
                style={{
                  position: 'absolute',
                  top: '-30px',
                  right: '-30px',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: card.gradient,
                  opacity: 0.08,
                }}
              />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: `${card.color}15`,
                    border: `1px solid ${card.color}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={20} style={{ color: card.color }} />
                </div>
                <ArrowUpRight
                  size={16}
                  style={{ color: 'rgba(0,0,0,0.2)' }}
                />
              </div>

              <p
                style={{
                  fontSize: '32px',
                  fontWeight: 800,
                  color: '#111',
                  marginBottom: '4px',
                  fontFamily: '"Space Grotesk", sans-serif',
                  margin: '0 0 4px 0',
                }}
              >
                {value}
              </p>
              <p
                style={{
                  fontSize: '13px',
                  color: 'rgba(0,0,0,0.5)',
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                {card.label}
              </p>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
