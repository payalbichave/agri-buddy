-- Create storage bucket for crop images
INSERT INTO storage.buckets (id, name, public)
VALUES ('crop-images', 'crop-images', true);

-- Allow public read access to crop images
CREATE POLICY "Public read access for crop images"
ON storage.objects FOR SELECT
USING (bucket_id = 'crop-images');

-- Allow public upload to crop images (no auth required for demo)
CREATE POLICY "Public upload access for crop images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'crop-images');