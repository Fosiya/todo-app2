import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [content, setContent] = useState("");
  const [todo, setTodo] = useState([]);
  const [showAuth, setShowAuth] = useState(true);
  const [showTodo, setShowTodo] = useState(false);

  axios.defaults.withCredentials = false;
  useEffect(() => {
    var user = cookies.get("username")
    var pass = cookies.get("password")

    if(user != null && pass != null)  
    {
      
      axios
      .post("http://localhost:4000/login", {
        username: user,
        password: pass,
      })
      .then((res) => {
        if(res.status === 200)
        {
          axios.get("http://localhost:4000/get", {
            params: {
              user: user            }
          })
      
          .then((res) => {
            setTodo(res.data);
          });
          setShowAuth(false);
          setShowTodo(true);
        }
      
      })
      .catch((err) => {
      });
      
    }
    
  }, []);
  const onSubmit = () => {
    axios
      .post("http://localhost:4000/register", {
        username: username,
        password: password,
      })
      .then((res) => {

        if(res.status === 200)
        {
          alert("Registered!")
          
        }
        else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const Login = () => {
    axios
      .post("http://localhost:4000/login", {
        username: loginName,
        password: loginPassword,
      })
      .then((res) => {
        if(res.status === 200)
        {
          alert("Logged in!");
          cookies.set('username', loginName, { path: '/' });
          cookies.set('password', loginPassword, { path: '/' });
          setShowAuth(false);
          setShowTodo(true);
        }
        
        
      })
      .catch((err) => {
      });
  };
 
  const createTodo = () => {
    axios
      .post("http://localhost:4000/add", {
        content: content,
        user: cookies.get("username")
      })
      .then((res) => {
        
        if(res.data.code === 300)
        {
          alert(res.data.message);
        }else{
          window.location.reload(true)
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const deleteTodo = (ID) => {
    axios
      .delete("http://localhost:4000/delete", {
        data: {
          id: ID,
        },
      })
      .then((res) => {
        window.location.reload(true)
      });

  };
  const toggleTodo = (id, completed) => {
    axios
      .put(`http://localhost:4000/update/${id}`, { completed: !completed })
      .then((res) => {
        setTodo((prevTodo) => {
          const newTodo = [...prevTodo];
          const todoIndex = newTodo.findIndex((todo) => todo.id === id);
          newTodo[todoIndex].completed = !completed;
          
          return newTodo;
        });
      })
      .catch((err) => {
      });
  };

  return (
    <div className="App">

      <div id="auth" style={{display: showAuth ? 'block' : 'none' }}>
      <h2>Register</h2>
      <label>Name</label>
      <input type="text" onChange={(e) => setUsername(e.target.value)} />
      <br />
      <label>Password</label>
      <input type="text" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={onSubmit}>Submit</button>
      <div>
        <h2>Login</h2>
        <label>Name</label>
        <input type="text" onChange={(e) => setLoginName(e.target.value)} />
        <br />
        <label>Password</label>
        <input type="text" onChange={(e) => setLoginPassword(e.target.value)} />
        <button onClick={Login}>Submit</button>
      </div>
      </div>
      <div style={{display: showTodo ? 'block' : 'none' }}>
        <h1>Todo List Form</h1>

        <label htmlFor="content">Content:</label>
        <input type="text" onChange={(e) => setContent(e.target.value)} />

        <br />
        <button onClick={createTodo}>Add</button>
        <div>
          todos:
          {todo.map((mytodos) => {
            return (
              <p key={mytodos.id}>
                <input
                  type="checkbox"
                  checked={mytodos.completed}
                  onChange={() =>
                    toggleTodo(mytodos.id, mytodos.completed)
                  }
                />
                {mytodos.content}
                <button onClick={() => deleteTodo(mytodos.id)}>
                  Delete
                </button>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
  }
export default App;