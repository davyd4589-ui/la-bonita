import React from 'react';

export default function SeoSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BeautySalon",
        "@id": "https://labonitaspabeauty.com/#organization",
        "name": "La Bonita Salão de Beleza",
        "alternateName": "La Bonita Spa Beauty",
        "url": "https://labonitaspabeauty.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/84a1bc056_ScreenShotTool-20251221150407.png",
          "width": 300,
          "height": 300
        },
        "image": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/84a1bc056_ScreenShotTool-20251221150407.png",
        "description": "Salão de beleza premium em Goiânia especializado em tratamentos capilares, manicure, pedicure, maquiagem profissional e pacotes completos para dia da noiva.",
        "telephone": "+5562999130894",
        "priceRange": "R$ 20 - R$ 1200",
        "currenciesAccepted": "BRL",
        "paymentAccepted": "Dinheiro, Cartão de Crédito, Cartão de Débito, PIX",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "R. SB 7, Qd.13 - Lt. 01, Res. Solar Bougainville",
          "addressLocality": "Goiânia",
          "addressRegion": "GO",
          "postalCode": "74393-385",
          "addressCountry": "BR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -16.6869,
          "longitude": -49.2648
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "19:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Saturday", "Sunday"],
            "opens": "08:00",
            "closes": "13:00"
          }
        ],
        "sameAs": [
          "https://www.instagram.com/labonitaspabeauty/",
          "https://www.facebook.com/labonitaspabeauty",
          "https://linktr.ee/labonitaspa"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "150",
          "bestRating": "5",
          "worstRating": "1"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Serviços de Beleza La Bonita",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "serviceType": "Tratamento Capilar",
                "name": "Corte Feminino",
                "description": "Corte de cabelo profissional feminino com técnicas modernas"
              },
              "price": "100.00",
              "priceCurrency": "BRL"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "serviceType": "Coloração",
                "name": "Coloração Global",
                "description": "Coloração completa do cabelo com produtos premium"
              },
              "price": "140.00",
              "priceCurrency": "BRL"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "serviceType": "Tratamento Capilar",
                "name": "Progressiva",
                "description": "Escova progressiva profissional para alisamento"
              },
              "price": "190.00",
              "priceCurrency": "BRL"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "serviceType": "Unhas",
                "name": "Manicure e Pedicure",
                "description": "Serviço completo de manicure e pedicure"
              },
              "price": "63.00",
              "priceCurrency": "BRL"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "serviceType": "Maquiagem",
                "name": "Maquiagem Profissional",
                "description": "Maquiagem profissional para eventos especiais"
              },
              "price": "180.00",
              "priceCurrency": "BRL"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "serviceType": "Dia da Noiva",
                "name": "Pacote Noiva Premium",
                "description": "Pacote completo para dia da noiva incluindo cabelo, maquiagem e unhas"
              },
              "price": "700.00",
              "priceCurrency": "BRL"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "serviceType": "Sobrancelha",
                "name": "Design de Sobrancelha",
                "description": "Design e modelagem profissional de sobrancelhas"
              },
              "price": "40.00",
              "priceCurrency": "BRL"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "serviceType": "Extensão de Cílios",
                "name": "Cílios Brasileiro",
                "description": "Extensão de cílios fio a fio técnica brasileira"
              },
              "price": "160.00",
              "priceCurrency": "BRL"
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://labonitaspabeauty.com/#website",
        "url": "https://labonitaspabeauty.com",
        "name": "La Bonita Salão de Beleza",
        "description": "Salão de beleza premium em Goiânia - Tratamentos capilares, manicure, maquiagem e dia da noiva",
        "publisher": {
          "@id": "https://labonitaspabeauty.com/#organization"
        },
        "inLanguage": "pt-BR",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://labonitaspabeauty.com/?s={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://labonitaspabeauty.com/#localbusiness",
        "name": "La Bonita Salão de Beleza",
        "image": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951a887caa37598382ff43f/84a1bc056_ScreenShotTool-20251221150407.png",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "R. SB 7, Qd.13 - Lt. 01, Res. Solar Bougainville",
          "addressLocality": "Goiânia",
          "addressRegion": "GO",
          "postalCode": "74393-385",
          "addressCountry": "BR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -16.6869,
          "longitude": -49.2648
        },
        "telephone": "+5562999130894",
        "url": "https://labonitaspabeauty.com",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "19:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Saturday", "Sunday"],
            "opens": "08:00",
            "closes": "13:00"
          }
        ],
        "priceRange": "$$"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://labonitaspabeauty.com/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://labonitaspabeauty.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Serviços",
            "item": "https://labonitaspabeauty.com/Services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Pacotes Noivas",
            "item": "https://labonitaspabeauty.com/BridalPackages"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Contato",
            "item": "https://labonitaspabeauty.com/Contact"
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}