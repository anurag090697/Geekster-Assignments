import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [taskArr, setTask] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    let tm = localStorage.getItem("taskArr");
    if (tm) {
      try {
        setTask(JSON.parse(tm));
      } catch (e) {
        console.error("Failed to parse tasks from localStorage", e);
      }
    }
  }, []);

  const addItem = () => {
    if (inputValue.trim()) {
      const newTasks = [...taskArr, { text: inputValue, completed: false }];
      setTask(newTasks);
      localStorage.setItem("taskArr", JSON.stringify(newTasks)); // update localStorage immediately
      setInputValue(""); // Clear the input after adding the item
    }
  };

  const deleteItem = (index) => {
    const newTaskArr = taskArr.filter((_, i) => i !== index);
    setTask(newTaskArr);
    localStorage.setItem("taskArr", JSON.stringify(newTaskArr)); // update localStorage immediately
  };

  const toggleComplete = (index) => {
    const newTaskArr = taskArr.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setTask(newTaskArr);
    localStorage.setItem("taskArr", JSON.stringify(newTaskArr)); // update localStorage immediately
  };

  return (
    <div className="container">
      <div className="box">
        <h1>Grocery Bud</h1>
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={addItem}>Add Item</button>
        </div>
        <div>
          {taskArr.map((ele, index) => (
            <div key={index} className="task-item">
              <input
                type="checkbox"
                checked={ele.completed}
                onChange={() => toggleComplete(index)}
              />
              <p
                style={{
                  textDecoration: ele.completed ? "line-through" : "none",
                }}
              >
                {ele.text}
              </p>
              <button onClick={() => deleteItem(index)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
