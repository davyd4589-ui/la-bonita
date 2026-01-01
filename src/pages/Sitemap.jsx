import React, { useEffect } from "react";

export default function Sitemap() {
  useEffect(() => {
    document.documentElement.setAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
    document.querySelector('meta[name="viewport"]')?.remove();
  }, []);

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.labonitaspabeauty.com/</loc>
    <lastmod>2026-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.labonitaspabeauty.com/Services</loc>
    <lastmod>2026-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.labonitaspabeauty.com/Gallery</loc>
    <lastmod>2026-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.labonitaspabeauty.com/Team</loc>
    <lastmod>2026-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.labonitaspabeauty.com/Contact</loc>
    <lastmod>2026-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.labonitaspabeauty.com/BridalPackages</loc>
    <lastmod>2026-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

  return (
    <pre style={{ 
      fontFamily: 'monospace', 
      whiteSpace: 'pre-wrap', 
      margin: 0,
      padding: '20px',
      backgroundColor: '#f5f5f5'
    }}>
      {sitemapContent}
    </pre>
  );
}