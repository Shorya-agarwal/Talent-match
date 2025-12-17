function TransactionList({ transactions }) {
    // Helper to color-code categories (Intuit style visual cue)
    const getCategoryColor = (category) => {
      const colors = {
        Food: 'bg-green-100 text-green-800',
        Transportation: 'bg-blue-100 text-blue-800',
        Entertainment: 'bg-purple-100 text-purple-800',
        Housing: 'bg-orange-100 text-orange-800',
        Miscellaneous: 'bg-gray-100 text-gray-800',
      };
      return colors[category] || 'bg-gray-100 text-gray-800';
    };
  
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-700">Recent Transactions</h3>
          <span className="text-sm text-gray-500">{transactions.length} records found</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Category (AI)</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">{t.description}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(t.category)}`}>
                      {t.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-mono">
                    ${t.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {new Date().toLocaleDateString()} {/* Simplified for now */}
                  </td>
                </tr>
              ))}
              
              {transactions.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-500 italic">
                    No transactions yet. Add one to see AI in action!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
  export default TransactionList;