import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  const addTodo = () => {
    if (!input) return;
    fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: input }),
    })
      .then(res => res.json())
      .then(newTodo => {
        setTodos([...todos, newTodo]);
        setInput("");
      });
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, { method: "DELETE" })
      .then(() => setTodos(todos.filter(t => t.id !== id)));
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Segoe UI', sans-serif"
    }}>
      <div style={{
        background: "white",
        borderRadius: "20px",
        padding: "40px",
        width: "100%",
        maxWidth: "480px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
      }}>
        {/* Header */}
        <h1 style={{
          margin: "0 0 8px 0",
          fontSize: "32px",
          color: "#333"
        }}>My Tasks 📝</h1>
        <p style={{ color: "#888", margin: "0 0 30px 0" }}>
          {todos.length} task{todos.length !== 1 ? "s" : ""} remaining
        </p>

        {/* Input */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addTodo()}
            placeholder="Add a new task..."
            style={{
              flex: 1,
              padding: "14px 18px",
              borderRadius: "12px",
              border: "2px solid #eee",
              fontSize: "15px",
              outline: "none",
              transition: "border 0.2s"
            }}
          />
          <button
            onClick={addTodo}
            style={{
              padding: "14px 22px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              color: "white",
              fontSize: "22px",
              cursor: "pointer"
            }}
          >+</button>
        </div>

        {/* Todo List */}
        {todos.length === 0 ? (
          <div style={{ textAlign: "center", color: "#bbb", padding: "40px 0" }}>
            <div style={{ fontSize: "48px" }}>🎉</div>
            <p>No tasks yet! Add one above.</p>
          </div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {todos.map((todo, index) => (
              <li key={todo.id} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 18px",
                marginBottom: "10px",
                borderRadius: "12px",
                background: "#f8f9ff",
                border: "2px solid #eef0ff",
                animation: "fadeIn 0.3s ease"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #667eea, #764ba2)"
                  }}/>
                  <span style={{ fontSize: "15px", color: "#333" }}>{todo.title}</span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={{
                    background: "#fff0f0",
                    border: "none",
                    borderRadius: "8px",
                    padding: "6px 10px",
                    cursor: "pointer",
                    fontSize: "16px",
                    color: "#ff4d4d"
                  }}
                >🗑️</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;