import { useState } from 'react';
import axios from 'axios';

function TransactionForm({ onTransactionAdded }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    setLoading(true);
    try {
      // 1. Send data to your FastAPI backend
      const response = await axios.post('http://127.0.0.1:8000/transactions/', {
        description: description,
        amount: parseFloat(amount),
        user_id: 1 // Hardcoded for MVP
      });

      // 2. Notify the parent component to refresh the list
      onTransactionAdded(response.data);
      
      // 3. Clear form
      setDescription('');
      setAmount('');
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Failed to add transaction. Check backend console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Add New Expense</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Description</label>
          <input
            type="text"
            placeholder="e.g. Uber to Airport, Starbucks"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Amount ($)</label>
          <input
            type="number"
            placeholder="0.00"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Submit Button with Loading State */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg text-white font-medium transition duration-200 
            ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              AI is Categorizing...
            </span>
          ) : (
            'Add Transaction'
          )}
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;