import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { addTask, updateTask, deleteTask, toggleDone } from "./tasksSlice";
import StarsCanvas from "./stars";

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  const [TaskInfo, setTaskInfo] = useState({
    name: "",
    description: "",
    done: false,
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [showDone, setShowDone] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskInfo({
      ...TaskInfo,
      [name]: value,
    });
  };

  const handleAddTask = () => {
    dispatch(addTask(TaskInfo));
    setTaskInfo({
      name: "",
      description: "",
      done: false,
    });
  };

  const handleUpdateTask = () => {
    if (editingIndex !== null) {
      dispatch(updateTask({ index: editingIndex, updatedTask: TaskInfo }));
      setEditingIndex(null);
      setTaskInfo({
        name: "",
        description: "",
        done: false,
      });
    }
  };

  const handleDelete = (index) => {
    dispatch(deleteTask(index));
  };

  const handleEdit = (index) => {
    setTaskInfo(tasks[index]);
    setEditingIndex(index);
  };

  const handleBoth = () => {
    dispatch(addTask(TaskInfo));
    setEditingIndex(tasks.length);
    setTaskInfo({
      name: "",
      description: "",
      done: false,
    });
  };

  const toggleTaskDone = (index) => {
    dispatch(toggleDone(index));
  };

  const filteredTasks = showDone ? tasks.filter((task) => task.done) : tasks;

  const backgroundImageStyle = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "20px",
    minHeight: "100vh",
    width: "100vh",
  };

  return (
    <div style={{ backgroundColor: "#332D2D" }}>
      <div>
        <label style={{ color: "white" }}>
          <input
            type="checkbox"
            checked={showDone}
            onChange={(e) => setShowDone(e.target.checked)}
            style={{ marginLeft: "10px", height: "70px", width: "50px" }}
          />{" "}
          <center>
            <h1 style={{ backgroundColor: "black", height: "60px" }}>
              {" "}
              Show Done Tasks
            </h1>
          </center>
        </label>
      </div>

      <div
        hidden={editingIndex === null}
        style={{
          position: "sticky",
          height: "50rem",
          width: "90rem",
          opacity: "80%",
          top: "1px",
          left: "1px",
          zIndex: "9999",
          backgroundColor: "black",
        }}
      >
        <div
          hidden={editingIndex === null}
          style={{
            height: "20rem",
            width: "20rem",
            backgroundColor: "#008080",
            border: "solid",
            borderColor: "rgb(22, 16, 35)",
            margin: "10px",
            borderTopLeftRadius: "30%",
            borderTopRightRadius: "10%",
            borderBottomRightRadius: "30%",
            borderBottomLeftRadius: "10%",
            position: "sticky",
            zIndex: "9999",
            top: "30%",
            left: "40%",
            opacity: "100%",
          }}
        >
          <center>
            <button
              style={{
                marginTop: "0px",
                borderRadius: "10%",
                width: "5rem",
                height: "3rem",
                backgroundColor: "#FF6347",
                border: "solid",
                borderBlockColor: "rgb(22, 16, 35)",
                margin: "10px",
                float: "right",
                color: "black",
              }}
              type="button"
              onClick={handleUpdateTask}
              disabled={editingIndex === null}
            >
              Update Task
            </button>
          </center>
          <center>
            <input
              type="text"
              onChange={handleChange}
              value={TaskInfo.name}
              name="name"
              placeholder="Title"
              style={{
                margin: "20px",
                color: "white",
                height: "30px",
                width: "60%",
                borderRadius: "10px",
                backgroundColor: "black",
                opacity: "70%",
              }}
            />
          </center>

          <input
            type="text"
            onChange={handleChange}
            value={TaskInfo.description}
            name="description"
            placeholder="Description"
            style={{
              marginLeft: "15px",
              color: "white",
              marginTop: "30px",
              height: "40px",
              width: "90%",
              backgroundColor: "black",
              opacity: "70%",
              borderRadius: "10px",
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {filteredTasks.map((task, index) => (
          <Card
            key={index}
            task={task}
            index={index}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            toggleTaskDone={toggleTaskDone}
          />
        ))}
        <div
          style={{
            height: "20rem",
            width: "20rem",
            backgroundColor: "#008080",
            border: "solid",
            borderColor: "rgb(22, 16, 35)",
            margin: "10px",
            borderTopLeftRadius: "30%",
            borderTopRightRadius: "10%",
            borderBottomRightRadius: "30%",
            borderBottomLeftRadius: "10%",
            opacity: "0.6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleBoth}
        >
          <div
            style={{
              borderRadius: "30%",
              height: "15rem",
              width: "15rem",
              backgroundColor: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1 style={{ color: "white", fontSize: "100px" }}>+</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
