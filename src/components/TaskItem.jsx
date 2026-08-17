function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.status === 'COMPLETED' ? 'completed' : ''}`}>
      <div className="task-content">
        <span className="task-title">{task.title}</span>
        <span className="task-date">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="task-actions">
        <button
          className="btn-toggle"
          onClick={() => onToggle(task.id, task.status === 'PENDING' ? 'COMPLETED' : 'PENDING')}
        >
          {task.status === 'PENDING' ? '✓ Complete' : '↩ Undo'}
        </button>
        <button className="btn-delete" onClick={() => onDelete(task.id)}>
          ✕ Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
