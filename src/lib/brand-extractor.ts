export interface ExtractedBrand {
  name: string;
  domain: string;
  primaryColor: string;
  accentColor: string;
  borderRadius: string;
  logoUrl: string;
  description?: string;
}

// Curated dictionary of top global brands for instant zero-latency demo precision
const BRAND_DATABASE: Record<string, Partial<ExtractedBrand>> = {
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
    primaryColor: '#000000',
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
 * e.g. "https://www.stripe.com/pricing?q=1" -> "stripe.com"
 */
export function normalizeDomain(input: string): string {
  let cleaned = input.trim().toLowerCase();
  // Remove leading protocol
  cleaned = cleaned.replace(/^https?:\/\//, '');
  // Remove www.
  cleaned = cleaned.replace(/^www\./, '');
  // Extract only hostname before any slash, query or port
  cleaned = cleaned.split('/')[0].split('?')[0].split(':')[0];
  return cleaned;
}

/**
 * Derives a clean human-readable brand name from a domain name
 * e.g. "acme-health.co.uk" -> "Acme Health"
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
 * Converts RGB numbers to hex string
 */
function rgbToHex(r: number, g: number, b: number): string {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = Math.min(255, Math.max(0, Math.round(x))).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

/**
 * Samples dominant colors from an image using HTML5 Canvas
 */
async function sampleColorsFromImage(imgUrl: string): Promise<{ primary: string; accent: string } | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(null);

        const width = (canvas.width = Math.min(img.width, 64));
        const height = (canvas.height = Math.min(img.height, 64));

        ctx.drawImage(img, 0, 0, width, height);
        const imgData = ctx.getImageData(0, 0, width, height).data;

        const colorCounts: Record<string, { r: number; g: number; b: number; count: number; score: number }> = {};

        for (let i = 0; i < imgData.length; i += 4) {
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          const a = imgData[i + 3];

          // Ignore transparent or near-transparent pixels
          if (a < 128) continue;

          // Ignore pure white, near-white, pure black, or grayscale pixels
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const delta = max - min;
          const brightness = (r * 299 + g * 587 + b * 114) / 1000;

          // Filter out washed out whites/grays or deep blacks
          if (brightness > 240 || brightness < 20 || delta < 18) continue;

          // Quantize color into buckets of 16 to cluster similar tones
          const bucketR = Math.round(r / 24) * 24;
          const bucketG = Math.round(g / 24) * 24;
          const bucketB = Math.round(b / 24) * 24;
          const key = `${bucketR},${bucketG},${bucketB}`;

          // Calculate saturation and vibrancy
          const saturation = max === 0 ? 0 : delta / max;
          const score = (saturation * 2 + 1) * (a / 255);

          if (!colorCounts[key]) {
            colorCounts[key] = { r: bucketR, g: bucketG, b: bucketB, count: 1, score };
          } else {
            colorCounts[key].count += 1;
            colorCounts[key].score += score;
          }
        }

        const sortedColors = Object.values(colorCounts).sort((a, b) => b.score - a.score);

        if (sortedColors.length === 0) {
          return resolve(null);
        }

        const primaryRgb = sortedColors[0];
        const primaryHex = rgbToHex(primaryRgb.r, primaryRgb.g, primaryRgb.b);

        // Derive high-contrast accent: look for second distinct color or shift hue
        let accentHex = '#06b6d4';
        if (sortedColors.length > 1) {
          const secondRgb = sortedColors.find((c) => {
            const dist = Math.sqrt(
              Math.pow(c.r - primaryRgb.r, 2) +
              Math.pow(c.g - primaryRgb.g, 2) +
              Math.pow(c.b - primaryRgb.b, 2)
            );
            return dist > 60;
          });
          if (secondRgb) {
            accentHex = rgbToHex(secondRgb.r, secondRgb.g, secondRgb.b);
          }
        }

        resolve({ primary: primaryHex, accent: accentHex });
      } catch {
        resolve(null);
      }
    };

    img.onerror = () => resolve(null);
    img.src = imgUrl;
  });
}

/**
 * Main extractor function: extracts logo, brand name, primary color, and accent from a website URL.
 */
export async function extractBrandFromUrl(inputUrl: string): Promise<ExtractedBrand> {
  const domain = normalizeDomain(inputUrl);

  if (!domain) {
    throw new Error('Please enter a valid website URL or domain name.');
  }

  // Check Curated Database first for instant, authentic brand precision
  if (BRAND_DATABASE[domain]) {
    const record = BRAND_DATABASE[domain];
    return {
      name: record.name || domainToBrandName(domain),
      domain,
      primaryColor: record.primaryColor || '#4f46e5',
      accentColor: record.accentColor || '#06b6d4',
      borderRadius: record.borderRadius || '1rem',
      logoUrl: record.logoUrl || `https://unavatar.io/${domain}?fallback=https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
      description: record.description || `Extracted brand assets for ${domain}`,
    };
  }

  // For arbitrary custom domains:
  const logoUrl = `https://unavatar.io/${domain}?fallback=https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  const fallbackName = domainToBrandName(domain);

  // Try Canvas pixel color extraction from the domain's logo / favicon
  let primaryColor = '#4f46e5';
  let accentColor = '#06b6d4';

  try {
    const sampled = await sampleColorsFromImage(logoUrl);
    if (sampled) {
      primaryColor = sampled.primary;
      accentColor = sampled.accent;
    } else {
      // Deterministic hash-based pleasant default palette if logo cannot be canvas-sampled
      let hash = 0;
      for (let i = 0; i < domain.length; i++) {
        hash = domain.charCodeAt(i) + ((hash << 5) - hash);
      }
      const hue = Math.abs(hash % 360);
      primaryColor = `hsl(${hue}, 70%, 50%)`;
      accentColor = `hsl(${(hue + 45) % 360}, 85%, 55%)`;
    }
  } catch {
    // Keep defaults
  }

  return {
    name: fallbackName,
    domain,
    primaryColor,
    accentColor,
    borderRadius: '1rem',
    logoUrl,
    description: `Brand automatically detected and extracted from ${domain}`,
  };
}
