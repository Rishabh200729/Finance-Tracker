const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white">
            <div className="p-4">
                <h1 className="text-2xl font-bold">Smart Finance Tracker</h1>
            </div>
            <div className="p-4">
                <ul>
                    <li className="p-2 hover:bg-gray-700">Dashboard</li>
                    <li className="p-2 hover:bg-gray-700">Transactions</li>
                    <li className="p-2 hover:bg-gray-700">Categories</li>
                    <li className="p-2 hover:bg-gray-700">Goals</li>
                </ul>
            </div>
        </div>
    )
}
export default Sidebar;