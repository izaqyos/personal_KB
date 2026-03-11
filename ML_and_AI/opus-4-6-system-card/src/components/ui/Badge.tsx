interface Props {
  label: string;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
}

const colorMap = {
  primary: 'bg-primary/20 text-primary border-primary/30',
  secondary: 'bg-secondary/20 text-secondary border-secondary/30',
  accent: 'bg-accent/20 text-accent border-accent/30',
  success: 'bg-success/20 text-success border-success/30',
  warning: 'bg-warning/20 text-warning border-warning/30',
  danger: 'bg-danger/20 text-danger border-danger/30',
};

export function Badge({ label, color = 'primary' }: Props) {
  return (
    <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full border ${colorMap[color]}`}>
      {label}
    </span>
  );
}
