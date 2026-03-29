
// ─── Types ────────────────────────────────────────────────────────────────────

export type TooltipType = 'Plain' | 'Rich' | 'Data';
export type TooltipPlacement = 'Left' | 'Right' | 'Up' | 'Down';
export type ChartColor = 'download' | 'upload' | 'latency' | 'loss';

export interface DataRow {
  label: string;
  value: string;
  color: ChartColor;
  trend?: 'up' | 'down' | null;
  /** Show the colored legend dot. Defaults to true. */
  hasLegend?: boolean;
  /** Shape of the legend indicator. Defaults to 'square'. Instance-swappable in Figma. */
  legendShape?: 'square' | 'circle' | 'line';
  /** Show the trend arrow icon. Defaults to true. */
  hasIcon?: boolean;
}

export interface TooltipProps {
  /** Visual style of the tooltip */
  type?: TooltipType;
  /** Which side of the trigger element the tooltip appears on */
  placement?: TooltipPlacement;
  /** Show title (Rich and Data only) */
  hasTitle?: boolean;
  /** Show "Learn more" action link (Rich only) */
  hasAction?: boolean;
  /** Show the subtitle / time range label (Data only) */
  hasSubtitle?: boolean;
  /** Short label text (Plain only) */
  textShort?: string;
  /** Body paragraph text (Rich only) */
  textLong?: string;
  /** Title text (Rich and Data) */
  title?: string;
  /** Subtitle text (Data only — time range string) */
  subtitle?: string;
  /** Data rows to display (Data only) */
  dataRows?: DataRow[];
  /** Called when the "Learn more" action is clicked */
  onAction?: () => void;
  className?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

// Full class names must be spelled out so Tailwind includes them in the build
const chartClasses: Record<ChartColor, { bg: string; text: string }> = {
  download: { bg: 'bg-chart-download', text: 'text-chart-download' },
  upload:   { bg: 'bg-chart-upload',   text: 'text-chart-upload'   },
  latency:  { bg: 'bg-chart-latency',  text: 'text-chart-latency'  },
  loss:     { bg: 'bg-chart-loss',     text: 'text-chart-loss'     },
};

// Position the beak (arrow) on the correct edge based on placement
// Offsets derived from Figma: inner beak is 8×8px rotated 45°, outer container is 8√2 ≈ 11.314px
const beakPositionClasses: Record<TooltipPlacement, string> = {
  Left:  'absolute -right-[5.31px] top-1/2 -translate-y-1/2',
  Right: 'absolute -left-[5px]    top-1/2 -translate-y-1/2',
  Up:    'absolute -bottom-[5.31px] left-1/2 -translate-x-1/2',
  Down:  'absolute -top-[6px]      left-1/2 -translate-x-1/2',
};

const DEFAULT_DATA_ROWS: DataRow[] = [
  { label: 'Download',    value: '7.05 KB', color: 'download', trend: 'down' },
  { label: 'Upload',      value: '7.05 KB', color: 'upload',   trend: 'up'   },
  { label: 'Latency',     value: '1 ms',    color: 'latency',  trend: null   },
  { label: 'Packet Loss', value: '0 %',     color: 'loss',     trend: null   },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M8 12.67V3.33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 7L8 3L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M8 3.33V12.67" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 9L8 13L12 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────

export default function Tooltip({
  type = 'Plain',
  placement = 'Left',
  hasTitle = true,
  hasAction = true,
  hasSubtitle = true,
  textShort = 'A few words to display the label',
  textLong = 'This is long text paragraph to explain the functionality and additional information for users',
  title,
  subtitle = 'Mar 18 10:00 AM - Mar 19 9:50 AM',
  dataRows,
  onAction,
  className,
}: TooltipProps) {
  const resolvedTitle =
    title ?? (type === 'Rich' ? 'Approaching camera limit' : 'Apple messenger');
  const rows = dataRows ?? DEFAULT_DATA_ROWS;

  // Outer gap applies to Rich and Data (4px between content block and action)
  const outerGap = (type === 'Rich' || type === 'Data') ? 'gap-1' : '';
  // Content gap only applies to Rich and Data (8px between stacked items)
  const contentGap = type !== 'Plain' ? 'gap-2' : '';

  return (
    <div
      className={
        className ??
        `relative inline-flex flex-col items-start bg-tooltip rounded-tooltip shadow-tooltip p-3 max-w-[300px] ${outerGap}`
      }
    >
      {/* Beak (directional arrow) — 8×8px square rotated 45°, outer wrapper = 8√2 ≈ 11.314px */}
      <div className={`${beakPositionClasses[placement]} flex items-center justify-center size-[11.314px] z-10`}>
        <div className="size-2 rotate-45 bg-tooltip" />
      </div>

      {/* Content block */}
      <div className={`flex flex-col items-start w-full ${contentGap}`}>

        {/* Rich — title */}
        {type === 'Rich' && hasTitle && (
          <p className="text-heading-s font-semibold text-text-inverse shrink-0">
            {resolvedTitle}
          </p>
        )}

        {/* Rich — body */}
        {type === 'Rich' && (
          <p className="text-body-xs font-normal text-text-inverse max-w-[280px] shrink-0">
            {textLong}
          </p>
        )}

        {/* Data — title */}
        {type === 'Data' && hasTitle && (
          <p className="text-heading-s font-semibold text-text-inverse whitespace-nowrap shrink-0">
            {resolvedTitle}
          </p>
        )}

        {/* Data — time label */}
        {type === 'Data' && hasSubtitle && (
          <p className="text-body-xs font-normal text-text-inverse-subtle whitespace-nowrap shrink-0">
            {subtitle}
          </p>
        )}

        {/* Data — rows */}
        {type === 'Data' && (
          <div className="flex flex-col gap-1 items-start w-[216px] shrink-0">
            {rows.map((row) => (
              <div key={row.label} className="flex items-center justify-between w-full">
                {/* Label */}
                <div className="flex gap-1 items-center">
                  {row.hasLegend !== false && (() => {
                    const shape = row.legendShape ?? 'square';
                    const bg = chartClasses[row.color].bg;
                    if (shape === 'circle')
                      return <div className={`${bg} size-2 rounded-full shrink-0`} />;
                    if (shape === 'line')
                      return <div className={`${bg} w-3 h-[2px] rounded-full shrink-0`} />;
                    return <div className={`${bg} size-2 shrink-0`} />;
                  })()}
                  <span className="text-body-xs font-normal text-text-inverse-subtle whitespace-nowrap">
                    {row.label}
                  </span>
                </div>
                {/* Value */}
                <div className={`flex gap-1 items-center ${chartClasses[row.color].text}`}>
                  {row.hasIcon !== false && row.trend === 'down' && <ArrowDownIcon className="size-4 shrink-0" />}
                  {row.hasIcon !== false && row.trend === 'up'   && <ArrowUpIcon   className="size-4 shrink-0" />}
                  <span className="text-body-xs font-normal text-right whitespace-nowrap">
                    {row.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Plain — short label */}
        {type === 'Plain' && (
          <p className="text-body-xs font-normal text-text-inverse max-w-[280px] whitespace-nowrap shrink-0">
            {textShort}
          </p>
        )}
      </div>

      {/* Rich & Data — action link */}
      {(type === 'Rich' || type === 'Data') && hasAction && (
        <button
          onClick={onAction}
          className="text-action-s font-normal text-action-primary leading-5 whitespace-nowrap py-[6px] bg-transparent border-none cursor-pointer p-0 hover:text-text-primary-hover transition-colors duration-150"
        >
          Learn more
        </button>
      )}
    </div>
  );
}
