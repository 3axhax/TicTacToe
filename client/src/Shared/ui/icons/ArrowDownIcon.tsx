import React, { ReactElement } from "react";

interface ArrowDownProps extends React.ComponentPropsWithoutRef<"svg"> {
  size?: number;
}

const ArrowDownIcon = ({
  size,
  style,
  ...others
}: ArrowDownProps): ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      fill="currentColor"
      {...others}
    >
      <path
        fill="#0D0E21"
        d="m6.997 8.777 3.407-3.654a.7.7 0 0 1 1.024.955l-3.914 4.198a.697.697 0 0 1-.329.198.7.7 0 0 1-.702-.196L2.568 6.08a.7.7 0 0 1 1.024-.955l3.405 3.652Z"
      />
    </svg>
  );
};

export default ArrowDownIcon;
