import { useState, useEffect } from 'react';
import { useSupabase } from './SupabaseContext';

const TaskManager = () => {
  const supabase = useSupabase();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [parentId, setParentId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*');

      if (error) {
        console.error('Error fetching tasks:', error);
      } else {
        setTasks(data);
      }
    };

    fetchTasks();
  }, [supabase]);

  const handleAddTask = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title, description, parent_id: parentId }]);

    if (error) {
      console.error('Error adding task:', error);
    } else {
      setTasks([...tasks, ...data]);
      setTitle('');
      setDescription('');
      setParentId(null);
    }
  };

  const handleEditTask = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .update({ title, description, parent_id: parentId })
      .eq('id', editingTask.id);

    if (error) {
      console.error('Error editing task:', error);
    } else {
      setTasks(tasks.map(task => (task.id === editingTask.id ? data[0] : task)));
      setTitle('');
      setDescription('');
      setParentId(null);
      setEditingTask(null);
    }
  };

  const handleDeleteTask = async (id) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting task:', error);
    } else {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      handleEditTask();
    } else {
      handleAddTask();
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setParentId(task.parent_id);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
        >
          <option value={null}>No Parent</option>
          {tasks.map(task => (
            <option key={task.id} value={task.id}>
              {task.title}
            </option>
          ))}
        </select>
        <button type="submit">{editingTask ? 'Edit Task' : 'Add Task'}</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span>{task.title}</span>
            <button onClick={() => handleEditClick(task)}>Edit</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
