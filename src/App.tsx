import './App.css';
import ChatInput from './components/ChatInput';

function App() {
  const sendMessage = (message: string) => {
    console.log('calling send message', message);
  }

  return (
    <ChatInput onEnter={sendMessage}/>
  );
}

export default App;
