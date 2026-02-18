import { useEffect, useContext } from "react";
import googleOneTap from "google-one-tap";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user, setUser, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      googleOneTap({
        client_id: "269691873006-8887diih7ljcabf8pk9sqacjd9hpkla8.apps.googleusercontent.com",
        callback: (response) => {
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
        <div>
          <img src={user.picture} width="60" />
          <h3>{user.name}</h3>
          <button onClick={logout}>Cerrar sesión</button>
        </div>
      ) : (
        <p>Inicia sesión para acceder</p>
      )}
    </div>
  );
}

export default App;
