import { useState } from 'react';
import './App.scss';
import ChatInput, {Recruiter} from './components/ChatInput';

function App() {
  const [message, setMessage] = useState<string>('');
  const sendMessage = (message: string) => {
    setMessage(message)
  }

  const chatAssignedTo: Recruiter = {
    name: 'Juliana Roberts',
    picture: 'hola'
    // picture: 'https://picsum.photos/50'
  }

  return (
    <>
      Received msg is:
      <pre>
        {message}
      </pre>
      <div className="input-wrapper">
        <ChatInput onSend={sendMessage} chatAssignedTo={chatAssignedTo} />
      </div>
    </>
  );
}

export default App;
