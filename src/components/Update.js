import React from "react";
import {
  Card,
  Input,
  Statistic,
  Icon,
  Message,
  Transition,
  Button
} from "semantic-ui-react";

const Update = ({
  name,
  onNameChange,
  points,
  onPointsChange,
  complexity,
  maxComplexity,
  onComplexityChange,
  remainingPoints,
  totalRemainingPoints,
  onDelete,
  amount
}) => (
  <Card
    header={
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          overflowX: "auto"
        }}
      >
        <Input
          style={{ width: "100%", paddingRight: "1em" }}
          value={name}
          type="text"
          onChange={onNameChange}
        />
        <Button color="red" icon="delete" basic onClick={onDelete} />
      </div>
    }
    description={
      <div style={{ textAlign: "center" }}>
        <Icon name="time" />
        <Statistic
          size="tiny"
          label="Optimal Time"
          value={`${amount} minutes`}
        />
      </div>
    }
    extra={
      <>
        <Input
          label="Complexity"
          value={complexity}
          min="1"
          max={maxComplexity}
          type="range"
          fluid
          style={{ paddingBottom: "1em" }}
          onChange={onComplexityChange}
        />
        <Input
          label="Points"
          value={points}
          min="1"
          max={remainingPoints}
          type="number"
          fluid
          onChange={onPointsChange}
        />
        <Transition.Group animation="zoom">
          {totalRemainingPoints !== 0 && totalRemainingPoints > 0 && (
            <Message
              info
              header="Unassigned points"
              content={`There ${
                totalRemainingPoints == 1 ? "is" : "are"
              } still ${totalRemainingPoints} remaining ${
                totalRemainingPoints == 1 ? "point" : "points"
              }.`}
            />
          )}
          {totalRemainingPoints < 0 && (
            <Message
              negative
              header="Points maximum reached"
              content={`${0 - totalRemainingPoints} more ${
                0 - totalRemainingPoints === 1 ? "point" : "points"
              } then there are available have been distributed.`}
            />
          )}
        </Transition.Group>
      </>
    }
    fluid
  />
);

export { Update };
