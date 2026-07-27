import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabase.js';
import { requireAdmin, requireClient, requireAuth } from '../middleware/auth.js';

export const postRouter = Router();

// ── GET /api/dashboard/admin ──────────────────────────────────
postRouter.get('/dashboard/admin', requireAdmin, async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('admin_dashboard')
      .select('*')
      .single();

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    console.error('❌ Error fetching dashboard:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// ── GET /api/posts ────────────────────────────────────────────
// Admin: all posts (with optional filters)
postRouter.get('/posts', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { client_id, status, date, from_date, to_date } = req.query;

    let query = supabase
      .from('posts')
      .select(`
        *,
        clients!inner ( id, company_name, email ),
        attachments ( id, file_name, file_url, file_type ),
        suggestions ( id, message, created_at )
      `)
      .order('scheduled_date', { ascending: false });

    if (client_id) query = query.eq('client_id', client_id as string);
    if (status) query = query.eq('status', status as string);
    if (date) query = query.eq('scheduled_date', date as string);
    if (from_date) query = query.gte('scheduled_date', from_date as string);
    if (to_date) query = query.lte('scheduled_date', to_date as string);

    const { data, error } = await query;
    if (error) throw error;

    res.json({ success: true, data: data || [] });
  } catch (error) {
    console.error('❌ Error fetching posts:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// ── GET /api/posts/client/me ──────────────────────────────────
// Client: own posts
postRouter.get('/posts/client/me', requireClient, async (req: Request, res: Response) => {
  try {
    const clientId = req.auth!.clientId;
    const { status, date } = req.query;

    let query = supabase
      .from('posts')
      .select(`
        *,
        attachments ( id, file_name, file_url, file_type )
      `)
      .eq('client_id', clientId!)
      .order('scheduled_date', { ascending: false });

    if (status) query = query.eq('status', status as string);
    if (date) query = query.eq('scheduled_date', date as string);

    const { data, error } = await query;
    if (error) throw error;

    res.json({ success: true, data: data || [] });
  } catch (error) {
    console.error('❌ Error fetching client posts:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// ── POST /api/posts ───────────────────────────────────────────
postRouter.post('/posts', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { client_id, title, description, scheduled_date, scheduled_time, admin_notes } = req.body;

    if (!client_id || !scheduled_date) {
      res.status(400).json({ success: false, error: 'client_id and scheduled_date are required' });
      return;
    }

    const { data, error } = await supabase
      .from('posts')
      .insert({
        client_id,
        title: title || null,
        description: description || null,
        scheduled_date,
        scheduled_time: scheduled_time || null,
        admin_notes: admin_notes || null,
      })
      .select('*')
      .single();

    if (error) throw error;

    console.log(`✅ New post created for client ${client_id}: ${title || 'Untitled'}`);
    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error('❌ Error creating post:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// ── GET /api/posts/:id ────────────────────────────────────────
postRouter.get('/posts/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    let query = supabase
      .from('posts')
      .select(`
        *,
        clients ( id, company_name, email ),
        attachments ( id, file_name, file_url, file_type, uploaded_at ),
        suggestions ( id, client_id, message, created_at ),
        post_status_history ( id, old_status, new_status, changed_by, changed_at )
      `)
      .eq('id', id);

    // If client, ensure they can only see their own
    if (req.auth!.role === 'client') {
      query = query.eq('client_id', req.auth!.clientId!);
    }

    const { data, error } = await query.single();
    if (error || !data) {
      res.status(404).json({ success: false, error: 'Post not found' });
      return;
    }

    res.json({ success: true, data });
  } catch (error) {
    console.error('❌ Error fetching post:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// ── PUT /api/posts/:id ────────────────────────────────────────
postRouter.put('/posts/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, scheduled_date, scheduled_time, admin_notes, status } = req.body;

    const updates: Record<string, unknown> = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (scheduled_date !== undefined) updates.scheduled_date = scheduled_date;
    if (scheduled_time !== undefined) updates.scheduled_time = scheduled_time;
    if (admin_notes !== undefined) updates.admin_notes = admin_notes;

    // If admin changes status, record in history
    if (status !== undefined) {
      const { data: current } = await supabase
        .from('posts')
        .select('status')
        .eq('id', id)
        .single();

      updates.status = status;

      if (current && current.status !== status) {
        await supabase.from('post_status_history').insert({
          post_id: id,
          old_status: current.status,
          new_status: status,
          changed_by: 'admin',
        });
      }
    }

    const { data, error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', id)
      .select('*')
      .single();

    if (error) throw error;
    if (!data) {
      res.status(404).json({ success: false, error: 'Post not found' });
      return;
    }

    res.json({ success: true, data });
  } catch (error) {
    console.error('❌ Error updating post:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// ── DELETE /api/posts/:id ─────────────────────────────────────
postRouter.delete('/posts/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Delete attachments from storage first
    const { data: attachments } = await supabase
      .from('attachments')
      .select('file_url')
      .eq('post_id', id);

    if (attachments && attachments.length > 0) {
      const paths = attachments
        .map((a) => {
          const url = a.file_url;
          const match = url.match(/\/storage\/v1\/object\/public\/post-attachments\/(.+)/);
          return match ? match[1] : null;
        })
        .filter(Boolean) as string[];

      if (paths.length > 0) {
        await supabase.storage.from('post-attachments').remove(paths);
      }
    }

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ success: true, message: 'Post deleted' });
  } catch (error) {
    console.error('❌ Error deleting post:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// ── PATCH /api/posts/:id/status ───────────────────────────────
// Client approves or declines a post
postRouter.patch('/posts/:id/status', requireClient, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const clientId = req.auth!.clientId;

    if (!status || !['Approved', 'Declined'].includes(status)) {
      res.status(400).json({ success: false, error: 'Status must be Approved or Declined' });
      return;
    }

    // Verify post belongs to client
    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('status')
      .eq('id', id)
      .eq('client_id', clientId!)
      .single();

    if (fetchError || !post) {
      res.status(404).json({ success: false, error: 'Post not found' });
      return;
    }

    // Record status change
    await supabase.from('post_status_history').insert({
      post_id: id,
      old_status: post.status,
      new_status: status,
      changed_by: 'client',
    });

    const { data, error } = await supabase
      .from('posts')
      .update({ status })
      .eq('id', id)
      .select('*')
      .single();

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    console.error('❌ Error updating post status:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});
