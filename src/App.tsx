import { Card } from './components/Card';
import { Header } from './components/Header';
import { Phase } from './components/Phase';
import { PhaseNew } from './components/PhaseNew';

function App() {
  const phaseList = [
    {
      id: 1,
      name: 'phase #1',
      isComplete: true,
      tasks: [
        { id: 1, name: 'task 1/1', isComplete: true },
        { id: 2, name: 'task 2/1', isComplete: true },
        { id: 3, name: 'task 3/1', isComplete: true },
      ],
    },
    {
      id: 2,
      name: 'phase #2',
      isComplete: false,
      tasks: [
        { id: 4, name: 'task 1/2', isComplete: true },
        { id: 5, name: 'task 2/2', isComplete: false },
        { id: 6, name: 'task 3/3', isComplete: false },
      ],
    },
  ];
  return (
    <div className="App">
      <Card>
        <Header />

        {phaseList.map((phase, index) => (
          <Phase key={phase.id} order={index + 1} phase={phase} />
        ))}

        <PhaseNew />
      </Card>
    </div>
  );
}

export default App;
