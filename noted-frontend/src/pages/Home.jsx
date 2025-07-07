import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gray-50 text-gray-800 p-6">
      {/* Top bar */}
      <div className="w-full flex justify-end">
        <Link to="/login">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Login
          </button>
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-grow flex flex-col items-center justify-center text-center space-y-4">
        <h1 className="text-5xl font-bold text-gray-900">Noted</h1>
        <p className="text-lg text-gray-600 max-w-xl">
          A clean and minimal note-taking web app — manage your thoughts, plans,
          and ideas anytime.
        </p>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500">
        <p>Created by Kartik Vyas</p>
        <p className="mt-1">✉️ vyas.kartik1000@gmail.com</p>
        <div className="flex justify-center gap-4 mt-2">
          <a
            href="https://github.com/KayVee03"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800 underline"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/kartik-vyas-777003294/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800 underline"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}
