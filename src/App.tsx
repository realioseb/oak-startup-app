import { useCallback, useContext } from 'react';
import { Card } from './components/Card';
import { Header } from './components/Header';
import { Modal } from './components/Modal';
import { Phase } from './components/Phase';
import { PhaseNew } from './components/PhaseNew';
import { AppContext } from './context/app-context';

function App() {
  const {
    phases,
    handlePhaseInsert,
    removePhase,
    setRemovePhase,
    handlePhaseDelete,
  } = useContext(AppContext);

  const handleSubmit = useCallback(() => {
    if (removePhase) {
      handlePhaseDelete(removePhase.id);
      setRemovePhase(null);
    }
  }, [removePhase, handlePhaseDelete, setRemovePhase]);

  return (
    <div className="App">
      {!!removePhase && (
        <Modal
          handleSubmit={handleSubmit}
          handleCancel={() => setRemovePhase(null)}
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
