import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
}

const defaultSEO = {
  siteName: 'Great Sale',
  defaultTitle: 'Great Sale - Find Amazing Second-Hand Items',
  defaultDescription: 'Discover unique second-hand items at great prices. Shop from a wide selection of clothes, electronics, furniture, toys, and more.',
  defaultImage: '/assets/logos/logo_yard_sale.svg',
  url: 'https://yardsale.com',
};

/**
 * Componente SEO para gestionar meta tags de cada página
 * Actualiza title, description, og:tags y twitter:card
 */
export function SEO({ 
  title, 
  description = defaultSEO.defaultDescription,
  keywords,
  image = defaultSEO.defaultImage,
  type = 'website',
  author 
}: SEOProps) {
  const location = useLocation();
  const fullTitle = title ? `${title} | ${defaultSEO.siteName}` : defaultSEO.defaultTitle;
  const url = `${defaultSEO.url}${location.pathname}`;

  useEffect(() => {
    // Actualizar title
    document.title = fullTitle;

    // Actualizar meta tags
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'author', author || defaultSEO.siteName);
    
    // Keywords
    if (keywords && keywords.length > 0) {
      updateMetaTag('name', 'keywords', keywords.join(', '));
    }

    // Open Graph tags
    updateMetaTag('property', 'og:title', fullTitle);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', image);
    updateMetaTag('property', 'og:url', url);
    updateMetaTag('property', 'og:type', type);
    updateMetaTag('property', 'og:site_name', defaultSEO.siteName);

    // Twitter Card tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', fullTitle);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', image);

    // Canonical URL
    updateCanonicalLink(url);
  }, [fullTitle, description, image, url, type, author, keywords]);

  return null; // Este componente no renderiza nada
}

// Función helper para actualizar/crear meta tags
function updateMetaTag(attribute: 'name' | 'property', key: string, content: string) {
  if (!content) return;

  let element = document.querySelector(`meta[${attribute}="${key}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
}

// Función helper para actualizar canonical link
function updateCanonicalLink(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  
  link.setAttribute('href', url);
}
