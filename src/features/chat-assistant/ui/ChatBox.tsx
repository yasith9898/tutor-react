import { useState } from 'react';
import { askGroq } from '@/shared/api/langchain'; 

export const ChatBox = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      const result = await askGroq(input);
      setResponse(result.text);
    } catch (error) {
      console.error("Failed to fetch AI response:", error);
      setResponse("Error: Could not reach the AI.");
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  return (
    <div className="p-4 border rounded shadow-sm">
      <div className="mb-4 min-h-[100px] bg-gray-50 p-2">
        {isLoading ? <p>Thinking...</p> : <p>{response}</p>}
      </div>
      
      <div className="flex gap-2">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Groq anything..."
          className="flex-1 border p-2 rounded"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Send
        </button>
      </div>
    </div>
  );
};