import React, { useState } from "react";
import { DefaultLayout } from "../layouts/Default";
import { Create } from "../components/Create";
import { List } from "../components/List";
import { Modal, Button } from "semantic-ui-react";
import { withTime, asGenericWorkload } from "../utils";
import { Settings } from "../components/Settings";

const factorMap = [
  {
    from: "points",
    to: 1
  },
  {
    from: "complexity",
    to: 2
  }
];

const initalTasks = [
  {
    name: "Characterization",
    points: 20,
    complexity: 4
  },
  {
    name: "Multiple Choice",
    points: 18,
    complexity: 5
  },
  {
    name: "Debate Analysis",
    points: 12,
    complexity: 8
  },
  {
    name: "Interpretation",
    points: 10,
    complexity: 10
  }
];

const Home = props => {
  const [input, setInput] = useState(
    localStorage.getItem("initalTasks")
      ? JSON.parse(localStorage.getItem("initalTasks"))
      : initalTasks
  );
  const [createTaskModalIsOpen, setCreateTaskModalIsOpen] = useState(false);
  const createTask = newTask => {
    const newInput = [...input, newTask];
    localStorage.setItem("initalTasks", JSON.stringify(newInput));
    setInput(newInput);
  };
  const updateTask = ({ oldName, ...restItem }) => {
    const newInput = input.map(input =>
      input.name === oldName ? restItem : input
    );
    setInput(newInput);
    localStorage.setItem("initalTasks", JSON.stringify(newInput));
  };
  const deleteTask = oldName => {
    const newInput = input.filter(input => input.name !== oldName);
    setInput(newInput);
    localStorage.setItem("initalTasks", JSON.stringify(newInput));
  };
  const [maximumPoints, setMaximumPoints] = useState(
    localStorage.getItem("maximumPoints")
      ? parseInt(localStorage.getItem("maximumPoints"))
      : 60
  );
  const [totalTime, setTotalTime] = useState(
    localStorage.getItem("totalTime")
      ? parseInt(localStorage.getItem("totalTime"))
      : 270
  );
  const factors = [
    {
      id: 1,
      name: "points",
      total: maximumPoints,
      weight: 3
    },
    {
      id: 2,
      name: "complexity",
      total: totalTime,
      weight: 2
    }
  ];
  const items = withTime(
    asGenericWorkload(input, factorMap),
    factors,
    totalTime
  );
  const remainingPoints = currentPoints =>
    maximumPoints -
    items.reduce((sum, item) => sum + item.points, 0) +
    currentPoints;
  const clearTasks = () => {
    setInput([]);
    setMaximumPoints(60);
    setTotalTime(270);
    localStorage.clear();
  };
  const importTasks = () => {
    const importedTasks = JSON.parse(
      prompt("Enter the contents of the exported file:", "")
    );
    if (importedTasks) {
      setMaximumPoints(importedTasks.maximumPoints);
      localStorage.setItem(
        "maximumPoints",
        parseInt(importedTasks.maximumPoints)
      );
      setTotalTime(importedTasks.totalTime);
      localStorage.setItem("totalTime", parseInt(importedTasks.totalTime));
      setInput(importedTasks.input);
      localStorage.setItem(
        "importedTasks",
        JSON.stringify(importedTasks.input)
      );
      alert("Import successfull!");
    } else {
      alert("Import failed!");
    }
  };
  return (
    <DefaultLayout {...props}>
      <div
        style={{
          overflowX: "auto",
          minWidth: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1em"
        }}
      >
        <Modal
          closeIcon
          dimmer="blurring"
          open={createTaskModalIsOpen}
          onClose={() => setCreateTaskModalIsOpen(false)}
          trigger={
            <Button
              onClick={() => setCreateTaskModalIsOpen(true)}
              style={{ whiteSpace: "nowrap" }}
              primary
              icon="add"
              content="Add task"
            />
          }
        >
          <Modal.Header>Add Task</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Create
                onCreate={e => {
                  createTask(e.task);
                  setCreateTaskModalIsOpen(false);
                }}
              />
            </Modal.Description>
          </Modal.Content>
        </Modal>
        <Settings
          maximumPoints={maximumPoints}
          onMaximumPointsChange={e => {
            setMaximumPoints(e.target.value);
            localStorage.setItem("maximumPoints", e.target.value);
          }}
          totalTime={totalTime}
          onTotalTimeChange={e => {
            setTotalTime(e.target.value);
            localStorage.setItem("totalTime", e.target.value);
          }}
        />
      </div>
      <List
        onChange={updateTask}
        onDelete={deleteTask}
        items={items}
        maxComplexity={10}
        remainingPoints={remainingPoints}
        style={{
          marginBottom: "1em"
        }}
      />
      <div style={{ display: "flex", overflowX: "auto", whiteSpace: "nowrap" }}>
        <Button
          color="red"
          icon="delete"
          content="Clear all tasks"
          onClick={clearTasks}
        />
        <Button
          as="a"
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(
              {
                maximumPoints,
                totalTime,
                input,
                output: items
              },
              null,
              4
            )
          )}`}
          icon="download"
          content="Export"
          download={`felix-pojtingers-task-timer-${new Date().toISOString()}.json`}
        />
        <Button icon="upload" content="Import" onClick={importTasks} />
      </div>
    </DefaultLayout>
  );
};

export { Home };
