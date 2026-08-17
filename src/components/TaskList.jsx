import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty-state">No tasks yet. Add one above!</p>;
  }

  const pending = tasks.filter(t => t.status === 'PENDING');
  const completed = tasks.filter(t => t.status === 'COMPLETED');

  return (
    <div className="task-list">
      {pending.length > 0 && (
        <>
          <h3 className="section-title">📋 Pending ({pending.length})</h3>
          <ul>
            {pending.map(task => (
              <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
            ))}
          </ul>
        </>
      )}
      {completed.length > 0 && (
        <>
          <h3 className="section-title">✅ Completed ({completed.length})</h3>
          <ul>
            {completed.map(task => (
              <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default TaskList;
