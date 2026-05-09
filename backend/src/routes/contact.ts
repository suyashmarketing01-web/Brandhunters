import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const contactRouter = Router();

interface ContactSubmission {
  id: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  location: string;
  source: string;
  createdAt: string;
}

// ── Local JSON backup ──────────────────────────────────────────
const DATA_DIR = path.join(__dirname, '../../data');
const DATA_FILE = path.join(DATA_DIR, 'submissions.json');

function ensureDataFile(): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

function readSubmissions(): ContactSubmission[] {
  ensureDataFile();
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

function writeSubmissions(submissions: ContactSubmission[]): void {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));
}

// ── Google Sheets (Apps Script Web App) ───────────────────────
async function sendToGoogleSheets(submission: ContactSubmission): Promise<void> {
  const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!sheetsUrl) {
    console.log('ℹ️  GOOGLE_SHEETS_WEBHOOK_URL not set — skipping Sheets sync');
    return;
  }

  const payload = {
    id: submission.id,
    name: submission.name,
    phone: submission.phone,
    email: submission.email,
    company: submission.company,
    location: submission.location,
    source: submission.source,
    createdAt: new Date(submission.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  };

  const response = await fetch(sheetsUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error(`Sheets webhook failed: ${response.status}`);
  console.log(`📊 Sent to Google Sheets: ${submission.name} (${submission.source})`);
}

// ── POST /api/contact ─────────────────────────────────────────
contactRouter.post('/contact', async (req: Request, res: Response) => {
  try {
    const { name, phone, email, company, location, source } = req.body;

    if (!name || !phone || !email || !location) {
      res.status(400).json({ success: false, error: 'Missing required fields: name, phone, email, location' });
      return;
    }

    const submission: ContactSubmission = {
      id: `sub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      name,
      phone,
      email,
      company: company || '',
      location,
      source: source || 'agency',
      createdAt: new Date().toISOString(),
    };

    // 1. Local JSON backup (may fail on serverless — that's OK)
    try {
      const submissions = readSubmissions();
      submissions.push(submission);
      writeSubmissions(submissions);
    } catch (fsErr) {
      console.warn('⚠️  Local backup skipped (serverless env):', fsErr);
    }

    // 2. Google Sheets — primary storage
    try {
      await sendToGoogleSheets(submission);
    } catch (sheetsErr) {
      console.error('❌ Google Sheets sync failed:', sheetsErr);
    }

    console.log(`✅ New lead: ${name} | ${phone} | Source: ${source || 'agency'}`);

    res.status(201).json({ success: true, message: 'Form submitted successfully', id: submission.id });
  } catch (error) {
    console.error('❌ Error processing contact form:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// ── GET /api/contacts (admin) ─────────────────────────────────
contactRouter.get('/contacts', (_req: Request, res: Response) => {
  try {
    const submissions = readSubmissions();
    res.json({ success: true, count: submissions.length, data: submissions.reverse() });
  } catch (error) {
    console.error('❌ Error fetching contacts:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});
