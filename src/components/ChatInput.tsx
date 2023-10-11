import {
  useState,
  KeyboardEvent,
  useRef,
  useEffect,
  FunctionComponent,
} from "react";
import "./ChatInput.scss";
import PlaneIcon from "./PlaneIcon";
import Chip from "./Chip";
import AssignIcon from "./AssignIcon";
import Avatar from "./Avatar";

const maxRows = 10;
const minRows = 1;

export interface Recruiter {
  name: string;
  picture: string;
}

interface ChatInputProps {
  //Called when user want to send information
  onSend: (message: string) => void;
  //used to display inside chat who is responding this email
  chatAssignedTo: Recruiter;
}

/**
 * Input used to send message from recruiters to candidates
 */
const ChatInput: FunctionComponent<ChatInputProps> = ({
  onSend,
  chatAssignedTo,
}) => {
  const [message, setMessage] = useState<string>("");
  const [inputFilled, setInputFilled] = useState<boolean>(false);
  const textArea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setInputFilled(message.trim().length > 0);
  }, [message]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textareaLineHeight = 18;

    event.target.rows = minRows;

    //Calculating how many rows should the text area must have
    const currentRows = Math.ceil(
      event.target.scrollHeight / textareaLineHeight
    );

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    } else {
      event.target.rows = currentRows;
    }

    setMessage(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      //if cmd in mac or ctrl in windows is pressed together with the enter key.
      (event.metaKey || event.ctrlKey) &&
      event.key === "Enter" &&
      inputFilled
    ) {
      sendMessage(event.target as HTMLTextAreaElement);
    }
  };

  const focusTextArea = () => {
    textArea.current?.focus();
  };

  const sendMessage = (target: HTMLTextAreaElement) => {
    onSend(message);
    setMessage("");
    target.rows = minRows;
  };

  const [userName] = chatAssignedTo.name.split(" ");

  //display this if chat is already assigned
  const assignChatChip = (
    <Chip>
      <div className="assign-chat">
        <AssignIcon />
        Assign myself and reply
      </div>
    </Chip>
  );

  //display this if chat is not assigned yet.
  const chatAssignedChip = (
    <div className="chat-assigned">
      Repling as
      <Chip>
        <Avatar picture={chatAssignedTo.picture}>{userName[0]}</Avatar>
        <div className="avatar-chip">{userName}</div>
      </Chip>
    </div>
  );

  return (
    <div className="chat-input-wrapper" onClick={focusTextArea}>
      <div className="assignation-chips">
        {inputFilled ? chatAssignedChip : assignChatChip}
      </div>
      <div className="textarea-wrapper">
        <textarea
          ref={textArea}
          rows={minRows}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div
        onClick={() => sendMessage(textArea.current as HTMLTextAreaElement)}
        className={`action-btn ${!inputFilled && "disabled"}`}
      >
        <PlaneIcon />
      </div>
    </div>
  );
};

export default ChatInput;
