import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabase.js';
import { requireAuth, requireClient } from '../middleware/auth.js';

export const suggestionRouter = Router();

// ── POST /api/suggestions ─────────────────────────────────────
suggestionRouter.post('/suggestions', requireClient, async (req: Request, res: Response) => {
  try {
    const { post_id, message } = req.body;
    const clientId = req.auth!.clientId;

    if (!post_id || !message) {
      res.status(400).json({ success: false, error: 'post_id and message are required' });
      return;
    }

    // Verify post belongs to client
    const { data: post } = await supabase
      .from('posts')
      .select('id')
      .eq('id', post_id)
      .eq('client_id', clientId!)
      .single();

    if (!post) {
      res.status(404).json({ success: false, error: 'Post not found' });
      return;
    }

    const { data, error } = await supabase
      .from('suggestions')
      .insert({
        post_id,
        client_id: clientId,
        message,
      })
      .select('*')
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error('❌ Error creating suggestion:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// ── GET /api/suggestions/:postId ──────────────────────────────
suggestionRouter.get('/suggestions/:postId', requireAuth, async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    // If client, verify post belongs to them
    if (req.auth!.role === 'client') {
      const { data: post } = await supabase
        .from('posts')
        .select('id')
        .eq('id', postId)
        .eq('client_id', req.auth!.clientId!)
        .single();

      if (!post) {
        res.status(404).json({ success: false, error: 'Post not found' });
        return;
      }
    }

    const { data, error } = await supabase
      .from('suggestions')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    res.json({ success: true, data: data || [] });
  } catch (error) {
    console.error('❌ Error fetching suggestions:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});
