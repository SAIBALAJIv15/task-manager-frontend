import axios from 'axios';

const API_BASE = '/api/tasks';

export const taskApi = {
  // GET /api/tasks - Get all tasks
  getAll: () => axios.get(API_BASE).then(res => res.data),

  // POST /api/tasks - Create a new task
  create: (title) => axios.post(API_BASE, { title }).then(res => res.data),

  // PUT /api/tasks/:id - Update task
  update: (id, data) => axios.put(`${API_BASE}/${id}`, data).then(res => res.data),

  // DELETE /api/tasks/:id - Delete task
  delete: (id) => axios.delete(`${API_BASE}/${id}`).then(res => res.data),

  // GET /api/tasks/health - Health check
  health: () => axios.get(`${API_BASE}/health`).then(res => res.data),
};
