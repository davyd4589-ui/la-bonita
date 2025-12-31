import React from "react";
import { Helmet } from "react-helmet";

export default function SEOHead({ 
  title, 
  description, 
  keywords,
  ogImage,
  canonicalUrl,
  schema 
}) {
  const baseUrl = "https://labonitaspabeauty.com";
  const defaultImage = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/84a1bc056_ScreenShotTool-20251221150407.png";
  
  const fullTitle = title ? `${title} | La Bonita Salão de Beleza` : "La Bonita Salão de Beleza - Goiânia | Cabelo, Unhas, Maquiagem";
  const fullDescription = description || "Salão de beleza premium em Goiânia especializado em tratamentos capilares, manicure, pedicure, maquiagem e dia da noiva. Profissionais experientes e ambiente acolhedor.";
  const fullKeywords = keywords || "salão de beleza goiânia, cabeleireiro goiânia, manicure goiânia, maquiagem goiânia, dia da noiva goiânia, tratamento capilar goiânia, la bonita salão";
  const image = ogImage || defaultImage;
  const canonical = canonicalUrl || baseUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="author" content="La Bonita Salão de Beleza" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="business.business" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="La Bonita Salão de Beleza" />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={fullDescription} />
      <meta property="twitter:image" content={image} />

      {/* Geo Tags */}
      <meta name="geo.region" content="BR-GO" />
      <meta name="geo.placename" content="Goiânia" />
      <meta name="geo.position" content="-16.6869;-49.2648" />
      <meta name="ICBM" content="-16.6869, -49.2648" />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}