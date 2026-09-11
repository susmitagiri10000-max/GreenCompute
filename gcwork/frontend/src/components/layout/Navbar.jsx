function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        <h1 className="text-xl font-bold text-green-600">
          GreenCompute
        </h1>

        <div className="flex gap-6">
          <a href="/dashboard" className="text-gray-700 hover:text-green-600">
            Dashboard
          </a>

          <a href="/labs" className="text-gray-700 hover:text-green-600">
            Labs
          </a>

          <a href="/computers" className="text-gray-700 hover:text-green-600">
            Computers
          </a>

          <a href="/analytics" className="text-gray-700 hover:text-green-600">
            Analytics
          </a>

          <a href="/reports" className="text-gray-700 hover:text-green-600">
            Reports
          </a>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;