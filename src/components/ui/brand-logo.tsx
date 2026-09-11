import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

export interface BrandLogoImageProps {
  src?: string;
  name: string;
  domain?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function BrandLogoImage({
  src,
  name,
  domain,
  color = '#6366f1',
  size = 'md',
  className,
}: BrandLogoImageProps) {
  const [hasError, setHasError] = useState(false);
  const [triedFallback, setTriedFallback] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);

  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setTriedFallback(false);
  }, [src]);

  const sizeClasses = {
    sm: 'w-7 h-7 text-xs rounded-lg',
    md: 'w-9 h-9 text-sm rounded-xl',
    lg: 'w-11 h-11 text-base rounded-2xl',
  };

  const monogram = (name || 'M')
    .split(' ')
    .map((w) => w.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleError = () => {
    if (!triedFallback && domain) {
      setTriedFallback(true);
      setCurrentSrc(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
    } else {
      setHasError(true);
    }
  };

  if (!currentSrc || hasError) {
    return (
      <div
        className={cn(
          'flex items-center justify-center font-extrabold text-white shadow-2xs shrink-0 select-none transition-all',
          sizeClasses[size],
          className
        )}
        style={{ backgroundColor: color }}
      >
        {monogram}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'overflow-hidden bg-white dark:bg-slate-800 p-1 border border-slate-200/80 dark:border-slate-700 shadow-2xs shrink-0 flex items-center justify-center transition-all',
        sizeClasses[size],
        className
      )}
    >
      <img
        src={currentSrc}
        alt={name}
        className="w-full h-full object-contain rounded-md"
        onError={handleError}
      />
    </div>
  );
}
