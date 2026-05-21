import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Allowed top-level directories to serve (whitelist for security)
const ALLOWED_DIRS = ['Images', 'Products', 'ceteogry', 'News', 'Certificate'];

const MIME_TYPES = {
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
};

export async function GET(request, { params }) {
  const segments = params.path || [];

  // Validate the top-level directory is in the whitelist
  if (!segments.length || !ALLOWED_DIRS.includes(segments[0])) {
    return new NextResponse('Not Found', { status: 404 });
  }

  // Build the absolute file path from the project root
  const projectRoot = process.cwd();
  const relativePath = path.join(...segments);
  const filePath = path.resolve(projectRoot, relativePath);

  // Prevent path traversal attacks
  if (!filePath.startsWith(path.resolve(projectRoot))) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  try {
    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch {
    return new NextResponse('Not Found', { status: 404 });
  }
}
