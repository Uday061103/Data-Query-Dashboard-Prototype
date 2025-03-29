import { Provider } from 'react-redux';
import { store } from './store/store';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Dashboard />
      </div>
    </Provider>
  );
};

export default App;


