import "./App.css";
import { useEffect, useContext } from "react";
import googleOneTap from "google-one-tap";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./context/AuthContext";
import KanbanBoard from "./KanbanBoard";

function App() {
  const { user, setUser, logout } = useContext(AuthContext);

 useEffect(() => {
  if (!user) {
    googleOneTap({
      client_id: "269691873006-8887diih7ljcabf8pk9sqacjd9hpkla8.apps.googleusercontent.com",
      callback: (response) => {
        console.log("LOGIN OK", response);
        const decoded = jwtDecode(response.credential);
        setUser(decoded);
      },
      auto_select: false,
      cancel_on_tap_outside: true,
    });
  }
}, [user]);

  return (
    <div>
      <h1>Kanban Board</h1>

      {user ? (
        <>
          <div className="header">
    <div className="user">
      <img src={user.picture} width="40" />
      <span>{user.name}</span>
      <button onClick={logout}>Salir</button>
    </div>
    </div>

          <KanbanBoard />
        </>
      ) : (
        <p>Inicia sesión para acceder al tablero</p>
      )}
    </div>
  );
}

export default App;