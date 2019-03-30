import React from "react";
import { Grid, Segment, Transition } from "semantic-ui-react";
import { Update } from "./Update";

const List = ({
  items,
  onChange,
  onDelete,
  maxComplexity,
  remainingPoints,
  ...otherProps
}) =>
  items[0] ? (
    <Grid columns="3" stackable {...otherProps}>
      <Transition.Group animation="zoom">
        {items.map((item, index) => (
          <Grid.Column key={index}>
            <Update
              {...item}
              onNameChange={event =>
                onChange({
                  ...item,
                  name: event.target.value,
                  oldName: item.name
                })
              }
              onPointsChange={event =>
                onChange({
                  ...item,
                  points: parseInt(event.target.value),
                  oldName: item.name
                })
              }
              onComplexityChange={event =>
                onChange({
                  ...item,
                  complexity: parseInt(event.target.value),
                  oldName: item.name
                })
              }
              onDelete={() => onDelete(item.name)}
              maxComplexity={maxComplexity}
              remainingPoints={remainingPoints(item.points)}
              totalRemainingPoints={remainingPoints(0)}
              amount={Math.floor(item.amount)}
            />
          </Grid.Column>
        ))}
      </Transition.Group>
    </Grid>
  ) : (
    <Segment>No tasks yet! Go ahead an create a new one!</Segment>
  );

export { List };
