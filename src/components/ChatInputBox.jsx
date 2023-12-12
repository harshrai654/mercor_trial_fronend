const ChatInputBox = ({ sendANewMessage, loading }) => {
  const doSendMessage = (event) => {
    event.preventDefault();
    const newMessage = event.target[0].value;
    if (newMessage && newMessage.length > 0 && !loading) {
      const newMessagePayload = {
        role: "user",
        text: newMessage,
      };
      sendANewMessage(newMessagePayload);
      event.target[0].value = "";
    }
  };

  return (
    <form onSubmit={doSendMessage}>
      <div className="px-6 py-3 bg-white w-100 overflow-hidden rounded-bl-xl rounded-br-xla">
        <div className="flex flex-row items-center space-x-5">
          <div className="relative w-full">
            <input
              type="text"
              className="w-full h-12 block p-1.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              id="message-box"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-3 py-2 text-xs font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatInputBox;
