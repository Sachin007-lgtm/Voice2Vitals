import React, { useState } from 'react';
import { FileText, Mail, Lock, User, Eye, EyeOff, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    agree: false,
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  // Slide animation classes
  const leftPanelClass = `absolute top-0 left-0 h-full w-1/2 transition-transform duration-700 ease-in-out z-20 ${isLogin ? 'translate-x-0' : 'translate-x-full'}`;
  const rightPanelClass = `absolute top-0 left-1/2 h-full w-1/2 bg-white transition-transform duration-700 ease-in-out z-30 shadow-xl ${isLogin ? 'translate-x-0' : '-translate-x-full'}`;

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 overflow-hidden">
      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors z-50"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </button>
      {/* Container */}
      <div className="relative w-[900px] h-[600px] rounded-3xl shadow-2xl overflow-hidden flex">
        {/* Left Panel (Branding/Info) */}
        <div className={leftPanelClass + ' relative flex flex-col justify-center items-start px-16 text-white overflow-hidden'}>
          {/* Background image */}
          <img 
            src="https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&w=800&q=80" 
            alt="Doctor Girl" 
            className="absolute inset-0 w-full h-full object-cover object-center z-0" 
            draggable="false"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700/80 via-cyan-500/60 to-cyan-400/70 z-10"></div>
          <div className="relative z-20">
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 bg-white/30 rounded-lg flex items-center justify-center mr-3">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold tracking-tight">ClinicalDocs AI</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">{isLogin ? 'Welcome Back!' : 'Join ClinicalDocs AI'}</h2>
            <p className="mb-8 text-lg max-w-xs">{isLogin ? 'Sign in to streamline your clinical documentation workflow.' : 'Create your account to revolutionize your clinical documentation.'}</p>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-white/80" />
                <span>AI-powered voice recognition</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-white/80" />
                <span>Instant clinical note generation</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-white/80" />
                <span>HIPAA-compliant security</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-white/80" />
                <span>Seamless EHR integration</span>
              </li>
            </ul>
          </div>
        </div>
        {/* Right Panel (Form) */}
        <div className={rightPanelClass + ' flex flex-col justify-center items-center px-16'}>
          <div className="w-full max-w-sm">
            <div className="flex space-x-8 mb-8 justify-center">
              <button
                className={`pb-2 text-lg font-semibold border-b-2 transition-all duration-300 ${!isLogin ? 'text-blue-600 border-blue-600' : 'text-gray-400 border-transparent'}`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
              <button
                className={`pb-2 text-lg font-semibold border-b-2 transition-all duration-300 ${isLogin ? 'text-blue-600 border-blue-600' : 'text-gray-400 border-transparent'}`}
                onClick={() => setIsLogin(true)}
              >
                Sign In
              </button>
            </div>
            {/* Social Buttons */}
            <div className="flex space-x-4 mb-6">
              <button className="flex-1 flex items-center justify-center border border-gray-300 rounded-lg py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                <span className="w-5 h-5 mr-2 inline-block align-middle">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <path d="M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.79h5.48a4.68 4.68 0 01-2.03 3.07v2.55h3.28c1.92-1.77 3.03-4.38 3.03-7.41z" fill="#4285F4"/>
                      <path d="M10 20c2.7 0 4.97-.89 6.63-2.41l-3.28-2.55c-.91.61-2.07.97-3.35.97-2.57 0-4.75-1.74-5.53-4.07H1.06v2.6A10 10 0 0010 20z" fill="#34A853"/>
                      <path d="M4.47 12.94A5.99 5.99 0 013.82 10c0-.51.09-1.01.15-1.49V5.91H1.06A10 10 0 000 10c0 1.57.38 3.06 1.06 4.09l3.41-1.15z" fill="#FBBC05"/>
                      <path d="M10 3.96c1.47 0 2.78.51 3.81 1.5l2.85-2.85C14.97 1.01 12.7 0 10 0A10 10 0 001.06 5.91l3.41 2.6C5.25 5.7 7.43 3.96 10 3.96z" fill="#EA4335"/>
                    </g>
                  </svg>
                </span>
                Google
              </button>
              <button className="flex-1 flex items-center justify-center border border-gray-300 rounded-lg py-2 text-blue-700 hover:bg-blue-50 transition-colors">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Facebook" className="w-5 h-5 mr-2" />
                Facebook
              </button>
            </div>
            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="mx-4 text-gray-400 text-sm">or sign {isLogin ? 'in' : 'up'} with email</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pr-10"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </div>
              {!isLogin && (
                <div className="flex items-center">
                  <input
                    id="agree"
                    name="agree"
                    type="checkbox"
                    checked={formData.agree}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    required
                  />
                  <label htmlFor="agree" className="ml-2 block text-sm text-gray-600">
                    I agree to the Terms & Privacy Policy
                  </label>
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-400 to-cyan-400 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 mt-2"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 