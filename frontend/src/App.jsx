import { useState, useEffect } from 'react';
import axios from 'axios';
import ApplicationForm from '../components/ApplicationForm';
import ApplicationList from '../components/ApplicationList';

function App() {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/applications/');
      setApplications(response.data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => { fetchApplications(); }, []);

  const handleAdd = (newApp) => {
    // Re-fetch to let backend sort by score
    fetchApplications();
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-3">
          <div className="bg-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold">TM</div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">TalentMatch <span className="text-slate-400 font-normal">AI Screener</span></h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ApplicationForm onAdd={handleAdd} />
        </div>
        <div className="lg:col-span-2">
           <ApplicationList applications={applications} />
        </div>
      </main>
    </div>
  );
}

export default App;