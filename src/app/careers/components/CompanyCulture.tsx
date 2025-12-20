"use client";

export function CompanyCulture() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Inside Pocket Fund
          </h2>
          <p className="text-xl text-gray-600">
            A journey through how we work
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Image - Takes 2 columns */}
          <div className="lg:col-span-2 relative h-[500px] rounded-lg overflow-hidden bg-white border-2 border-gray-200 shadow-sm">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-gray-400 text-center p-8">
                <p className="text-lg mb-2">Team Working Image</p>
                <p className="text-sm">Add your team collaboration image here</p>
              </div>
            </div>
          </div>

          {/* Side Content */}
          <div className="space-y-6">
            {/* Icon Box */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 h-48 flex items-center justify-center shadow-sm">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">PF</span>
              </div>
            </div>

            {/* Stats Box */}
            <div className="bg-blue-600 rounded-lg p-8 h-48 flex flex-col justify-center shadow-sm">
              <div className="text-6xl font-bold text-white mb-2">+10</div>
              <div className="text-lg text-white">
                Talented employees and still counting.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

