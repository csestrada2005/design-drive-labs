
-- Create storage bucket for project mockup images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('project-mockups', 'project-mockups', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Allow public read access
CREATE POLICY "Public read project mockups"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-mockups');

-- Allow service role to insert
CREATE POLICY "Service role insert project mockups"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'project-mockups');
