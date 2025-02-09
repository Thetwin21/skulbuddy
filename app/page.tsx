import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            {/* <Image
              src=""
              alt="Logo"
              width={150}
              height={50}
              className="h-12 w-auto"
            /> */}
          </div>
          <div className="flex space-x-4">
            <Link href="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link href="/sign-up" className="text-gray-700 hover:text-blue-600">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="flex-grow bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to SkulBuddy
          </h1>
          <p className="text-xl text-white mb-8">
            Access course materials, connect with peers, and stay organized.
          </p>
          <Link
            href="/sign-up"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2025 SkulBuddy (a digital library system) <br /><em>built by ogodo nnamdi peter</em></p>
        </div>
      </footer>
    </div>
  );
}