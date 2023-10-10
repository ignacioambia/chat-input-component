import { useState, KeyboardEvent, ChangeEvent } from 'react';
interface ChatInputProps {
  onEnter: (message: string) => void
}
function ChatInput({ onEnter }: ChatInputProps) {
  const [message, setMessage] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent the default behavior (form submission)
      onEnterPressed();
    }
  };

  const onEnterPressed = () => {
    if (onEnter) {
      onEnter(message);
    }
    // Clear the input field
    setMessage('');
  };

  return (
    <div>
       <textarea
        placeholder="Type your message..."
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

    </div>
  );
}

export default ChatInput;
