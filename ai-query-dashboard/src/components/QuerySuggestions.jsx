import { useSelector, useDispatch } from 'react-redux';
import { setCurrentQuery } from '../store/slices/querySlice';
const QuerySuggestions = () => {  const dispatch = useDispatch();
  const { suggestions } = useSelector((state) => state.query);
  const handleSuggestionClick = (suggestion) => {    dispatch(setCurrentQuery(suggestion));
  };
  return (    <div className="mt-2">
      {suggestions.length > 0 && (        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (            <button
              key={index}              onClick={() => handleSuggestionClick(suggestion)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm"            >
              {suggestion}            </button>
          ))}        </div>
      )}    </div>
  );};

export default QuerySuggestions;
















