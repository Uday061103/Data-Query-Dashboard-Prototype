import { useDispatch, useSelector } from 'react-redux';

const VisualizationToggle = () => {
  const dispatch = useDispatch();
  const { visualizationType } = useSelector((state) => state.query);

  const visualizations = [
    { type: 'bar', icon: '📊', label: 'Bar' },
    { type: 'line', icon: '📈', label: 'Line' },
    { type: 'pie', icon: '🥧', label: 'Pie' },
    { type: 'table', icon: '📋', label: 'Table' }
  ];

  return (
    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
      {visualizations.map(({ type, icon, label }) => (
        <button
          key={type}
          onClick={() => dispatch({ type: 'query/setVisualizationType', payload: type })}
          className={`px-3 py-1.5 rounded ${
            visualizationType === type
              ? 'bg-white shadow-sm text-primary'
              : 'text-gray-600 hover:bg-gray-200'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <span>{icon}</span>
            <span className="text-sm font-medium">{label}</span>
          </span>
        </button>
      ))}
    </div>
  );
};

export default VisualizationToggle;