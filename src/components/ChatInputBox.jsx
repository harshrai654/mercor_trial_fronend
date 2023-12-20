const ChatInputBox = ({ sendANewMessage, loading, clearContext }) => {
  const doSendMessage = (event) => {
    event.preventDefault();
    const newMessage = event.target[1].value;
    if (newMessage && newMessage.length > 0 && !loading) {
      const newMessagePayload = {
        role: "user",
        text: newMessage,
      };
      sendANewMessage(newMessagePayload);
      event.target[1].value = "";
    }
  };

  return (
    <form onSubmit={doSendMessage}>
      <div className="px-6 py-3  bg-zinc-500 w-100 overflow-hidden rounded-bl-xl rounded-br-xl">
        <div className="flex flex-row items-center space-x-5">
          <button
            disabled={loading}
            onClick={clearContext}
            className="px-3 py-2 text-xs font-medium text-center text-white bg-orange-900 rounded-lg hover:bg-emerald-900 focus:ring-4 focus:outline-none focus:ring-purple-300 disabled:opacity-50"
          >
            Reset
          </button>
          <div className="relative w-full">
            <input
              type="text"
              className="w-full h-12 block p-1.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              id="message-box"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  document.getElementById("submitBtn").click();
                }
              }}
            />
          </div>
          <button
            type="submit"
            id="submitBtn"
            disabled={loading}
            className="px-3 py-2 text-xs font-medium text-center text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 focus:ring-4 focus:outline-none focus:ring-purple-300 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatInputBox;
