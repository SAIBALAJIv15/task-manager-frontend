import { useState, useEffect } from 'react';
import { taskApi } from './api/taskApi';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [health, setHealth] = useState(null);

  // Load tasks on mount
  useEffect(() => {
    loadTasks();
    checkHealth();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await taskApi.getAll();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks. Is the backend running?');
      console.error('Load tasks error:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkHealth = async () => {
    try {
      const data = await taskApi.health();
      setHealth(data);
    } catch (err) {
      setHealth({ status: 'DOWN', error: err.message });
    }
  };

  const addTask = async (title) => {
    try {
      await taskApi.create(title);
      loadTasks(); // Refresh the list
    } catch (err) {
      setError('Failed to add task');
      console.error('Add task error:', err);
    }
  };

  const toggleTask = async (id, newStatus) => {
    try {
      await taskApi.update(id, { status: newStatus });
      loadTasks();
    } catch (err) {
      setError('Failed to update task');
      console.error('Toggle task error:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskApi.delete(id);
      loadTasks();
    } catch (err) {
      setError('Failed to delete task');
      console.error('Delete task error:', err);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 Task Manager- Auto-Deployed via CI/CD!</h1>
        <p className="subtitle">3-Tier Architecture: React + Spring Boot + MySQL</p>
      </header>

      <main className="app-main">
        <TaskForm onAdd={addTask} />

        {error && <div className="error-banner">{error}</div>}

        {loading ? (
          <p className="loading">Loading tasks...</p>
        ) : (
          <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
        )}
      </main>

      <footer className="app-footer">
        <div className={`health-status ${health?.status === 'UP' ? 'healthy' : 'unhealthy'}`}>
          API: {health?.status || 'Checking...'} | {health?.service || ''}
          {health?.timestamp && ` | ${new Date(health.timestamp).toLocaleTimeString()}`}
        </div>
        <p>AWS + DevOps + Linux Training | Instructor: Chandru Hannikeri</p>
      </footer>
    </div>
  );
}

export default App;
