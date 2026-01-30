import { useState } from "react";
import upsertBudget from "../actions/addBudget";
import { useFinance } from "../context/FinanceContext";

const AddBudget = ({ onClose })=>{
    const [loading , setLoading] = useState(false);
    const { updateLocalBudgets } = useFinance();
    
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget as HTMLFormElement);  
        const res = await upsertBudget(formData);
        if(res.succcess){
          updateLocalBudgets(res.newBudget);
        }
        setLoading(false);
        onClose();
    }
    
    return (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold mb-6">
          Create Budget
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-500">Category</label>
            <select 
              name="category" 
              className="w-full p-3 bg-gray-50 border rounded-2xl outline-none"
            >
              <option value="Food">Food</option>
              <option value="Shopping">Shopping</option>
              <option value="Rent">Rent</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-500">Monthly Limit</label>
            <input 
              name="limit" 
              type="number" 
              placeholder="e.g. 5000"
              className="w-full p-3 bg-gray-50 border rounded-2xl outline-none"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button type="button" onClick={onClose} className="flex-1 py-3 text-gray-500 font-semibold">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="flex-1 py-3 bg-indigo-600 text-white rounded-2xl font-bold">
            {loading ? "Saving..." : "Save Budget"}
          </button>
        </div>
      </form>
    </div>);
}

export default AddBudget;