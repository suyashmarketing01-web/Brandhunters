import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus, Users, Mail, FileImage, Clock,
  X, Building, User, Lock, Search,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';


interface Client {
  id: string;
  company_name: string;
  contact_person: string | null;
  email: string;
  is_active: boolean;
  created_at: string;
  total_posts: number;
  pending_posts: number;
}

export default function ClientsList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    company_name: '',
    contact_person: '',
    email: '',
    password: '',
  });
  const [showEdit, setShowEdit] = useState(false);
  const [editClient, setEditClient] = useState<Client | null>(null);
  const [editForm, setEditForm] = useState({
    company_name: '',
    contact_person: '',
    email: '',
    password: '',
  });
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const { adminToken } = useAuth();
  const navigate = useNavigate();

  const handleOpenEdit = (client: Client) => {
    setEditClient(client);
    setEditForm({
      company_name: client.company_name,
      contact_person: client.contact_person || '',
      email: client.email,
      password: '',
    });
    setError('');
    setShowEdit(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editClient) return;
    setError('');
    setUpdating(true);
    try {
      const body: any = {
        company_name: editForm.company_name,
        contact_person: editForm.contact_person,
        email: editForm.email,
      };
      if (editForm.password) {
        body.password = editForm.password;
      }
      
      const res = await fetch(`/api/clients/${editClient.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      
      setShowEdit(false);
      fetchClients();
    } catch (err: any) {
      setError(err.message || 'Failed to update client');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (clientId: string) => {
    if (!confirm('Are you absolutely sure you want to delete this client? All their posts and uploads will be permanently removed.')) {
      return;
    }
    try {
      const res = await fetch(`/api/clients/${clientId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      fetchClients();
    } catch (err: any) {
      alert(err.message || 'Failed to delete client');
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await fetch('/api/clients', {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const data = await res.json();
      if (data.success) setClients(data.data);
    } catch (err) {
      console.error('Failed to fetch clients:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setCreating(true);
    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setShowCreate(false);
      setForm({ company_name: '', contact_person: '', email: '', password: '' });
      fetchClients();
    } catch (err: any) {
      setError(err.message || 'Failed to create client');
    } finally {
      setCreating(false);
    }
  };

  const filtered = clients.filter(
    (c) =>
      c.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#C20000', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', fontFamily: '"Space Grotesk", sans-serif', marginBottom: '6px' }}>
            Clients
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
            {clients.length} client{clients.length !== 1 ? 's' : ''} registered
          </p>
        </div>

        <button
          onClick={() => setShowCreate(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: 'linear-gradient(135deg, #C20000, #FF4444)',
            border: 'none',
            borderRadius: '12px',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(194,0,0,0.3)',
            transition: 'all 0.3s ease',
          }}
        >
          <Plus size={18} /> Add Client
        </button>
      </div>

      {/* Search */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          marginBottom: '24px',
        }}
      >
        <Search size={18} style={{ color: 'rgba(255,255,255,0.3)' }} />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search clients..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#fff',
            fontSize: '14px',
          }}
        />
      </div>

      {/* Client cards grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
        }}
      >
        {filtered.map((client, i) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -4, borderColor: 'rgba(194,0,0,0.3)' }}
            onClick={() => navigate(`/admin/clients/${client.id}/posts`)}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background accent */}
            <div
              style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #C20000, #FF4444)',
                opacity: 0.04,
              }}
            />

            {/* Company name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(194,0,0,0.2), rgba(255,68,68,0.2))',
                  border: '1px solid rgba(194,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#FF4444',
                }}
              >
                {client.company_name.charAt(0).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {client.company_name}
                </h3>
                {client.contact_person && (
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                    {client.contact_person}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginBottom: '16px' }}>
              <Mail size={14} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {client.email}
              </span>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FileImage size={14} style={{ color: '#3B82F6' }} />
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                  {client.total_posts} posts
                </span>
              </div>
              {client.pending_posts > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} style={{ color: '#F59E0B' }} />
                  <span style={{ fontSize: '13px', color: '#F59E0B' }}>
                    {client.pending_posts} pending
                  </span>
                </div>
              )}
            </div>

            {/* Actions: Edit Password & Delete */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '8px',
                marginTop: '16px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingTop: '12px',
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenEdit(client);
                }}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '6px 12px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}
              >
                Edit / Password
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(client.id);
                }}
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '8px',
                  color: '#EF4444',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '6px 12px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(239, 68, 68, 0.2)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(239, 68, 68, 0.1)'; }}
              >
                Remove
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Users size={48} style={{ color: 'rgba(255,255,255,0.1)', margin: '0 auto 16px' }} />
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '16px' }}>
            {searchQuery ? 'No clients match your search' : 'No clients yet. Create your first client!'}
          </p>
        </div>
      )}

      {/* Create Client Modal */}
      <AnimatePresence>
        {showCreate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCreate(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(8px)',
              padding: '20px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#0f0f14',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.1)',
                width: '100%',
                maxWidth: '460px',
                padding: '32px',
              }}
            >
              {/* Modal header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#fff' }}>
                  Create Client
                </h2>
                <button
                  onClick={() => setShowCreate(false)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.04)',
                    color: 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleCreate}>
                {/* Company Name */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Company Name *
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                    <Building size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
                    <input
                      value={form.company_name}
                      onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                      placeholder="Acme Corp"
                      required
                      style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '14px' }}
                    />
                  </div>
                </div>

                {/* Contact Person */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Contact Person
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                    <User size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
                    <input
                      value={form.contact_person}
                      onChange={(e) => setForm({ ...form, contact_person: e.target.value })}
                      placeholder="John Doe"
                      style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '14px' }}
                    />
                  </div>
                </div>

                {/* Email */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Email *
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                    <Mail size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="client@company.com"
                      required
                      style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '14px' }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Password *
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                    <Lock size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
                    <input
                      type="password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="Set a password for the client"
                      required
                      style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '14px' }}
                    />
                  </div>
                </div>

                {error && (
                  <p style={{ color: '#EF4444', fontSize: '13px', marginBottom: '16px', padding: '10px', background: 'rgba(239,68,68,0.1)', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.2)' }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={creating}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: 'linear-gradient(135deg, #C20000, #FF4444)',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: creating ? 'wait' : 'pointer',
                    boxShadow: '0 4px 24px rgba(194,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  {creating ? 'Creating...' : <><Plus size={18} /> Create Client</>}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Client Modal */}
      <AnimatePresence>
        {showEdit && editClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEdit(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(8px)',
              padding: '20px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#0f0f14',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.1)',
                width: '100%',
                maxWidth: '460px',
                padding: '32px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#fff' }}>
                  Edit Client Profile
                </h2>
                <button
                  onClick={() => setShowEdit(false)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.04)',
                    color: 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleUpdate}>
                {/* Company Name */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Company Name *
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                    <Building size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
                    <input
                      value={editForm.company_name}
                      onChange={(e) => setEditForm({ ...editForm, company_name: e.target.value })}
                      placeholder="Acme Corp"
                      required
                      style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '14px' }}
                    />
                  </div>
                </div>

                {/* Contact Person */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Contact Person
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                    <User size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
                    <input
                      value={editForm.contact_person}
                      onChange={(e) => setEditForm({ ...editForm, contact_person: e.target.value })}
                      placeholder="John Doe"
                      style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '14px' }}
                    />
                  </div>
                </div>

                {/* Email */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Email *
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                    <Mail size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      placeholder="client@company.com"
                      required
                      style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '14px' }}
                    />
                  </div>
                </div>

                {/* Password Change */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    New Password (leave blank to keep current)
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                    <Lock size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
                    <input
                      type="password"
                      value={editForm.password}
                      onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                      placeholder="Enter new password"
                      style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '14px' }}
                    />
                  </div>
                </div>

                {error && (
                  <p style={{ color: '#EF4444', fontSize: '13px', marginBottom: '16px', padding: '10px', background: 'rgba(239,68,68,0.1)', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.2)' }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={updating}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: 'linear-gradient(135deg, #C20000, #FF4444)',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: updating ? 'wait' : 'pointer',
                    boxShadow: '0 4px 24px rgba(194,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  {updating ? 'Updating...' : 'Save Changes'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
