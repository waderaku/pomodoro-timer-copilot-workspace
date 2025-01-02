import { useState, useEffect } from 'react';
import { useSupabase } from './SupabaseContext';
import TreeView from 'react-treeview';

const TaskTreeView = () => {
  const supabase = useSupabase();
  const [tasks, setTasks] = useState([]);
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*');

      if (error) {
        console.error('Error fetching tasks:', error);
      } else {
        setTasks(data);
        buildTreeData(data);
      }
    };

    fetchTasks();
  }, [supabase]);

  const buildTreeData = (tasks) => {
    const taskMap = {};
    tasks.forEach(task => {
      taskMap[task.id] = { ...task, children: [] };
    });

    const tree = [];
    tasks.forEach(task => {
      if (task.parent_id === null) {
        tree.push(taskMap[task.id]);
      } else {
        taskMap[task.parent_id].children.push(taskMap[task.id]);
      }
    });

    setTreeData(tree);
  };

  const renderTreeNodes = (nodes) => {
    return nodes.map(node => (
      <TreeView
        key={node.id}
        nodeLabel={node.title}
        defaultCollapsed={true}
      >
        {node.children.length > 0 && renderTreeNodes(node.children)}
      </TreeView>
    ));
  };

  return (
    <div>
      {renderTreeNodes(treeData)}
    </div>
  );
};

export default TaskTreeView;
