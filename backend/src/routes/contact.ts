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

// Data file path
const DATA_DIR = path.join(__dirname, '../../data');
const DATA_FILE = path.join(DATA_DIR, 'submissions.json');

// Ensure data directory and file exist
function ensureDataFile(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
  }
}

// Read submissions
function readSubmissions(): ContactSubmission[] {
  ensureDataFile();
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

// Write submissions
function writeSubmissions(submissions: ContactSubmission[]): void {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));
}

// POST /api/contact — Submit a contact form
contactRouter.post('/contact', (req: Request, res: Response) => {
  try {
    const { name, phone, email, company, location, source } = req.body;

    // Validation
    if (!name || !phone || !email || !location) {
      res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: name, phone, email, location' 
      });
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

    const submissions = readSubmissions();
    submissions.push(submission);
    writeSubmissions(submissions);

    console.log(`✅ New submission from ${name} (${email}) — Source: ${source || 'agency'}`);

    res.status(201).json({ 
      success: true, 
      message: 'Form submitted successfully',
      id: submission.id,
    });
  } catch (error) {
    console.error('❌ Error processing contact form:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// GET /api/contacts — List all submissions (for admin use)
contactRouter.get('/contacts', (_req: Request, res: Response) => {
  try {
    const submissions = readSubmissions();
    res.json({ 
      success: true, 
      count: submissions.length,
      data: submissions.reverse(), // Latest first
    });
  } catch (error) {
    console.error('❌ Error fetching contacts:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});
