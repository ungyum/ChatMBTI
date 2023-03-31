import React, {useState} from "react";
import FirstScreen from './screens/FirstScreen';
import SecondScreen from './screens/SecondScreen';

function App() {
  const [page, setPage] = useState('first');

  const handleNext = () => {
    setPage('second');
  };

  const handleBack = () => {
    setPage('first');
  };

  return (
    <>
      {page === 'first' ? <FirstScreen onNext={handleNext} /> : <SecondScreen onBack={handleBack} />}
    </>
  );
}

export default App;
