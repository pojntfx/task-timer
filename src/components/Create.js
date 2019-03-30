import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";

const Create = ({ onCreate }) => {
  const [name, setName] = useState("");
  const [complexity, setComplexity] = useState(0);
  const [points, setPoints] = useState("");
  return (
    <Form
      onSubmit={event => {
        onCreate({
          event,
          task: {
            name,
            complexity,
            points
          }
        });
        setName("");
        setComplexity(0);
        setPoints("");
      }}
    >
      <Form.Input
        label="Name"
        type="text"
        placeholder="Task 1"
        onChange={e => setName(e.target.value)}
        value={name}
        required
      />
      <Form.Input
        label="Complexity"
        type="range"
        max="10"
        onChange={e => setComplexity(parseInt(e.target.value))}
        value={complexity}
        required
      />
      <Form.Input
        label="Points"
        type="number"
        max="60"
        placeholder="12"
        onChange={e => setPoints(parseInt(e.target.value))}
        value={points}
        required
      />
      <Button primary content="Create Task" icon="add" type="submit" />
    </Form>
  );
};

export { Create };
