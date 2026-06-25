/*
  # Create contact_submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text, sender's name)
      - `email` (text, sender's email)
      - `message` (text, message body)
      - `created_at` (timestamptz, submission timestamp)
      - `read` (boolean, whether the owner has read it, default false)

  2. Security
    - Enable RLS
    - INSERT allowed for anonymous users (public contact form)
    - SELECT/UPDATE only for authenticated users (site owner via Supabase dashboard)

  3. Notes
    - No personal auth is required to submit — it is a public contact form
    - The `read` flag lets the owner mark messages as reviewed
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text        NOT NULL DEFAULT '',
  email      text        NOT NULL DEFAULT '',
  message    text        NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  read       boolean     NOT NULL DEFAULT false
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous visitors) can submit a contact form
CREATE POLICY "Public can insert contact submissions"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users (the site owner) can read submissions
CREATE POLICY "Authenticated users can read submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can mark submissions as read
CREATE POLICY "Authenticated users can update read status"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
