import { Router, Request, Response } from 'express';
import multer from 'multer';
import { supabase } from '../lib/supabase.js';
import { requireAdmin } from '../middleware/auth.js';

export const uploadRouter = Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB limit
  },
  fileFilter: (_req, file, cb) => {
    const allowed = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'video/mp4', 'video/quicktime', 'video/webm', 'video/x-msvideo',
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} not allowed`));
    }
  },
});

// ── POST /api/upload/:postId ──────────────────────────────────
// Upload one or more files for a post
uploadRouter.post(
  '/upload/:postId',
  requireAdmin,
  upload.array('files', 10),
  async (req: Request, res: Response) => {
    try {
      const { postId } = req.params;
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        res.status(400).json({ success: false, error: 'No files provided' });
        return;
      }

      // Verify post exists
      const { data: post } = await supabase
        .from('posts')
        .select('id')
        .eq('id', postId)
        .single();

      if (!post) {
        res.status(404).json({ success: false, error: 'Post not found' });
        return;
      }

      const attachments = [];

      for (const file of files) {
        const timestamp = Date.now();
        const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
        const storagePath = `${postId}/${timestamp}_${safeName}`;

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('post-attachments')
          .upload(storagePath, file.buffer, {
            contentType: file.mimetype,
            cacheControl: '3600',
          });

        if (uploadError) {
          console.error(`❌ Upload failed for ${file.originalname}:`, uploadError);
          continue;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('post-attachments')
          .getPublicUrl(storagePath);

        const fileType = file.mimetype.startsWith('video/') ? 'video' : 'image';

        // Insert attachment record
        const { data: attachment, error: dbError } = await supabase
          .from('attachments')
          .insert({
            post_id: postId,
            file_name: file.originalname,
            file_url: urlData.publicUrl,
            file_type: fileType,
          })
          .select('*')
          .single();

        if (dbError) {
          console.error(`❌ DB insert failed for ${file.originalname}:`, dbError);
          continue;
        }

        attachments.push(attachment);
      }

      console.log(`✅ Uploaded ${attachments.length} file(s) for post ${postId}`);
      res.status(201).json({ success: true, data: attachments });
    } catch (error) {
      console.error('❌ Error uploading files:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
);

// ── DELETE /api/upload/:attachmentId ──────────────────────────
uploadRouter.delete('/upload/:attachmentId', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { attachmentId } = req.params;

    // Get attachment info
    const { data: attachment } = await supabase
      .from('attachments')
      .select('*')
      .eq('id', attachmentId)
      .single();

    if (!attachment) {
      res.status(404).json({ success: false, error: 'Attachment not found' });
      return;
    }

    // Delete from storage
    const match = attachment.file_url.match(/\/storage\/v1\/object\/public\/post-attachments\/(.+)/);
    if (match) {
      await supabase.storage.from('post-attachments').remove([match[1]]);
    }

    // Delete DB record
    await supabase.from('attachments').delete().eq('id', attachmentId);

    res.json({ success: true, message: 'Attachment deleted' });
  } catch (error) {
    console.error('❌ Error deleting attachment:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});
