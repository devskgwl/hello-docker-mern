import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // const handleProceed = async (e) => {
  //   e.preventDefault();
  //   if (!name.trim()) return alert("Please enter your name! ✍️");
    
  //   setLoading(true);
  //   try {
  //     // HTTP POST request to the local Express backend engine running on port 5000
  //     const res = await fetch('http://localhost:5000/api/greet', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ name })
  //     });
  //     const data = await res.json();
  //     setResponse(data);
  //   } catch (error) {
  //     console.error("Backend connection failed, triggering local fallback simulation:", error);
  //     // Fallback object to ensure UI render stability during offline development
  //     setResponse({
  //       greeting: `Welcome, ${name}! 👋`,
  //       serverTime: new Date().toLocaleTimeString(),
  //       ip: "127.0.0.1 (Local Dev Mode)",
  //       location: "Bhopal, MP 📍"
  //     });
  //   } finally {
  //     setLoading(false);
  //   }

  const handleProceed = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Please enter your name! ✍️");
    
    setLoading(true);
    try {
      // HTTP POST request to the local Express backend engine running on port 5000
      const res = await fetch('http://localhost:5000/api/greet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      const data = await res.json();
      setResponse(data);
      setName(''); // ✨ MAGIC LINE: Clears the input field after a successful state commit
    } catch (error) {
      console.error("Backend connection failed, triggering local fallback simulation:", error);
      // Fallback object to ensure UI render stability during offline development
      setResponse({
        greeting: `Welcome, ${name}! 👋`,
        serverTime: new Date().toLocaleTimeString(),
        ip: "127.0.0.1 (Local Dev Mode)",
        location: "Bhopal, MP 📍"
      });
      setName(''); // ✨ MAGIC LINE ALSO HERE: Clears the input field even in fallback mode
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 selection:bg-cyan-500 selection:text-slate-900">
      <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl shadow-cyan-500/5">
        
        {/* Component Header Block */}
        <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Project Hello-Docker 🐳
        </h1>
        <p className="text-slate-400 text-sm text-center mb-6">MERN Stack Deployment Framework</p>

        {/* User Engagement Input Form */}
        <form onSubmit={handleProceed} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">Enter Your Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. DevSk 😎" 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-transform disabled:opacity-50"
          >
            {loading ? "Processing... ⏳" : "Proceed to Cloud 🚀"}
          </button>
        </form>

        {/* Conditional Rendering: Server Response Display */}
        {response && (
          <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-4 animate-fade-in">
            <div className="p-4 bg-slate-950/80 border border-emerald-500/20 rounded-xl">
              <p className="text-emerald-400 font-medium text-lg">{response.greeting}</p>
              <p className="text-xs text-slate-500 mt-1">🕒 Server Time: {response.serverTime}</p>
            </div>

            {/* Injected Client Metadata Display */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block mb-1">TARGET IP</span>
                <span className="font-mono text-cyan-400">{response.ip}</span>
              </div>
              <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block mb-1">LOCATION BOUNDARY</span>
                <span className="text-blue-400 font-medium">{response.location}</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;