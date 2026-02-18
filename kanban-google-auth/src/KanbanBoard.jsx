import { useState, useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function KanbanBoard() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const addTask = () => {
    const newTask = {
      id: Date.now(),
      title,
      author: user.name
    };

    setTasks([...tasks, newTask]);
    setTitle("");
  };

  return (
    <div>
      <h2>Nueva Tarea</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
      />
      <button onClick={addTask}>Agregar</button>

      <h2>Lista</h2>
      {tasks.map(task => (
        <div key={task.id}>
          <p>{task.title}</p>
          <small>Autor: {task.author}</small>
        </div>
      ))}
    </div>
  );
}

export default KanbanBoard;
