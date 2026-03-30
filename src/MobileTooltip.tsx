
export interface MobileTooltipProps {
  /** Show the title. Defaults to true. */
  hasTitle?: boolean;
  /** Show the "Learn more" action link. Defaults to true. */
  hasAction?: boolean;
  /** Title text */
  title?: string;
  /** Body paragraph text */
  textLong?: string;
  /** Called when the "Learn more" action is clicked */
  onAction?: () => void;
}

export default function MobileTooltip({
  hasTitle = true,
  hasAction = true,
  title = 'Approaching camera limit',
  textLong = 'This is long text paragraph to explain the functionality and additional information for users',
  onAction,
}: MobileTooltipProps) {
  return (
    <div className="relative flex flex-col items-start bg-tooltip rounded-t-sheet px-4 py-6 gap-3 w-full">
      {/* Handle bar */}
      <div className="flex items-center justify-center w-full pb-2">
        <div className="w-8 h-1 rounded-full bg-text-inverse-subtle shrink-0" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 items-start text-text-inverse w-full">
        {hasTitle && (
          <p className="text-heading-m font-semibold w-full">
            {title}
          </p>
        )}
        <p className="text-body-s font-normal w-full">
          {textLong}
        </p>
      </div>

      {/* Action */}
      {hasAction && (
        <button
          onClick={onAction}
          className="w-full text-action-m font-normal text-action-primary text-center py-[6px] bg-transparent border-none cursor-pointer hover:text-text-primary-hover transition-colors duration-150"
        >
          Learn more
        </button>
      )}
    </div>
  );
}
