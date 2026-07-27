import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { supabase } from '../lib/supabase.js';
import { requireAdmin } from '../middleware/auth.js';

export const clientRouter = Router();

// ── GET /api/clients ──────────────────────────────────────────
clientRouter.get('/clients', requireAdmin, async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('id, company_name, contact_person, email, is_active, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Fetch post counts per client
    const clientsWithCounts = await Promise.all(
      (data || []).map(async (client) => {
        const { count } = await supabase
          .from('posts')
          .select('*', { count: 'exact', head: true })
          .eq('client_id', client.id);

        const { count: pendingCount } = await supabase
          .from('posts')
          .select('*', { count: 'exact', head: true })
          .eq('client_id', client.id)
          .eq('status', 'Pending');

        return {
          ...client,
          total_posts: count || 0,
          pending_posts: pendingCount || 0,
        };
      })
    );

    res.json({ success: true, data: clientsWithCounts });
  } catch (error) {
    console.error('❌ Error fetching clients:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// ── POST /api/clients ─────────────────────────────────────────
clientRouter.post('/clients', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { company_name, contact_person, email, password } = req.body;

    if (!company_name || !email || !password) {
      res.status(400).json({ success: false, error: 'company_name, email, and password are required' });
      return;
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 12);

    const { data, error } = await supabase
      .from('clients')
      .insert({
        company_name,
        contact_person: contact_person || null,
        email,
        password_hash,
      })
      .select('id, company_name, contact_person, email, is_active, created_at')
      .single();

    if (error) {
      if (error.code === '23505') {
        res.status(409).json({ success: false, error: 'A client with this email already exists' });
        return;
      }
      throw error;
    }

    console.log(`✅ New client created: ${company_name} (${email})`);
    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error('❌ Error creating client:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// ── GET /api/clients/:id ──────────────────────────────────────
clientRouter.get('/clients/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('clients')
      .select('id, company_name, contact_person, email, is_active, created_at')
      .eq('id', id)
      .single();

    if (error || !data) {
      res.status(404).json({ success: false, error: 'Client not found' });
      return;
    }

    res.json({ success: true, data });
  } catch (error) {
    console.error('❌ Error fetching client:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// ── PUT /api/clients/:id ──────────────────────────────────────
clientRouter.put('/clients/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { company_name, contact_person, email, password, is_active } = req.body;

    const updates: Record<string, unknown> = {};
    if (company_name !== undefined) updates.company_name = company_name;
    if (contact_person !== undefined) updates.contact_person = contact_person;
    if (email !== undefined) updates.email = email;
    if (is_active !== undefined) updates.is_active = is_active;
    if (password) updates.password_hash = await bcrypt.hash(password, 12);

    const { data, error } = await supabase
      .from('clients')
      .update(updates)
      .eq('id', id)
      .select('id, company_name, contact_person, email, is_active, created_at')
      .single();

    if (error) throw error;
    if (!data) {
      res.status(404).json({ success: false, error: 'Client not found' });
      return;
    }

    res.json({ success: true, data });
  } catch (error) {
    console.error('❌ Error updating client:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// ── DELETE /api/clients/:id ───────────────────────────────────
clientRouter.delete('/clients/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ success: true, message: 'Client deleted' });
  } catch (error) {
    console.error('❌ Error deleting client:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});
