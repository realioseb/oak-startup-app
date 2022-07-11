import { useCallback } from 'react';
import { api } from './api';
import { Card } from './components/Card';
import { Header } from './components/Header';
import { Phase } from './components/Phase';
import { PhaseNew } from './components/PhaseNew';
import { usePhaseInsert } from './hooks/use-phase-insert';
import { usePhases } from './hooks/use-phases';

function App() {
  const { phases, setPhases, isLoading, error } = usePhases();
  const { name, onChange, onKeyDown, disabled } = usePhaseInsert(setPhases);

  return (
    <div className="App">
      <Card>
        <Header />

        {phases.map((phase, index) => (
          <Phase key={phase.id} order={index + 1} phase={phase} />
        ))}

        <PhaseNew
          value={name}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={disabled}
        />
      </Card>
    </div>
  );
}

export default App;
