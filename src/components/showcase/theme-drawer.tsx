import { useState } from 'react';
import { 
  X, 
  Check, 
  Sparkles, 
  Sun, 
  Moon, 
  Copy, 
  Sliders, 
  Palette, 
  CheckCheck, 
  Globe, 
  Loader2, 
  ArrowRight,
  ExternalLink,
  Wand2
} from 'lucide-react';
import { useTheme, THEMES } from '../../lib/theme-context';
import { ThemeId } from '../../types';
import { cn } from '../../lib/utils';
import { extractBrandFromUrl, ExtractedBrand } from '../../lib/brand-extractor';

export interface ThemeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateCustomBrand?: (name: string) => void;
  onUpdateBrandLogo?: (url: string) => void;
  brandName?: string;
  brandLogoUrl?: string;
}

const QUICK_DEMO_URLS = [
  'stripe.com',
  'spotify.com',
  'airbnb.com',
  'linear.app',
  'shopify.com',
  'notion.so',
  'nike.com',
  'uber.com',
];

export function ThemeDrawer({ 
  isOpen, 
  onClose,
  onUpdateCustomBrand,
  onUpdateBrandLogo,
  brandName = 'Moove Digital',
}: ThemeDrawerProps) {
  const { currentTheme, setTheme, isDarkMode, toggleDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'url' | 'presets' | 'custom'>('url');
  
  // URL Auto-brand extractor states
  const [websiteUrl, setWebsiteUrl] = useState('stripe.com');
  const [isExtracting, setIsExtracting] = useState(false);
  const [scanStep, setScanStep] = useState<string | null>(null);
  const [extractedBrand, setExtractedBrand] = useState<ExtractedBrand | null>(null);
  const [extractError, setExtractError] = useState<string | null>(null);
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  // Custom manual theme controls
  const [clientName, setClientName] = useState(brandName);
  const [customPrimary, setCustomPrimary] = useState(currentTheme.primaryColor);
  const [customAccent, setCustomAccent] = useState(currentTheme.accentColor);
  const [customRadius, setCustomRadius] = useState(currentTheme.borderRadius);
  const [copiedConfig, setCopiedConfig] = useState(false);

  if (!isOpen) return null;

  // Handle URL brand scanning
  const handleScanWebsite = async (overrideUrl?: string) => {
    const urlToScan = overrideUrl || websiteUrl;
    if (!urlToScan.trim()) return;

    setIsExtracting(true);
    setExtractError(null);
    setAppliedSuccess(false);

    try {
      setScanStep('Connecting to website domain...');
      await new Promise((r) => setTimeout(r, 250));

      setScanStep('Extracting logo mark & brand vectors...');
      await new Promise((r) => setTimeout(r, 300));

      setScanStep('Sampling dominant color palette & contrast...');
      const brand = await extractBrandFromUrl(urlToScan);
      
      setExtractedBrand(brand);
      setClientName(brand.name);
      setCustomPrimary(brand.primaryColor);
      setCustomAccent(brand.accentColor);
      setCustomRadius(brand.borderRadius);
      setScanStep(null);
    } catch (err: any) {
      setExtractError(err.message || 'Failed to extract brand assets from the provided URL.');
      setScanStep(null);
    } finally {
      setIsExtracting(false);
    }
  };

  // Apply the extracted brand live to CSS variables, sidebar logo, and title
  const applyExtractedBrand = (brand: ExtractedBrand) => {
    document.documentElement.style.setProperty('--color-primary', brand.primaryColor);
    document.documentElement.style.setProperty('--color-accent', brand.accentColor);
    document.documentElement.style.setProperty('--radius-card', brand.borderRadius);

    if (onUpdateCustomBrand) {
      onUpdateCustomBrand(brand.name);
    }
    if (onUpdateBrandLogo) {
      onUpdateBrandLogo(brand.logoUrl);
    }

    setAppliedSuccess(true);
    setTimeout(() => setAppliedSuccess(false), 3000);
  };

  // Apply manual custom brand
  const applyCustomBrand = () => {
    document.documentElement.style.setProperty('--color-primary', customPrimary);
    document.documentElement.style.setProperty('--color-accent', customAccent);
    document.documentElement.style.setProperty('--radius-card', customRadius);
    if (onUpdateCustomBrand) {
      onUpdateCustomBrand(clientName);
    }
  };

  const copyThemeExport = () => {
    const activeName = extractedBrand ? extractedBrand.name : clientName;
    const activePri = extractedBrand ? extractedBrand.primaryColor : customPrimary;
    const activeAcc = extractedBrand ? extractedBrand.accentColor : customAccent;
    const activeRad = extractedBrand ? extractedBrand.borderRadius : customRadius;

    const configSnippet = `/* Moove UI White-Label Configuration for: ${activeName} */
:root {
  --color-primary: ${activePri};
  --color-accent: ${activeAcc};
  --radius-card: ${activeRad};
  --font-sans: 'Plus Jakarta Sans', sans-serif;
}

/* Tailwind Config Extends:
theme: {
  extend: {
    colors: {
      primary: '${activePri}',
      accent: '${activeAcc}',
    },
    borderRadius: {
      card: '${activeRad}',
    }
  }
}
*/`;
    navigator.clipboard.writeText(configSnippet);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-l border-slate-200 dark:border-slate-800">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Wand2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">White-Label Brand Studio</h3>
                <p className="text-[11px] text-slate-400">Transform the dashboard for any client live</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Mode Switcher Banner */}
          <div className="mt-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {isDarkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </span>
            </div>
            <button
              onClick={toggleDarkMode}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-600 shadow-2xs hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors cursor-pointer"
            >
              Toggle
            </button>
          </div>

          {/* Navigation Tabs (3 Options) */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl my-4 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <button
              onClick={() => setActiveTab('url')}
              className={cn(
                'flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer',
                activeTab === 'url'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              )}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>URL Scanner</span>
            </button>
            <button
              onClick={() => setActiveTab('presets')}
              className={cn(
                'flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer',
                activeTab === 'presets'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              )}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Presets</span>
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={cn(
                'flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer',
                activeTab === 'custom'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              )}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Pitch Studio</span>
            </button>
          </div>

          {/* TAB 1: Auto-Brand from Website URL */}
          {activeTab === 'url' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Client Website URL or Domain
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleScanWebsite()}
                      placeholder="e.g. stripe.com or airbnb.com"
                      className="w-full pl-8 pr-3 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <button
                    onClick={() => handleScanWebsite()}
                    disabled={isExtracting}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-2xs cursor-pointer shrink-0"
                  >
                    {isExtracting ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                    <span>{isExtracting ? 'Scanning' : 'Scan'}</span>
                  </button>
                </div>
              </div>

              {/* Quick Preset Demo Chips */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1.5">
                  1-Click Client Demos
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_DEMO_URLS.map((url) => (
                    <button
                      key={url}
                      onClick={() => {
                        setWebsiteUrl(url);
                        handleScanWebsite(url);
                      }}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors cursor-pointer"
                    >
                      {url}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extraction Progress Step */}
              {isExtracting && scanStep && (
                <div className="p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 flex items-center gap-3 animate-fade-in">
                  <Loader2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-spin shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-indigo-900 dark:text-indigo-200">{scanStep}</p>
                    <p className="text-[10px] text-indigo-600/80 dark:text-indigo-400 mt-0.5">Analyzing client brand assets in browser</p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {extractError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-xs text-rose-600 dark:text-rose-400 font-medium">
                  {extractError}
                </div>
              )}

              {/* Extracted Brand Result Card */}
              {extractedBrand && !isExtracting && (
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50 space-y-3.5 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 p-1.5 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-center shrink-0">
                        <img
                          src={extractedBrand.logoUrl}
                          alt={extractedBrand.name}
                          className="w-full h-full object-contain rounded-md"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>{extractedBrand.name}</span>
                          <span className="text-[10px] font-normal text-slate-400">({extractedBrand.domain})</span>
                        </h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                          {extractedBrand.description}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                      Detected
                    </span>
                  </div>

                  {/* Colors & Tokens Visualizer */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-center gap-2">
                      <span
                        className="w-5 h-5 rounded-lg shadow-2xs shrink-0"
                        style={{ backgroundColor: extractedBrand.primaryColor }}
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Primary</span>
                        <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 truncate block">
                          {extractedBrand.primaryColor}
                        </span>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-center gap-2">
                      <span
                        className="w-5 h-5 rounded-lg shadow-2xs shrink-0"
                        style={{ backgroundColor: extractedBrand.accentColor }}
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Accent</span>
                        <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 truncate block">
                          {extractedBrand.accentColor}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Apply Brand Button */}
                  <div className="pt-1 flex gap-2">
                    <button
                      onClick={() => applyExtractedBrand(extractedBrand)}
                      className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {appliedSuccess ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Brand Applied Live!</span>
                        </>
                      ) : (
                        <>
                          <span>Apply to All Dashboards</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                    <button
                      onClick={copyThemeExport}
                      className="px-3 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                      title="Export CSS variables"
                    >
                      {copiedConfig ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Presets Tab */}
          {activeTab === 'presets' && (
            <div className="space-y-2.5">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                Select Industry Preset
              </label>
              {Object.values(THEMES).map((theme) => {
                const isSelected = currentTheme.id === theme.id;
                return (
                  <div
                    key={theme.id}
                    onClick={() => setTheme(theme.id as ThemeId)}
                    className={cn(
                      'p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between',
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 shadow-xs'
                        : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-white shadow-xs"
                        style={{ backgroundColor: theme.primaryColor }}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-white/90" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{theme.name}</h4>
                        <p className="text-[10px] text-slate-400">{theme.category}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] shadow-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: Custom Pitch Studio Tab */}
          {activeTab === 'custom' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Client / Brand Name
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Acme Health, Stripe Capital"
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Primary Brand Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={customPrimary}
                      onChange={(e) => setCustomPrimary(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={customPrimary}
                      onChange={(e) => setCustomPrimary(e.target.value)}
                      className="w-full text-xs font-mono font-bold px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Accent Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={customAccent}
                      onChange={(e) => setCustomAccent(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={customAccent}
                      onChange={(e) => setCustomAccent(e.target.value)}
                      className="w-full text-xs font-mono font-bold px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Border Radius ({customRadius})
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'Subtle', val: '0.5rem' },
                    { label: 'Modern', val: '1rem' },
                    { label: 'Pill/Soft', val: '1.25rem' },
                    { label: 'Organic', val: '1.75rem' },
                  ].map((r) => (
                    <button
                      key={r.val}
                      onClick={() => setCustomRadius(r.val)}
                      className={cn(
                        'py-1.5 text-[11px] font-bold rounded-xl border transition-all cursor-pointer',
                        customRadius === r.val
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 shadow-2xs'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                      )}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={applyCustomBrand}
                  className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer"
                >
                  Live Apply Brand
                </button>

                <button
                  onClick={copyThemeExport}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
                  title="Copy Theme Config"
                >
                  {copiedConfig ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedConfig ? 'Copied!' : 'Export'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <ExternalLink className="w-3.5 h-3.5 text-indigo-500" />
            <span>Moove White-Label Engine</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
