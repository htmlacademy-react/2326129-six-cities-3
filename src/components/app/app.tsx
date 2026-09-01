import { MainScreen } from '../../pages/main-page/main-page';

function App(): JSX.Element {
  const offersCount = 5;
  return (
    <MainScreen offersCount={offersCount} />
  );
}

export default App ;
