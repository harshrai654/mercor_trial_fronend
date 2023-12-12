import { useState } from "react";
import ChatContent from "./components/ChatContent";
import ChatInputBox from "./components/ChatInputBox";
import axios from "axios";

function App() {
  const [thread, setThreads] = useState([]);

  const [waitingResponse, setWaitingResponse] = useState(false);

  async function sendANewMessage(newMessage) {
    setThreads((thread) => [...thread, newMessage]);
    setWaitingResponse(true);
    try {
      const response = await axios.post("/api/query", {
        query: newMessage,
      });
      setWaitingResponse(false);
      setThreads((thread) => [...thread, response.data]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-screen h-screen bg-blue-50">
      <div className="bg-white border border-gray-200 rounded-lg shadow relative">
        <ChatContent thread={thread} loading={waitingResponse} />
        <ChatInputBox
          sendANewMessage={sendANewMessage}
          loading={waitingResponse}
          setLoading={setWaitingResponse}
        />
      </div>
    </div>
  );
}

export default App;
