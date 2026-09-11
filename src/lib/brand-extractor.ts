export interface ExtractedBrand {
  name: string;
  domain: string;
  primaryColor: string;
  accentColor: string;
  borderRadius: string;
  logoUrl: string;
  description?: string;
}

// Curated dictionary of top brands and Moove Digital agency domains
const BRAND_DATABASE: Record<string, Partial<ExtractedBrand>> = {
  'movedigital.africa': {
    name: 'Move Digital',
    primaryColor: '#0cb4f6',
    accentColor: '#1e3cb7',
    borderRadius: '1rem',
    logoUrl: 'https://movedigital.africa/og-image.jpg?v=2',
    description: 'Enterprise AI & Fintech Infrastructure for Africa',
  },
  'moovedigital.africa': {
    name: 'Moove Digital',
    primaryColor: '#0cb4f6',
    accentColor: '#1e3cb7',
    borderRadius: '1rem',
    logoUrl: 'https://movedigital.africa/og-image.jpg?v=2',
    description: 'Enterprise AI & Fintech Infrastructure for Africa',
  },
  'moove.digital': {
    name: 'Moove Digital',
    primaryColor: '#6366f1',
    accentColor: '#06b6d4',
    borderRadius: '1rem',
    logoUrl: 'https://unavatar.io/moove.digital',
    description: 'Modern Product & Design Library Studio',
  },
  'stripe.com': {
    name: 'Stripe',
    primaryColor: '#635BFF',
    accentColor: '#00D4FF',
    borderRadius: '0.75rem',
    logoUrl: 'https://unavatar.io/stripe.com',
    description: 'Financial infrastructure for the internet',
  },
  'spotify.com': {
    name: 'Spotify',
    primaryColor: '#1DB954',
    accentColor: '#1ed760',
    borderRadius: '1.25rem',
    logoUrl: 'https://unavatar.io/spotify.com',
    description: 'Digital music, podcast, and video service',
  },
  'airbnb.com': {
    name: 'Airbnb',
    primaryColor: '#FF5A5F',
    accentColor: '#00A699',
    borderRadius: '1rem',
    logoUrl: 'https://unavatar.io/airbnb.com',
    description: 'Vacation rentals, cabins, and beach houses',
  },
  'shopify.com': {
    name: 'Shopify',
    primaryColor: '#008060',
    accentColor: '#5c6ac4',
    borderRadius: '0.75rem',
    logoUrl: 'https://unavatar.io/shopify.com',
    description: 'Global commerce platform',
  },
  'linear.app': {
    name: 'Linear',
    primaryColor: '#5E6AD2',
    accentColor: '#38BDF8',
    borderRadius: '0.5rem',
    logoUrl: 'https://unavatar.io/linear.app',
    description: 'Purpose-built tool for modern software teams',
  },
  'notion.so': {
    name: 'Notion',
    primaryColor: '#191919',
    accentColor: '#2eaadc',
    borderRadius: '0.5rem',
    logoUrl: 'https://unavatar.io/notion.so',
    description: 'The connected workspace for wiki, docs & projects',
  },
  'figma.com': {
    name: 'Figma',
    primaryColor: '#F24E1E',
    accentColor: '#A259FF',
    borderRadius: '1rem',
    logoUrl: 'https://unavatar.io/figma.com',
    description: 'Collaborative interface design tool',
  },
  'nike.com': {
    name: 'Nike',
    primaryColor: '#111111',
    accentColor: '#FA541C',
    borderRadius: '0.5rem',
    logoUrl: 'https://unavatar.io/nike.com',
    description: 'Athletic footwear and apparel',
  },
  'uber.com': {
    name: 'Uber',
    primaryColor: '#000000',
    accentColor: '#276EF1',
    borderRadius: '0.75rem',
    logoUrl: 'https://unavatar.io/uber.com',
    description: 'Mobility and delivery platform',
  },
  'slack.com': {
    name: 'Slack',
    primaryColor: '#4A154B',
    accentColor: '#36C5F0',
    borderRadius: '0.75rem',
    logoUrl: 'https://unavatar.io/slack.com',
    description: 'Team collaboration and productivity hub',
  },
  'vercel.com': {
    name: 'Vercel',
    primaryColor: '#000000',
    accentColor: '#0070F3',
    borderRadius: '0.5rem',
    logoUrl: 'https://unavatar.io/vercel.com',
    description: 'Frontend cloud platform',
  },
  'apple.com': {
    name: 'Apple',
    primaryColor: '#0071E3',
    accentColor: '#2997FF',
    borderRadius: '1rem',
    logoUrl: 'https://unavatar.io/apple.com',
    description: 'Consumer technology and services',
  },
  'netflix.com': {
    name: 'Netflix',
    primaryColor: '#E50914',
    accentColor: '#B20710',
    borderRadius: '0.5rem',
    logoUrl: 'https://unavatar.io/netflix.com',
    description: 'Streaming entertainment service',
  },
  'github.com': {
    name: 'GitHub',
    primaryColor: '#24292F',
    accentColor: '#0969DA',
    borderRadius: '0.5rem',
    logoUrl: 'https://unavatar.io/github.com',
    description: 'Developer platform and repository hosting',
  },
  'discord.com': {
    name: 'Discord',
    primaryColor: '#5865F2',
    accentColor: '#57F287',
    borderRadius: '1rem',
    logoUrl: 'https://unavatar.io/discord.com',
    description: 'Voice, video, and text communication service',
  },
};

