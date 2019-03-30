import React from "react";
import { Input } from "semantic-ui-react";

const Settings = ({
  maximumPoints,
  onMaximumPointsChange,
  totalTime,
  onTotalTimeChange,
  ...otherProps
}) => (
  <div style={{ whiteSpace: "nowrap" }}>
    <Input
      label="Maximum Points"
      type="number"
      value={maximumPoints}
      onChange={onMaximumPointsChange}
      style={{ marginLeft: "1em", marginRight: "1em" }}
    />
    <Input
      label="Total Time (Minutes)"
      type="number"
      value={totalTime}
      onChange={onTotalTimeChange}
    />
  </div>
);

export { Settings };
