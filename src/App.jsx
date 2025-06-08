import React, { useState, useEffect } from 'react';
import EmployeeCard from './components/EmployeeCard';
import TaskCard from './components/TaskCard';
import SelectedItemsPanel from './components/SelectedItemsPanel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Toast, ToastContainer, Button, Badge } from 'react-bootstrap';
import TodoSection from './components/todo/TodoSection';
import useLocalStorage from './hooks/useLocalStorage';
import { 
  LOCAL_STORAGE_SELECTED_EMPLOYEES, 
  LOCAL_STORAGE_SELECTED_TASKS,
  LOCAL_STORAGE_TODO_TASKS,
  LOCAL_STORAGE_EMPLOYEES
} from './models/constants';
import FireEmployeeModal from './components/FireEmployeeModal';
import HireEmployeeForm from './components/HireEmployeeForm';

function App() {
  // Стани для управління модальними вікнами
  const [showFireModal, setShowFireModal] = useState(false);
  const [showHireForm, setShowHireForm] = useState(false);
  const [employeeToFire, setEmployeeToFire] = useState(null);
  
  // Початкові дані співробітників
  const initialEmployees = [
    { 
      id: 1, 
      name: "Іван Петренко", 
      position: "Менеджер", 
      department: "Відділ продажів", 
      email: "ivan@example.com", 
      phone: "+380991234567",
      imgurl: "https://cdn-icons-png.flaticon.com/512/4140/4140039.png" 
    },
    { 
      id: 2, 
      name: "Марія Сидоренко", 
      position: "Розробник", 
      department: "IT", 
      email: "maria@example.com", 
      phone: "+380671234567",
      imgurl: "https://cdn-icons-png.flaticon.com/512/4140/4140047.png" 
    },
    { 
      id: 3, 
      name: "Олексій Іванов", 
      position: "Бухгалтер", 
      department: "Фінанси", 
      email: "oleksiy@example.com", 
      phone: "+380501234567",
      imgurl: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png" 
    },
    { 
      id: 4, 
      name: "Анна Коваленко", 
      position: "Дизайнер", 
      department: "Маркетинг", 
      email: "anna@example.com", 
      phone: "+380931234567",
      imgurl: "https://cdn-icons-png.flaticon.com/512/4140/4140038.png" 
    },
    { 
      id: 5, 
      name: "Віктор Мельник", 
      position: "Аналітик", 
      department: "Аналітика", 
      email: "viktor@example.com", 
      phone: "+380661234567",
      imgurl: "https://cdn-icons-png.flaticon.com/512/4140/4140037.png" 
    },
    { 
      id: 6, 
      name: "Наталія Шевченко", 
      position: "HR-менеджер", 
      department: "HR", 
      email: "natalia@example.com", 
      phone: "+380971234567",
      imgurl: "https://cdn-icons-png.flaticon.com/512/4140/4140051.png" 
    },
    { 
      id: 7, 
      name: "Дмитро Бондаренко", 
      position: "Тестувальник", 
      department: "IT", 
      email: "dmitro@example.com", 
      phone: "+380681234567",
      imgurl: "https://cdn-icons-png.flaticon.com/512/4140/4140044.png" 
    },
    { 
      id: 8, 
      name: "Юлія Коваль", 
      position: "Менеджер продукту", 
      department: "Розробка", 
      email: "yulia@example.com", 
      phone: "+380501234568",
      imgurl: "https://cdn-icons-png.flaticon.com/512/4140/4140036.png" 
    },
    { 
      id: 9, 
      name: "Андрій Ткаченко", 
      position: "Системний адміністратор", 
      department: "IT", 
      email: "andriy@example.com", 
      phone: "+380991234568",
      imgurl: "https://cdn-icons-png.flaticon.com/512/4140/4140046.png" 
    },
    { 
      id: 10, 
      name: "Катерина Лисенко", 
      position: "Юрист", 
      department: "Правовий відділ", 
      email: "kateryna@example.com", 
      phone: "+380671234568",
      imgurl: "https://cdn-icons-png.flaticon.com/512/4140/4140045.png" 
    }
  ];

  // Використання localStorage для співробітників
  const [employees, setEmployees] = useLocalStorage(LOCAL_STORAGE_EMPLOYEES, initialEmployees);
  
  // Стани для вибраних елементів та завдань
  const [selectedEmployees, setSelectedEmployees] = useLocalStorage(LOCAL_STORAGE_SELECTED_EMPLOYEES, []);
  const [selectedTasks, setSelectedTasks] = useLocalStorage(LOCAL_STORAGE_SELECTED_TASKS, []);
  const [todoTasks, setTodoTasks] = useLocalStorage(LOCAL_STORAGE_TODO_TASKS, []);
  
  // Стани для сповіщень та призначень
  const [showSuccess, setShowSuccess] = useState(false);
  const [assignmentDetails, setAssignmentDetails] = useState(null);
  const [assignmentName, setAssignmentName] = useState('');

  // Функції для роботи з ToDo задачами
  const deleteTask = (id) => {
    const updatedTasks = todoTasks.filter(task => task.id !== id);
    setTodoTasks(updatedTasks);
  };
  
  const toggleTask = (id) => {
    const updatedTasks = todoTasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTodoTasks(updatedTasks);
  };

  // Функція для звільнення співробітника
  const fireEmployee = (employeeId) => {
    setEmployees(prev => prev.filter(emp => emp.id !== employeeId));
    setSelectedEmployees(prev => prev.filter(emp => emp.id !== employeeId));
    setShowFireModal(false);
    setEmployeeToFire(null);
  };

  // Функція для найму нового співробітника
  const hireEmployee = (newEmployee) => {
    const newId = Math.max(...employees.map(e => e.id), 0) + 1;
    const employee = {
      id: newId,
      ...newEmployee
    };
    setEmployees(prev => [...prev, employee]);
    setShowHireForm(false);
  };

  // Функція для відкриття модалки звільнення
  const openFireModal = (employee) => {
    setEmployeeToFire(employee);
    setShowFireModal(true);
  };

  // Дані завдань
  const tasks = [
    { 
      id: 1, 
      title: "Завершити проект", 
      description: "Закінчити розробку нового модуля", 
      assignee: "Іван Петренко", 
      dueDate: "2023-12-31", 
      status: "В процесі",
      imgurl: "https://cdn-icons-png.flaticon.com/512/9554/9554926.png" 
    },
    { 
      id: 2, 
      title: "Оновити сервери", 
      description: "Виконати планове оновлення серверного обладнання", 
      assignee: "Андрій Ткаченко", 
      dueDate: "2023-11-30", 
      status: "В процесі",
      imgurl: "https://cdn-icons-png.flaticon.com/512/1165/1165806.png" 
    },
    { 
      id: 3, 
      title: "Оновити фінансовий звіт", 
      description: "Підготувати квартальний фінансовий звіт", 
      assignee: "Олексій Іванов", 
      dueDate: "2023-11-15", 
      status: "Не розпочато",
      imgurl: "https://cdn-icons-png.flaticon.com/512/1162/1162358.png" 
    },
    { 
      id: 4, 
      title: "Розробити лендінг", 
      description: "Створити лендінг сторінку для нового продукту", 
      assignee: "Анна Коваленко", 
      dueDate: "2023-11-20", 
      status: "В процесі",
      imgurl: "https://cdn-icons-png.flaticon.com/512/1165/1165790.png" 
    },
    { 
      id: 5, 
      title: "Провести тренінг", 
      description: "Організувати тренінг для нових співробітників", 
      assignee: "Наталія Шевченко", 
      dueDate: "2023-11-10", 
      status: "Завершено",
      imgurl: "https://cdn-icons-png.flaticon.com/512/6672/6672078.png" 
    },
    { 
      id: 6, 
      title: "Протестувати API", 
      description: "Провести повне тестування REST API", 
      assignee: "Дмитро Бондаренко", 
      dueDate: "2023-11-25", 
      status: "Не розпочато",
      imgurl: "https://cdn-icons-png.flaticon.com/512/3351/3351142.png" 
    }
  ];

  // Синхронізація між вкладками
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === LOCAL_STORAGE_SELECTED_EMPLOYEES) {
        try {
          const newValue = JSON.parse(e.newValue || '[]');
          setSelectedEmployees(newValue);
        } catch (error) {
          console.error('Error parsing selected employees from storage:', error);
        }
      }
      if (e.key === LOCAL_STORAGE_SELECTED_TASKS) {
        try {
          const newValue = JSON.parse(e.newValue || '[]');
          setSelectedTasks(newValue);
        } catch (error) {
          console.error('Error parsing selected tasks from storage:', error);
        }
      }
      if (e.key === LOCAL_STORAGE_TODO_TASKS) {
        try {
          const newValue = JSON.parse(e.newValue || '[]');
          setTodoTasks(newValue);
        } catch (error) {
          console.error('Error parsing todo tasks from storage:', error);
        }
      }
      if (e.key === LOCAL_STORAGE_EMPLOYEES) {
        try {
          const newValue = JSON.parse(e.newValue || '[]');
          setEmployees(newValue);
        } catch (error) {
          console.error('Error parsing employees from storage:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [setSelectedEmployees, setSelectedTasks, setTodoTasks, setEmployees]);

  // Обробники вибору співробітників і завдань
  const handleEmployeeSelect = (employee) => {
    setSelectedEmployees(prev => 
      prev.some(e => e.id === employee.id) 
        ? prev.filter(e => e.id !== employee.id) 
        : [...prev, employee]
    );
  };

  const handleTaskSelect = (task) => {
    setSelectedTasks(prev => 
      prev.some(t => t.id === task.id) 
        ? prev.filter(t => t.id !== task.id) 
        : [...prev, task]
    );
  };

  // Обробник призначення завдань
  const handleAssignTasks = () => {
    if (selectedEmployees.length === 0 || selectedTasks.length === 0 || !assignmentName.trim()) return;
    
    // Формуємо список задач та співробітників
    const tasksList = selectedTasks.map(t => t.title).join(', ');
    const employeesList = selectedEmployees.map(e => e.name).join(', ');
    
    // Створюємо нову задачу
    const newTask = {
      id: Date.now(),
      name: `${assignmentName} - ${tasksList}; Надано: ${employeesList}`,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    // Додаємо нову задачу до списку
    const updatedTasks = [...todoTasks, newTask];
    setTodoTasks(updatedTasks);
    
    // Показуємо сповіщення
    setAssignmentDetails({
      name: assignmentName,
      employees: employeesList,
      tasks: tasksList,
      timestamp: new Date().toLocaleString()
    });
    setShowSuccess(true);
    
    // Очищаємо вибір
    setSelectedEmployees([]);
    setSelectedTasks([]);
    setAssignmentName('');
    
    // Автоматично ховаємо сповіщення через 5 секунд
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="App container">
      {/* Сповіщення у верхньому правому куті */}
      <ToastContainer 
        position="top-end" 
        className="p-3 position-fixed"
        style={{ zIndex: 1000, top: '20px', right: '20px' }}
      >
        <Toast 
          show={showSuccess} 
          onClose={() => setShowSuccess(false)}
          bg="success"
          autohide
          delay={5000}
        >
          <Toast.Header closeButton>
            <strong className="me-auto">Завдання успішно надано!</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {assignmentDetails && (
              <div>
                <p><strong>Назва призначення:</strong> {assignmentDetails.name}</p>
                <p><strong>Завдання:</strong> {assignmentDetails.tasks}</p>
                <p><strong>Співробітники:</strong> {assignmentDetails.employees}</p>
                <p><small>{assignmentDetails.timestamp}</small></p>
              </div>
            )}
          </Toast.Body>
        </Toast>
      </ToastContainer>
      
      <h1 className="my-4 text-center">Система управління персоналом</h1>
      
      {/* Кнопки управління персоналом */}
      <div className="d-flex justify-content-end gap-2 mb-4">
        <Button variant="success" onClick={() => setShowHireForm(true)}>
          <i className="bi bi-person-plus me-2"></i>
          Найняти співробітника
        </Button>
      </div>
      
      {/* Форма найму */}
      <HireEmployeeForm 
        show={showHireForm} 
        onClose={() => setShowHireForm(false)} 
        onSubmit={hireEmployee} 
      />
      
      {/* Модальне вікно звільнення */}
      <FireEmployeeModal 
        show={showFireModal} 
        employee={employeeToFire} 
        onClose={() => setShowFireModal(false)} 
        onConfirm={fireEmployee} 
      />
      
      {/* Панель для призначення завдань */}
      {selectedEmployees.length > 0 && selectedTasks.length > 0 && (
        <div className="card mb-4 p-3">
          <div className="mb-3">
            <label htmlFor="assignmentName" className="form-label">
              Назва призначення:
            </label>
            <input
              type="text"
              className="form-control"
              id="assignmentName"
              value={assignmentName}
              onChange={(e) => setAssignmentName(e.target.value)}
              placeholder="Введіть назву призначення"
            />
          </div>
          <div className="text-center">
            <button 
              className="btn btn-success btn-lg"
              onClick={handleAssignTasks}
              disabled={!assignmentName.trim()}
            >
              <i className="bi bi-check-circle me-2"></i>
              Надати завдання
            </button>
          </div>
        </div>
      )}
      
      {/* Панель вибраних елементів */}
      <SelectedItemsPanel 
        employees={selectedEmployees} 
        tasks={selectedTasks} 
      />
      
      {/* Секція внутрішніх задач */}
      <TodoSection 
        tasks={todoTasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
      />
      
      {/* Секція співробітників */}
      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Співробітники</h2>
          <Badge bg="secondary" pill>
            {employees.length} осіб
          </Badge>
        </div>
        <div className="row">
          {employees.map(employee => (
            <EmployeeCard 
              key={employee.id}
              employee={employee}
              onSelect={() => handleEmployeeSelect(employee)}
              onFire={() => openFireModal(employee)}
              isSelected={selectedEmployees.some(e => e.id === employee.id)}
            />
          ))}
        </div>
      </section>

      {/* Секція завдань */}
      <section>
        <h2>Завдання</h2>
        <div className="row">
          {tasks.map(task => (
            <TaskCard 
              key={task.id}
              task={task}
              onSelect={() => handleTaskSelect(task)}
              isSelected={selectedTasks.some(t => t.id === task.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;