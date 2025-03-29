import { useSelector, useDispatch } from 'react-redux';
import { setCurrentQuery, processQuery } from '../store/slices/querySlice';

const QueryHistory = () => {
  const dispatch = useDispatch();
  const { queryHistory = [] } = useSelector((state) => state.query);

  const handleRerunQuery = (query) => {
    dispatch(setCurrentQuery(query));
    dispatch(processQuery(query));
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-4">
      <h2 className="text-xl font-semibold mb-4">Query History</h2>
      <div className="space-y-2">
        {queryHistory.map((item, index) => (
          <div key={index} className="border-b border-gray-200 pb-2">
            <div className="flex justify-between items-center">
              <p className="text-gray-800">{item.query}</p>
              <button
                onClick={() => handleRerunQuery(item.query)}
                className="text-blue-500 hover:text-blue-700"
              >
                Rerun
              </button>
            </div>
            <p className="text-sm text-gray-500">
              {new Date(item.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueryHistory;