/**
 * Normalizes user input into a clean hostname / domain
 * e.g. "https://www.movedigital.africa/" -> "movedigital.africa"
 */
export function normalizeDomain(input: string): string {
  let cleaned = input.trim().toLowerCase();
  cleaned = cleaned.replace(/^https?:\/\//, '');
  cleaned = cleaned.replace(/^www\./, '');
  cleaned = cleaned.split('/')[0].split('?')[0].split(':')[0];
  return cleaned;
}

/**
 * Derives a clean human-readable brand name from a domain name
 */
function domainToBrandName(domain: string): string {
  const parts = domain.split('.');
  const base = parts.length > 1 ? parts[0] : domain;
  return base
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Clean page titles down to a brand name
 * e.g. "Move Digital | Enterprise AI & Fintech..." -> "Move Digital"
 */
function cleanTitleToBrand(title: string): string {
  if (!title) return '';
  const firstChunk = title.split(/[|•–—:-]/)[0].trim();
  return firstChunk || title.trim();
}

/**
 * Validates whether a hex color is vibrant enough and not near pure black/white
 */
function isGoodBrandColor(hex: string): boolean {
  if (!hex || !hex.startsWith('#') || hex.length < 7) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return false;

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  // Ignore almost black or almost white
  if (brightness < 20 || brightness > 245) return false;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  // Must have some color saturation (not pure gray)
  return max - min > 15;
}

/**
 * Main extractor function: extracts logo, brand name, primary color, and accent from a website URL.
 */
export async function extractBrandFromUrl(inputUrl: string): Promise<ExtractedBrand> {
  const domain = normalizeDomain(inputUrl);

  if (!domain) {
    throw new Error('Please enter a valid website URL or domain name.');
  }

  // 1. Check Curated Database first for instant precision
  if (BRAND_DATABASE[domain]) {
    const record = BRAND_DATABASE[domain];
    return {
      name: record.name || domainToBrandName(domain),
      domain,
      primaryColor: record.primaryColor || '#6366f1',
      accentColor: record.accentColor || '#06b6d4',
      borderRadius: record.borderRadius || '1rem',
      logoUrl: record.logoUrl || `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
      description: record.description || `Verified brand assets for ${domain}`,
    };
  }

  // 2. Query Microlink Headless Live Metadata & Palette Engine (CORS enabled)
  try {
    const targetUrl = inputUrl.startsWith('http') ? inputUrl : `https://${domain}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(
      `https://api.microlink.io?url=${encodeURIComponent(targetUrl)}&palette=true`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (response.ok) {
      const json = await response.json();
      const data = json.data;

      if (data) {
        // Extract brand name
        const brandName =
          data.publisher ||
          cleanTitleToBrand(data.title) ||
          domainToBrandName(domain);

        // Extract logo
        const logoUrl =
          data.image?.url ||
          data.logo?.url ||
          `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

        // Extract colors
        let primaryColor = '#6366f1';
        let accentColor = '#06b6d4';

        // Check image/logo palette from Microlink
        if (data.image?.color && isGoodBrandColor(data.image.color)) {
          primaryColor = data.image.color;
        } else if (data.image?.palette && Array.isArray(data.image.palette)) {
          const goodColor = data.image.palette.find(isGoodBrandColor);
          if (goodColor) primaryColor = goodColor;
        }

        if (data.image?.alternative_color && isGoodBrandColor(data.image.alternative_color)) {
          accentColor = data.image.alternative_color;
        } else if (data.image?.palette && Array.isArray(data.image.palette)) {
          const secondColor = data.image.palette.find(
            (c: string) => isGoodBrandColor(c) && c !== primaryColor
          );
          if (secondColor) accentColor = secondColor;
        }

        return {
          name: brandName,
          domain,
          primaryColor,
          accentColor,
          borderRadius: '1rem',
          logoUrl,
          description: data.description || `Live brand extracted from ${domain}`,
        };
      }
    }
  } catch {
    // Fallback continues below
  }

  // 3. Fallback to Google Favicon service and pleasant hash-based palette
  const logoUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  const fallbackName = domainToBrandName(domain);

  let hash = 0;
  for (let i = 0; i < domain.length; i++) {
    hash = domain.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  const primaryColor = `hsl(${hue}, 75%, 48%)`;
  const accentColor = `hsl(${(hue + 50) % 360}, 85%, 55%)`;

  return {
    name: fallbackName,
    domain,
    primaryColor,
    accentColor,
    borderRadius: '1rem',
    logoUrl,
    description: `Brand detected from ${domain}`,
  };
}
