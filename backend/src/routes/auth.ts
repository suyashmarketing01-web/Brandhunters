import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { supabase } from '../lib/supabase.js';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@brandhunters.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export const authRouter = Router();

// ── POST /api/auth/admin/login ────────────────────────────────
authRouter.post('/auth/admin/login', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, error: 'Email and password required' });
      return;
    }

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { role: 'admin', email } as const,
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ success: true, token, role: 'admin', email });
  } catch (error) {
    console.error('❌ Admin login error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// ── POST /api/auth/client/login ───────────────────────────────
authRouter.post('/auth/client/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, error: 'Email and password required' });
      return;
    }

    // Fetch client by email
    const { data: client, error } = await supabase
      .from('clients')
      .select('*')
      .eq('email', email)
      .eq('is_active', true)
      .single();

    if (error || !client) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }

    // Verify password
    const isValid = await bcrypt.compare(password, client.password_hash);
    if (!isValid) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { role: 'client', clientId: client.id, email: client.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      role: 'client',
      client: {
        id: client.id,
        company_name: client.company_name,
        contact_person: client.contact_person,
        email: client.email,
      },
    });
  } catch (error) {
    console.error('❌ Client login error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});
