// In-memory store for Vercel serverless (resets per cold start)
// For production persistence, connect to a database like MongoDB, Supabase, or PlanetScale

const GOOGLE_SHEET_WEBHOOK = process.env.GOOGLE_SHEET_WEBHOOK || '';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { name, phone, email, company, location, source } = req.body;

    // Validation
    if (!name || !phone || !email || !location) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, phone, email, location',
      });
    }

    const submission = {
      id: `sub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      name,
      phone,
      email,
      company: company || '',
      location,
      source: source || 'agency',
      createdAt: new Date().toISOString(),
    };

    // If Google Sheet webhook is configured, send data there
    if (GOOGLE_SHEET_WEBHOOK) {
      try {
        await fetch(GOOGLE_SHEET_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submission),
        });
      } catch (webhookError) {
        console.error('Google Sheet webhook error:', webhookError);
        // Don't fail the request if webhook fails
      }
    }

    console.log(`✅ New submission from ${name} (${email}) — Source: ${source || 'agency'}`);

    return res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      id: submission.id,
    });
  } catch (error) {
    console.error('❌ Error processing contact form:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}
