export type ThemeId = 'moove' | 'fintech' | 'healthcare' | 'realestate' | 'marketing';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  category: string;
  primaryColor: string;
  primaryLight: string;
  accentColor: string;
  fontFamily: string;
  borderRadius: string;
  previewGradient: string;
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  timeframe?: string;
  icon?: React.ReactNode;
  iconColor?: string;
  iconBg?: string;
  sparklineData?: number[];
  variant?: 'default' | 'highlight' | 'dark';
  className?: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
  tertiaryValue?: number;
}

export interface DonutSegment {
  label: string;
  value: number;
  color: string;
  percentage?: number;
}

export interface OrderItem {
  id: string;
  customer: {
    name: string;
    avatar: string;
  };
  product: string;
  amount: string;
  status: 'Delivered' | 'Shipped' | 'Processing' | 'Cancelled';
  date?: string;
}

export interface NavItem {
  label: string;
  icon: string;
  href: string;
  badge?: string | number;
  active?: boolean;
}
