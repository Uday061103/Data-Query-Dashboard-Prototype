import { useState } from 'react';
import QueryInput from './QueryInput';
import QuerySuggestions from './QuerySuggestions';
import ResultsDisplay from './ResultsDisplay';
import QueryHistory from './QueryHistory';
import LoadingSpinner from './LoadingSpinner';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { isLoading } = useSelector((state) => state.query);
  const [activeTab, setActiveTab] = useState('results');

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="col-span-12 lg:col-span-8">
          <div className="dashboard-section">
            <h1 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Ask questions about your data using natural language</p>
            
            <div className="space-y-4">
              <QueryInput />
              <QuerySuggestions />
            </div>
          </div>

          <div className="mt-6">
            {isLoading ? (
              <div className="dashboard-section flex items-center justify-center min-h-[400px]">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="dashboard-section">
                <ResultsDisplay />
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="dashboard-section">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Quick Stats</h2>
              <button className="text-sm text-primary hover:text-secondary">View All</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <StatCard title="Total Queries" value="1,234" trend="+12.3%" />
              <StatCard title="Accuracy" value="98.2%" trend="+2.1%" />
            </div>
          </div>

          <div className="dashboard-section">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Queries</h2>
              <button className="text-sm text-primary hover:text-secondary">View History</button>
            </div>
            <QueryHistory compact />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend }) => {
  const isPositive = trend.startsWith('+');
  
  return (
    <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
      <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
      <div className="flex items-end gap-2">
        <span className="text-xl font-semibold text-gray-900">{value}</span>
        <span className={`text-sm ${isPositive ? 'text-success' : 'text-error'}`}>
          {trend}
        </span>
      </div>
    </div>
  );
};

export default Dashboard;

