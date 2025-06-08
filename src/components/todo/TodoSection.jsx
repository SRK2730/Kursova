import React from 'react';
import TaskList from './TaskList';
import Button from '../base/Button';
import useLocalStorage from '../../hooks/useLocalStorage';
import { LOCAL_STORAGE_TODO_FILTER } from '../../models/constants';

const TodoSection = ({ tasks, onDelete, onToggle }) => {
  const [filter, setFilter] = useLocalStorage(LOCAL_STORAGE_TODO_FILTER, 'all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <section className="todo-section mb-5 p-4 bg-white rounded shadow-sm">
      <h2 className="mb-4">Внутрішні задачі</h2>
      
      <div className="d-flex flex-wrap gap-2 mb-3">
        <Button 
          variant={filter === 'all' ? 'primary' : 'outline-primary'}
          onClick={() => setFilter('all')}
        >
          Всі
        </Button>
        <Button 
          variant={filter === 'active' ? 'primary' : 'outline-primary'}
          onClick={() => setFilter('active')}
        >
          Активні
        </Button>
        <Button 
          variant={filter === 'completed' ? 'primary' : 'outline-primary'}
          onClick={() => setFilter('completed')}
        >
          Виконані
        </Button>
      </div>
      
      <div className="border rounded overflow-hidden">
        <TaskList 
          tasks={filteredTasks} 
          onDelete={onDelete} 
          onToggle={onToggle} 
        />
      </div>
      
      {tasks.length > 0 && (
        <div className="mt-3 text-end text-muted small">
          Задач: {tasks.length} | Виконано: {tasks.filter(t => t.completed).length}
        </div>
      )}
    </section>
  );
};

export default TodoSection;