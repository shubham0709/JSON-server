import './App.css';
import React, { useState, useEffect } from "react";

function App() {

  const [todos, setTodos] = useState([]);
  const [enteredValue, setEnteredValue] = useState("");

  const pushNewValue = () => {
    fetch("http://localhost:8080/todos", {
      method: "POST",
      body: JSON.stringify({
        value: enteredValue,
        isCompleted: false
      }),
      headers: { "Content-type": "application/json" }
    }).then(res => res.json())
      .then(data => {
        setTodos([...todos, data])
      });
  }

  useEffect(() => {
    fetch("http://localhost:8080/todos/")
      .then((res) => {
        return res.json();
      }).then((data) => {
        setTodos(data);
        setEnteredValue("");
      })
  }, [])

  return (
    <div className="App">
      <h1>Using JSON server and UseEffect</h1>
      <input onChange={(e) => setEnteredValue(e.target.value)} />
      <button
        onClick={pushNewValue}
      >ADD</button>
      {
        todos.map(x => (
          <h1 key={x.id}>{x.value}</h1>
        ))
      }
    </div>
  );
}

export default App;
