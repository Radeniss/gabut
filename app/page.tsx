'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Sparkles } from 'lucide-react';

export default function Home() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && age.trim()) {
      localStorage.setItem('proposalName', name.trim());
      localStorage.setItem('proposalAge', age.trim());
      router.push('/proposal');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-pulse">
          <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4 animate-bounce" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
            Something Special
          </h1>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Tell me about yourself
            <Sparkles className="w-4 h-4" />
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200">
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                Nama Kamu ✨
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition-all duration-300 bg-white/50"
                placeholder="Masukkan nama cantikmu..."
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="age" className="block text-sm font-semibold text-gray-700">
                Umur Kamu 💫
              </label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition-all duration-300 bg-white/50"
                placeholder="Masukkan umurmu..."
                min="1"
                max="100"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-pink-600 hover:to-purple-700"
            >
              Kirim 💕
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Ada sesuatu yang special untukmu... 🎁
          </p>
        </div>
      </div>
    </div>
  );
}