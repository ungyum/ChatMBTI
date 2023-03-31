import React, { useState } from 'react';
import Banner from '../components/Banner';

const SecondScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [chatInput, setChatInput] = useState('');

  const handleChatInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(event.target.value);
  };

  return (
    <>
      <Banner title="ChatMBTI by ChatGPT" />
      <div style={{ textAlign: 'center' }}>
        <div style={{ margin: '50px' }}>여기에 채팅을 입력하세요:</div>
        <input type="text" value={chatInput} onChange={handleChatInputChange} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <button onClick={onBack}>&larr; 돌아가기</button>
      </div>
    </>
  );
};

export default SecondScreen;
