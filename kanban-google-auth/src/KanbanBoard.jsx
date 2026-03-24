import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function KanbanBoard() {
  const { user } = useContext(AuthContext);

  const [tasks, setTasks] = useState(() => {
  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : [];
});
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!text) return;

    const newTask = {
      id: Date.now(),
      text,
      status: "pending",
      author: user.name
    };

    setTasks([...tasks, newTask]);
    setText("");
  };

  const move = (id, status) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status } : t));
  };

  const remove = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const column = (status, title) => (
  <div className="column">
    <h3>{title}</h3>

    {tasks
      .filter((t) => t.status === status)
      .map((t) => (
        <div key={t.id} className="task">
          <p>{t.text}</p>
          <small>{t.author}</small>

          <div className="buttons">
            <button onClick={() => move(t.id, "pending")}>⬅️</button>
            <button onClick={() => move(t.id, "in-progress")}>➡️</button>
            <button onClick={() => move(t.id, "completed")}>✔️</button>
            <button onClick={() => remove(t.id)}>❌</button>
          </div>
        </div>
      ))}
  </div>
);

  return (
  <div>
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nueva tarea"
      />
      <button onClick={addTask}>Añadir</button>
    </div>

    <div className="board">
      {column("pending", "Pendiente")}
      {column("in-progress", "En progreso")}
      {column("completed", "Completado")}
    </div>
  </div>
);
}

export default KanbanBoard;