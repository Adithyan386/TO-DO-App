import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [Task, SetTask] = useState('');
  const [Tasks, SetTasks] = useState([]);

  const AddTask = (e) => {
    e.preventDefault();
    if (Task) {
      const newtask = { id: new Date().getTime().toString(), title: Task, completed: false };
      SetTasks([...Tasks, newtask]);
      localStorage.setItem('localTasks', JSON.stringify([...Tasks, newtask]));
      SetTask('');
    }
  };

  const toggleTask = (Task) => {
    const updatedTasks = Tasks.map((t) =>
      t.id === Task.id ? { ...t, completed: !t.completed } : t
    );
    SetTasks(updatedTasks);
    localStorage.setItem('localTasks', JSON.stringify(updatedTasks));
  };

  const handleDelete = (Task) => {
    const deleted = Tasks.filter((t) => t.id !== Task.id);
    SetTasks(deleted);
    localStorage.setItem('localTasks', JSON.stringify(deleted));
  };

  useEffect(() => {
    const storedData = localStorage.getItem('localTasks');
    if (storedData) {
      SetTasks(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="app-background">
      <div className="container">
        <h1 className="mt-3 text-center" style={{ fontWeight: '900' }}>
          TO-DO App
        </h1>
        <div className="row justify-content-center">
          <div className="col-md-6 mt-3">
            <input
              type="text"
              onChange={(e) => SetTask(e.target.value)}
              value={Task}
              placeholder="Write Your Task"
              className="form-control"
            />
          </div>
          <div className="col-md-2 mt-3">
            <button
              className="btn btn-outline-info form-control"
              onClick={AddTask}
            >
              Add
            </button>
          </div>
        </div>
        <div className="row justify-content-center">
          {Tasks.map((t) => (
            <div key={t.id} className="col-md-8 d-flex align-items-center mt-3">
              <span
                className="form-control bg-white d-flex justify-content-between align-items-center"
                style={{
                  fontWeight: 'bold',
                  textDecoration: t.completed ? 'line-through' : 'none',
                }}
              >
                {t.title}
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleTask(t)}
                />
              </span>
              <button
                className="btn btn-outline-warning ms-2"
                onClick={() => handleDelete(t)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
