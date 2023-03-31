import React, { useState } from 'react';
import Banner from '../components/Banner';
import Button from '../components/Button';
import StartButton from '../components/StartButton';

const FirstScreen: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [selectedButtons, setSelectedButtons] = useState([false, false, false, false]);

  const handleClick = (index: number) => {
    const newSelectedButtons = [...selectedButtons];
    newSelectedButtons[index] = !newSelectedButtons[index];
    setSelectedButtons(newSelectedButtons);
  };

  const handleStart = () => {
    onNext();
  };

  return (
    <>
      <Banner title="ChatMBTI by ChatGPT" />
      <div style={{ textAlign: 'center' }}>
        <Button label="I" active={selectedButtons[0]} onClick={() => handleClick(0)} />
        <Button label="S" active={selectedButtons[1]} onClick={() => handleClick(1)} />
        <Button label="T" active={selectedButtons[2]} onClick={() => handleClick(2)} />
        <Button label="J" active={selectedButtons[3]} onClick={() => handleClick(3)} />
      </div>
      <StartButton onClick={handleStart} />
    </>
  );
};

export default FirstScreen;
