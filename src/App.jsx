import { useEffect, useState } from "react";
import ChatContent from "./components/ChatContent";
import ChatInputBox from "./components/ChatInputBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function App() {
  const [thread, setThreads] = useState([]);

  const [waitingResponse, setWaitingResponse] = useState(false);

  async function sendANewMessage(newMessage) {
    console.log("Hey");
    setThreads((thread) => [...thread, newMessage]);
    setWaitingResponse(true);
    try {
      const response = await axios.post(`/query`, {
        query: newMessage,
      });
      setThreads((thread) => [...thread, response.data]);
    } catch (error) {
      console.log(error);
      toast("Unable to send message to bot :(");
    } finally {
      setWaitingResponse(false);
    }
  }

  async function clearContext() {
    try {
      setWaitingResponse(true);
      const response = await axios.get(`/refreshOpenAI`);
      console.log(response.data);
      setThreads([]);
    } catch (error) {
      console.log(error);
      toast("Unable to connect to bot");
    } finally {
      setWaitingResponse(false);
    }
  }

  useEffect(() => {
    async function pingOpenAI() {
      try {
        setWaitingResponse(true);
        const response = await axios.get(`/checkOpenAI`);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        toast("Unable to connect to bot");
      } finally {
        setWaitingResponse(false);
      }
    }
    pingOpenAI();
  }, []);

  return (
    <div className="h-[34rem] mt-10  bg-zinc-300 rounded-tl-lg rounded-tr-lg">
      <ChatContent thread={thread} loading={waitingResponse} />
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="dark"
      />
      <ChatInputBox
        sendANewMessage={sendANewMessage}
        loading={waitingResponse}
        setLoading={setWaitingResponse}
        clearContext={clearContext}
      />
    </div>
  );
}

export default App;
