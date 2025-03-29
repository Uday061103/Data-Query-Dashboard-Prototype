import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentQuery, processQuery } from '../store/slices/querySlice';
import LoadingSpinner from './LoadingSpinner';

const QueryInput = () => {
  const dispatch = useDispatch();
  const { currentQuery, isLoading } = useSelector((state) => state.query);
  const [typingTimer, setTypingTimer] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const handleInputChange = (value) => {
    dispatch(setCurrentQuery(value));
    setIsTyping(true);
    
    if (typingTimer) clearTimeout(typingTimer);
    
    const newTimer = setTimeout(() => {
      setIsTyping(false);
    }, 300);
    
    setTypingTimer(newTimer);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentQuery.trim()) {
      dispatch(processQuery(currentQuery));
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={currentQuery}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Ask a question about your data..."
          className="input-primary pl-12"
          disabled={isLoading}
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <SearchIcon className="w-5 h-5 text-gray-400" />
        </div>
        <button
          type="submit"
          disabled={isLoading || !currentQuery.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary py-1.5"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner size="sm" />
              Processing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <SendIcon className="w-4 h-4" />
              Ask
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

const SearchIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const SendIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export default QueryInput;

