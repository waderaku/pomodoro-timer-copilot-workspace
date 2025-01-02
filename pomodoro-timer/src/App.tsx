import { TaskManager } from './TaskManager';
import { TaskTreeView } from './TaskTreeView';
import { PomodoroTimer } from './PomodoroTimer';
import { SupabaseProvider } from './SupabaseContext';

function App() {
  return (
    <SupabaseProvider>
      <div>
        <TaskManager />
        <TaskTreeView />
        <PomodoroTimer />
      </div>
    </SupabaseProvider>
  );
}

export default App;
