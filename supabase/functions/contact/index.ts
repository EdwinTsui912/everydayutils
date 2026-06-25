import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { name, email, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const trimmed = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };

    // 1. Save to Supabase — ensures no message is ever lost
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert(trimmed);

    if (dbError) {
      console.error('DB insert error:', dbError);
    }

    // 2. Send email via Resend
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'EverydayUtils Contact <onboarding@resend.dev>',
        to: ['everydayutils.contact@gmail.com'],
        reply_to: trimmed.email,
        subject: `New message from ${trimmed.name}`,
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#fff">
            <h2 style="margin:0 0 24px;font-size:18px;font-weight:700;color:#111">
              New contact message — EverydayUtils
            </h2>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:13px;color:#888;width:72px;vertical-align:top">Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#111;font-weight:600">${trimmed.name}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:13px;color:#888;vertical-align:top">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px">
                  <a href="mailto:${trimmed.email}" style="color:#2563eb;text-decoration:none">${trimmed.email}</a>
                </td>
              </tr>
            </table>
            <div style="background:#f8f8f8;border-radius:8px;padding:16px;font-size:14px;color:#333;line-height:1.6;white-space:pre-wrap">${trimmed.message}</div>
            <p style="margin:24px 0 0;font-size:12px;color:#aaa">
              Hit reply to respond directly to ${trimmed.name}.
            </p>
          </div>
        `,
      }),
    });

    if (!emailRes.ok) {
      const errBody = await emailRes.text();
      console.error('Resend error:', errBody);
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Contact function error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
