import React from 'react'
import { ImageWithFallback } from '../figma/ImageWithFallback'

/**
 * Example page demonstrating ImageWithFallback component usage
 * 
 * This shows all the different ways to use the component:
 * 1. Static image URL
 * 2. Dynamic faculty image from database
 * 3. Dynamic student image from database
 * 4. Fallback behavior when image not found
 * 5. Loading states
 */

export function ImageTestPage() {
  // Example faculty IDs (replace with real IDs from your database)
  const facultyIds = ['FAC001', 'FAC002', 'FAC003']
  const studentIds = ['STU001', 'STU002', 'STU003']
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          🖼️ ImageWithFallback Component Demo
        </h1>
        
        {/* Section 1: Static Image */}
        <section className="bg-white rounded-xl shadow-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-700 border-b-2 border-purple-200 pb-2">
            1️⃣ Static Image URL
          </h2>
          <p className="text-gray-600 mb-4">
            Traditional usage with a static image URL (backward compatible)
          </p>
          <div className="flex items-center gap-4">
            <ImageWithFallback 
              src="https://via.placeholder.com/150"
              alt="Static Image"
              className="w-32 h-32 rounded-lg border-4 border-purple-300 shadow-lg"
            />
            <div className="flex-1">
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`<ImageWithFallback 
  src="https://via.placeholder.com/150"
  alt="Static Image"
  className="w-32 h-32 rounded-lg"
/>`}
              </pre>
            </div>
          </div>
        </section>
        
        {/* Section 2: Dynamic Faculty Image */}
        <section className="bg-white rounded-xl shadow-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-700 border-b-2 border-purple-200 pb-2">
            2️⃣ Dynamic Faculty Image (Database)
          </h2>
          <p className="text-gray-600 mb-4">
            Fetches faculty profile image from database using facultyId prop
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {facultyIds.map((id) => (
              <div key={id} className="text-center">
                <ImageWithFallback 
                  facultyId={id}
                  alt={`Faculty ${id}`}
                  className="w-32 h-32 rounded-full mx-auto border-4 border-blue-400 shadow-lg object-cover"
                  showLoader={true}
                />
                <p className="mt-3 font-semibold text-gray-700">{id}</p>
                <p className="text-sm text-gray-500">Faculty Member</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`<ImageWithFallback 
  facultyId="FAC001"
  alt="Faculty Profile"
  className="w-32 h-32 rounded-full"
  showLoader={true}
/>`}
            </pre>
          </div>
        </section>
        
        {/* Section 3: Dynamic Student Image */}
        <section className="bg-white rounded-xl shadow-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-700 border-b-2 border-purple-200 pb-2">
            3️⃣ Dynamic Student Image (Database)
          </h2>
          <p className="text-gray-600 mb-4">
            Fetches student profile image from database using studentId prop
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studentIds.map((id) => (
              <div key={id} className="text-center">
                <ImageWithFallback 
                  studentId={id}
                  alt={`Student ${id}`}
                  className="w-32 h-32 rounded-full mx-auto border-4 border-green-400 shadow-lg object-cover"
                  showLoader={true}
                />
                <p className="mt-3 font-semibold text-gray-700">{id}</p>
                <p className="text-sm text-gray-500">Student</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`<ImageWithFallback 
  studentId="STU001"
  alt="Student Profile"
  className="w-32 h-32 rounded-full"
  showLoader={true}
/>`}
            </pre>
          </div>
        </section>
        
        {/* Section 4: Fallback Behavior */}
        <section className="bg-white rounded-xl shadow-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-700 border-b-2 border-purple-200 pb-2">
            4️⃣ Fallback Behavior
          </h2>
          <p className="text-gray-600 mb-4">
            Shows fallback SVG when image not found or invalid ID
          </p>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <ImageWithFallback 
                facultyId="INVALID_ID"
                alt="Invalid Faculty"
                className="w-32 h-32 rounded-full border-4 border-red-400 shadow-lg"
                showLoader={true}
              />
              <p className="mt-3 text-sm text-gray-500">Invalid Faculty ID</p>
            </div>
            <div className="text-center">
              <ImageWithFallback 
                src="https://invalid-url.com/broken.jpg"
                alt="Broken URL"
                className="w-32 h-32 rounded-full border-4 border-red-400 shadow-lg"
              />
              <p className="mt-3 text-sm text-gray-500">Broken Image URL</p>
            </div>
            <div className="flex-1">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <p className="text-yellow-800 font-semibold mb-2">ℹ️ Fallback SVG</p>
                <p className="text-sm text-yellow-700">
                  When an image fails to load or doesn't exist in the database,
                  the component automatically displays a fallback SVG placeholder
                  instead of a broken image icon.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section 5: Real-World Example */}
        <section className="bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-700 border-b-2 border-purple-200 pb-2">
            5️⃣ Real-World Example: Faculty Card
          </h2>
          <p className="text-gray-600 mb-4">
            Example of how to use in a faculty profile card component
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <ImageWithFallback 
                  facultyId="FAC001"
                  alt="Dr. John Smith"
                  className="w-20 h-20 rounded-full border-4 border-purple-400 shadow-md object-cover"
                  showLoader={true}
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Dr. John Smith</h3>
                  <p className="text-sm text-gray-500">Professor, CSE Department</p>
                  <p className="text-xs text-gray-400">FAC001</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">
                  📧 <span className="font-medium">john.smith@university.edu</span>
                </p>
                <p className="text-gray-600">
                  📞 <span className="font-medium">+1 234 567 8900</span>
                </p>
                <p className="text-gray-600">
                  🎓 <span className="font-medium">PhD in Computer Science</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <pre className="bg-gray-100 p-4 rounded-lg text-xs overflow-x-auto w-full">
{`function FacultyCard({ facultyId }) {
  return (
    <div className="faculty-card">
      <ImageWithFallback 
        facultyId={facultyId}
        alt="Faculty Profile"
        className="profile-image"
        showLoader={true}
      />
      {/* Faculty details */}
    </div>
  );
}`}
              </pre>
            </div>
          </div>
        </section>
        
        {/* API Information */}
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-2xl p-8 mt-8 text-white">
          <h2 className="text-2xl font-semibold mb-4 border-b-2 border-white/30 pb-2">
            🔌 API Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-yellow-200">Faculty Image Endpoint</h3>
              <code className="text-sm bg-black/20 px-3 py-1 rounded block">
                GET /api/figma/imagewithfallback.php?type=faculty&id=FAC001
              </code>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-yellow-200">Student Image Endpoint</h3>
              <code className="text-sm bg-black/20 px-3 py-1 rounded block">
                GET /api/figma/imagewithfallback.php?type=student&id=STU001
              </code>
            </div>
          </div>
          <div className="mt-6 bg-white/10 rounded-lg p-4">
            <p className="text-sm">
              💡 <strong>Tip:</strong> Use the <code className="bg-black/20 px-2 py-1 rounded">showLoader</code> prop
              to display an animated spinner while the image is being fetched from the server.
            </p>
          </div>
        </section>
        
        {/* Testing Tools */}
        <section className="bg-white rounded-xl shadow-2xl p-8 mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-700 border-b-2 border-purple-200 pb-2">
            🧪 Testing Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">HTML API Tester</h3>
              <p className="text-gray-600 text-sm mb-3">
                Interactive browser tool to test all API endpoints
              </p>
              <button 
                onClick={() => window.open('/image-api-tester.html', '_blank')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Open API Tester
              </button>
            </div>
            <div className="border-2 border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Documentation</h3>
              <p className="text-gray-600 text-sm mb-3">
                Complete integration guide with examples
              </p>
              <a 
                href="/IMAGE_WITH_FALLBACK_INTEGRATION.md"
                target="_blank"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-center"
              >
                View Documentation
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ImageTestPage
