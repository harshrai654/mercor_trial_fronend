import { useEffect, useRef } from "react";
import Avatar from "./Avatar";
import Typing from "./Typing";

function ChatContent({ thread, loading }) {
  const scrollableDivRef = useRef(null);

  function scrollToBottom() {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop =
        scrollableDivRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    scrollToBottom();
    console.log("thread updated");
  }, [thread]);

  return (
    <div className="h-96 px-6 py-1 overflow-auto" ref={scrollableDivRef}>
      {thread.map(({ text, role }, index) => {
        const isChatOwner = role === "user";
        return (
          <div
            key={index}
            className={`py-2 flex flex-row w-full ${
              isChatOwner ? "justify-end" : "justify-start"
            }`}
          >
            <div className={`${isChatOwner ? "order-2" : "order-1"}`}>
              <Avatar />
            </div>
            <div
              className={`px-2 w-fit py-3 flex flex-col bg-purple-500 rounded-lg text-white ${
                isChatOwner ? "order-1 mr-2" : "order-2 ml-2"
              }`}
            >
              <span className="text-md">{text}</span>
            </div>
          </div>
        );
      })}
      {!!loading && <Typing />}
    </div>
  );
}

export default ChatContent;
