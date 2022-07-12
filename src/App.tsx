import { useCallback, useContext } from 'react';
import { Card } from './components/Card';
import { Header } from './components/Header';
import { Modal } from './components/Modal';
import { Phase } from './components/Phase';
import { PhaseNew } from './components/PhaseNew';
import { PhaseContext } from './context/phase-context';
import { TaskContext } from './context/task-context';

function App() {
  const {
    phases,
    handlePhaseInsert,
    removePhase,
    setRemovePhase,
    handlePhaseRemove,
  } = useContext(PhaseContext);

  const { setTasks, removeTask, setRemoveTask, handleTaskRemove } =
    useContext(TaskContext);

  const handlePhaseSubmit = useCallback(() => {
    if (removePhase) {
      handlePhaseRemove(removePhase.id);
      setTasks((tasks) =>
        tasks.filter((task) => task.phaseId !== removePhase.id),
      );
      setRemovePhase(null);
    }
  }, [removePhase, handlePhaseRemove, setRemovePhase, setTasks]);

  const handleTaskSubmit = useCallback(() => {
    if (removeTask) {
      handleTaskRemove(removeTask.id);
      setRemoveTask(null);
    }
  }, [removeTask, handleTaskRemove, setRemoveTask]);

  return (
    <div className="App">
      {!!removePhase && (
        <Modal
          message="Are you sure to delete the phase?"
          subMessage="All phase tasks will be removed too"
          handleSubmit={handlePhaseSubmit}
          handleCancel={() => setRemovePhase(null)}
        />
      )}

      {!!removeTask && (
        <Modal
          message="Are you sure to delete the task?"
          subMessage=""
          handleSubmit={handleTaskSubmit}
          handleCancel={() => setRemoveTask(null)}
        />
      )}

      <Card>
        <Header />

        {phases.map((phase, index) => (
          <Phase key={phase.id} order={index + 1} phase={phase} />
        ))}

        <PhaseNew onSubmit={handlePhaseInsert} />
      </Card>
    </div>
  );
}

export default App;
