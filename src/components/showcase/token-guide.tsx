import { useTheme } from '../../lib/theme-context';
import { Card } from '../ui/card';

export function TokenGuide() {
  const { currentTheme } = useTheme();

  const colorTokens = [
    { name: 'Primary', value: currentTheme.primaryColor, desc: 'Brand accent & call to action' },
    { name: 'Accent', value: currentTheme.accentColor, desc: 'Highlights, badges, secondary focus' },
    { name: 'Success', value: '#10b981', desc: 'Positive trends, delivered orders, active states' },
    { name: 'Warning', value: '#f59e0b', desc: 'Pending reviews, attention required' },
    { name: 'Danger', value: '#ef4444', desc: 'Alerts, cancellations, drop-offs' },
    { name: 'Slate Dark', value: '#0f172a', desc: 'Primary typography & dark cards' },
    { name: 'Slate Light', value: '#f8fafc', desc: 'Canvas background' },
  ];

  const radiusTokens = [
    { name: 'rounded-lg', size: '0.5rem (8px)', desc: 'Small badges, sub-items' },
    { name: 'rounded-xl', size: '0.75rem (12px)', desc: 'Buttons, input controls, metric icons' },
    { name: 'rounded-2xl', size: '1.25rem (20px)', desc: 'Primary cards, modals, popovers' },
    { name: 'rounded-full', size: '9999px', desc: 'Avatars, status pills, progress bars' },
  ];

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Design Tokens & System Architecture
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          The foundational tokens that power Moove Digital’s unified, white-labelable design library.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">Color Palette & Dynamic Swatches</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {colorTokens.map((token) => (
            <Card key={token.name} className="p-4 space-y-3">
              <div
                className="h-16 w-full rounded-xl shadow-inner border border-black/5 flex items-center justify-center font-bold text-xs text-white"
                style={{ backgroundColor: token.value }}
              >
                {token.value}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">{token.name}</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">{token.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">Border Radii Hierarchy</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {radiusTokens.map((r) => (
            <Card key={r.name} className="p-4">
              <div className="h-14 w-full bg-indigo-50 dark:bg-indigo-950/40 border-2 border-dashed border-indigo-300 dark:border-indigo-700 flex items-center justify-center mb-3" style={{ borderRadius: r.size.split(' ')[0] }}>
                <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">{r.name}</span>
              </div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">{r.size}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{r.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">How White-Label Client Theming Works</h2>
        <Card className="p-6 space-y-3">
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            All colors, border radiuses, and fonts are bound to CSS Custom Properties. When deploying for a new client (e.g. Healthcare, FinTech, or PropTech), you simply pass the client theme ID to <code className="text-indigo-600 dark:text-indigo-400 font-mono bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded">&lt;ThemeProvider theme="fintech"&gt;</code> or set <code className="text-indigo-600 dark:text-indigo-400 font-mono bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded">data-theme="healthcare"</code> on the root HTML tag.
          </p>
          <pre className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono overflow-x-auto">
{`// Switching themes dynamically in React:
import { useTheme } from '@/lib/theme-context';

export function ClientBrandingSelector() {
  const { setTheme } = useTheme();
  return (
    <button onClick={() => setTheme('fintech')}>
      Apply FinTech Theme
    </button>
  );
}`}
          </pre>
        </Card>
      </section>
    </div>
  );
}
