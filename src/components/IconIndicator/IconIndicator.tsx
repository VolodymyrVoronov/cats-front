import type { ReactNode } from 'react';
import { useId } from 'react';
import { Badge } from 'primereact/badge';
import { Tooltip } from 'primereact/tooltip';

interface IIconIndicatorProps {
  icon: ReactNode;
  tooltipText?: string;
  flag: boolean;
}

const IconIndicator = ({
  icon,
  tooltipText,
  flag,
}: IIconIndicatorProps): JSX.Element => {
  const tooltipId = useId();
  const editedTooltipText = tooltipId.replace(/:/g, '');

  return (
    <>
      <Tooltip target={`.${editedTooltipText}`} />

      <i
        className={`${editedTooltipText} pi p-overlay-badge`}
        data-pr-tooltip={tooltipText}
        data-pr-position='bottom'
        style={{ fontSize: '3rem', opacity: flag ? 1 : 0.5 }}
      >
        {icon}
        <Badge severity={flag ? 'success' : 'danger'}></Badge>
      </i>
    </>
  );
};

export default IconIndicator;
