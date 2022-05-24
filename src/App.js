import './App.css';
import React, { useState, useEffect } from "react";

function App() {

  const [todos, setTodos] = useState([]);
  const [enteredValue, setEnteredValue] = useState("");
  const [page, setPage] = useState(1);

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
    fetch(`http://localhost:8080/todos?_page=${page}&_limit=4`)
      .then((res) => {
        return res.json();
      }).then((data) => {
        setTodos(data);
        setEnteredValue("");
      })
  }, [page])

  return (
    <div className="App">
      <div className="page_change">
        <button
          onClick={() => page > 1 ? setPage(page - 1) : setPage(1)}
        >{" <<<< "}
        </button>
        <h3>page number : {page}</h3>
        <button
          onClick={() => page < 4 ? setPage(page + 1) : setPage(1)}
        >{" >>>> "}
        </button>
      </div>
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
