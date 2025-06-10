import React, { useState, useEffect, useRef } from 'react';
import { Mic, FileText, Zap, Shield, Users, ChevronRight, Play, Pause, CheckCircle, ArrowRight, RefreshCw, Mail, Phone, MapPin, Send, Twitter, Linkedin, Facebook, Instagram, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ClinicalDocsLanding() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [animatedText, setAnimatedText] = useState('');
  const [countPercentage, setCountPercentage] = useState(0);
  const [featureStack, setFeatureStack] = useState([]);
  const [revealedCount, setRevealedCount] = useState(1);
  const [animatingIdx, setAnimatingIdx] = useState(null);
  const cardPositions = useRef([]);
  const benefitsRef = useRef(null);
  const [showBenefits, setShowBenefits] = useState(false);
  const [showClickMe, setShowClickMe] = useState(true);
  const [showContact, setShowContact] = useState(false);
  const contactRef = useRef(null);
  const [showFooter, setShowFooter] = useState(false);
  const [email, setEmail] = useState('');
  const footerRef = useRef(null);

  const handleFeatureClick = (index) => {
    // Avoid duplicate stacking
    if (!featureStack.includes(index)) {
      setFeatureStack([...featureStack, index]);
    }
  };

  const topFeatureIndex = featureStack[featureStack.length - 1];

  const features = [
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Voice Recognition",
      description: "Advanced speech-to-text technology that understands medical terminology and context",
      image: "https://imgs.search.brave.com/BdJfInp7H7yls2cfGFD9TKt7SH_24ay3sUZim9N80tU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTIw/MjIyNjM5My9waG90/by92b2ljZS1hc3Np/c3RhbnQtc2lyaS1j/b25jZXB0LW9uLXNt/YXJ0cGhvbmUtc2Ny/ZWVuLXZvaWNlLXJl/Y29nbml0aW9uLW1v/YmlsZS10ZWNobm9s/b2d5LWFuZC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9RDh6/T2swVmd4aHJqRGRU/cUMwNjVVbVY2NC13/WmFrLW5kSklYbmRm/eUZJUT0"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Smart Documentation",
      description: "AI-powered NLP generates structured, accurate clinical notes automatically",
      image: "https://media.istockphoto.com/id/1150572105/photo/female-professional-using-virtual-assistant-at-desk.jpg?s=2048x2048&w=is&k=20&c=Qco2zyd5HDlTyj5_XUtJBemSTgn0oM9TGqStnOmQz-s="
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Processing",
      description: "Instant transcription and note generation during patient consultations",
      image: "https://media.istockphoto.com/id/1534532471/photo/smiling-teenage-girl-wearing-headphones-typing-on-laptop.jpg?s=1024x1024&w=is&k=20&c=PxLG812G9DjzQ9vSLWRoKqeDccpRR0T1o1A9hhKH4Ek="
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "HIPAA Compliant",
      description: "Enterprise-grade security ensuring patient data privacy and compliance",
      image: "https://media.istockphoto.com/id/1269829857/photo/hipaa-compliance-write-on-paperwork-isolated-on-wooden-table.jpg?s=2048x2048&w=is&k=20&c=b9G_ndckLO4zvslF4Bqy_Vh0ACAcXzaNEU64zgMoTQ8="
    }
  ];

  const benefits = [
    "Reduce documentation time by 70%",
    "Improve accuracy with medical NLP",
    "Seamless EHR integration",
    "Voice-activated workflow",
    "Multi-language support",
    "Real-time collaboration"
  ];

  const demoText = "Patient presents with chest pain radiating to left arm. Vital signs stable. Recommending ECG and cardiac enzymes.";
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isRecording) {
      let i = 0;
      const timer = setInterval(() => {
        if (i < demoText.length) {
          setAnimatedText(demoText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    } else {
      setAnimatedText('');
    }
  }, [isRecording]);

  useEffect(() => {
    let counter;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        
        if (entry.isIntersecting) {
          // Reset states first
          setShowBenefits(false);
          setCountPercentage(0);
          
          // Small delay before starting animations
          setTimeout(() => {
            setShowBenefits(true);
            
            // Start counting animation
            let count = 0;
            const duration = 2000;
            const interval = 20;
            const steps = duration / interval;
            const increment = 70 / steps;

            counter = setInterval(() => {
              count += increment;
              if (count >= 70) {
                setCountPercentage(70);
                clearInterval(counter);
              } else {
                setCountPercentage(Math.floor(count));
              }
            }, interval);
          }, 100);
        } else {
          // Reset when leaving viewport
          setShowBenefits(false);
          setCountPercentage(0);
          if (counter) {
            clearInterval(counter);
          }
        }
      },
      { 
        threshold: 0.5,
        rootMargin: '50px'
      }
    );

    if (benefitsRef.current) {
      observer.observe(benefitsRef.current);
    }

    return () => {
      if (benefitsRef.current) {
        observer.unobserve(benefitsRef.current);
      }
      if (counter) {
        clearInterval(counter);
      }
    };
  }, []);

  useEffect(() => {
    if (revealedCount === 1) {
      const interval = setInterval(() => {
        setShowClickMe(prev => !prev);
      }, 1500);
      return () => clearInterval(interval);
    } else {
      setShowClickMe(false);
    }
  }, [revealedCount]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setShowContact(true);
        } else {
          setShowContact(false);
        }
      },
      { threshold: 0.2 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setShowFooter(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
<div className="min-h-screen">
   <div className="absolute inset-0 bg-[url('https://media.istockphoto.com/id/1903424167/photo/medical-team-meeting.jpg?s=1024x1024&w=is&k=20&c=znrbrcmjni7-e7Ysphowp-dp89GiNuj-wKjNq6pwZJk=')] bg-cover bg-center bg-fixed filter blur-sm"></div>
   <div className="absolute inset-0 bg-black/30"></div>
   <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>

      {/* Header */}
      <header className="bg-white/100 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-8xl  px-1 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ClinicalDocs AI
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-black-1000 hover:text-blue-600 transition-colors">Features</a>
              <a href="#demo" className="text-black-700 hover:text-blue-600 transition-colors">Demo</a>
              <a href="#contact" className="text-black-700 hover:text-blue-600 transition-colors">Contact</a>
            </nav>
            <button 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pb-36 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-20">
          <div className="text-center pt-24">
            <h1 className="text-5xl md:text-7xl font-bold mb-12">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Automated Clinical
              </span>
              <br />
              <span className="text-white">Documentation</span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your clinical workflow with AI-powered voice recognition and NLP. 
              Generate accurate clinical notes automatically, saving time and improving patient care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-gray-500 text-gray-200 px-8 py-4 rounded-xl text-lg font-semibold bg-black hover:bg-white hover:text-black transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">See It In Action  </h2>
            <p className="text-xl text-gray-600">Experience real-time voice-to-documentation conversion</p>
              </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="text-center">
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isRecording 
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                        : 'bg-blue-500 hover:bg-blue-600'
                    } text-white shadow-lg hover:shadow-xl transform hover:scale-105`}
                  >
                    {isRecording ? <Pause className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                  </button>
                  <p className="mt-4 text-lg font-semibold text-gray-700">
                    {isRecording ? 'Recording...' : 'Click to Record'}
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Voice Input</h3>
                  <div className="h-20 bg-gray-50 rounded-lg flex items-center justify-center">
                    {isRecording ? (
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-2 bg-blue-500 rounded-full animate-pulse`} 
                               style={{height: `${Math.random() * 30 + 10}px`, animationDelay: `${i * 0.1}s`}}></div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">Click the microphone to start recording</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Generated Clinical Note</h3>
                <div className="bg-gray-50 rounded-lg p-4 min-h-32">
                  <p className="text-gray-700 font-mono text-sm leading-relaxed">
                    {animatedText}
                    {isRecording && <span className="animate-pulse">|</span>}
                  </p>
                </div>
                {animatedText && (
                  <div className="mt-4 flex items-center text-green-600">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="text-sm">Note generated successfully</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 mb-12">Everything you need to streamline your clinical documentation</p>
          </div>
          <div className="flex gap-8">
            <div className="relative h-[600px] flex-1 flex items-center justify-center mt-24">
              {/* Reset button */}
              {revealedCount > 1 && (
                <button
                  className="absolute -left-20 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors flex items-center gap-2"
                  onClick={() => setRevealedCount(1)}
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </button>
              )}
              {features.slice(0, revealedCount).map((feature, idx) => {
                const isTop = idx === revealedCount - 1;
                const offset = (features.length - revealedCount + idx) * 40;
                const z = 10 + idx;
                const scale = isTop ? 'scale-105' : 'scale-95';
                const gradients = [
                  'from-blue-500 via-blue-400 to-indigo-500',
                  'from-purple-500 via-pink-400 to-red-400',
                  'from-green-400 via-teal-400 to-blue-400',
                  'from-yellow-400 via-orange-400 to-pink-500',
                ];
                const gradient = gradients[idx % gradients.length];

                let cardTop = offset;
                let transition = 'transition-all duration-500 ease-in-out';
                if (animatingIdx === idx) {
                  cardTop = 200;
                  setTimeout(() => {
                    cardPositions.current[idx].style.top = `${offset}px`;
                  }, 10);
                  transition = 'transition-all duration-500 ease-in-out';
                }

                return (
                  <div
                    key={idx}
                    ref={el => cardPositions.current[idx] = el}
                    className={`absolute left-0 right-0 mx-auto w-[48rem] h-[280px] rounded-xl overflow-hidden text-white bg-gradient-to-br ${gradient} cursor-pointer ${transition} ${scale}`}
                    style={{
                      top: `${cardTop}px`,
                      zIndex: z,
                      opacity: 1,
                      boxShadow: isTop
                        ? '0 8px 32px rgba(59,130,246,0.15)'
                        : '0 2px 8px rgba(0,0,0,0.08)'
                    }}
                    onClick={() => {
                      if (isTop && revealedCount < features.length) {
                        setAnimatingIdx(revealedCount);
                        setRevealedCount(revealedCount + 1);
                        setTimeout(() => setAnimatingIdx(null), 600);
                      }
                    }}
                  >
                    <div className="flex h-full">
                      <div className="flex-1 p-8 flex flex-col justify-center">
                        <div className="w-12 h-12 bg-white/30 rounded-lg flex items-center justify-center text-white mb-4">
                          {feature.icon}
                        </div>
                        <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                        <p className="text-white/90 text-lg">{feature.description}</p>
                      </div>
                      <div className="w-1/3 relative h-full">
                        <img 
                          src={feature.image} 
                          alt={feature.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* Click me indicator */}
              {revealedCount === 1 && showClickMe && (
                <div className="absolute -bottom-0 left-1/2 transform -translate-x-1/2 z-50 bg-white text-blue-600 px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 animate-bounce">
                  <span className="text-sm font-medium">Click me</span>
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </div>
              )}
            </div>
            
            {/* Progress Container */}
            <div className="w-24 mt-24 relative">
              <div className="h-full w-2 bg-gray-200 rounded-full absolute left-1/2 transform -translate-x-1/2">
                <div 
                  className="w-2 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full transition-all duration-500 ease-in-out"
                  style={{ 
                    height: `${(revealedCount / features.length) * 100}%`,
                    transform: 'translateY(0)'
                  }}
                ></div>
              </div>
              {features.map((_, idx) => (
                <div 
                  key={idx}
                  className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                    idx < revealedCount 
                      ? 'bg-blue-600 border-blue-600 scale-110' 
                      : 'bg-white border-gray-300'
                  }`}
                  style={{
                    top: `${(idx / (features.length - 1)) * 100}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {idx < revealedCount && (
                    <div className="w-full h-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transform transition-all duration-1000 ${showBenefits ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Why Choose ClinicalDocs AI?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Streamline your documentation process and focus on what matters most - patient care.
              </p>
              <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center space-x-3 transform transition-all duration-1000 delay-${(index + 1) * 100} ${
                      showBenefits ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                  >
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 transform transition-all duration-1000 ${
              showBenefits ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2 transition-all duration-300">
                  {countPercentage}%
                </div>
                <p className={`text-lg text-gray-700 mb-4 transform transition-all duration-1000 delay-300 ${
                  showBenefits ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  Reduction in documentation time
                </p>
                <div className={`bg-white rounded-lg p-4 shadow-md transform transition-all duration-1000 delay-500 ${
                  showBenefits ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  <Users className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                  <p className="text-sm text-gray-600">Trusted by healthcare professionals worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold text-gray-800 mb-4 transform transition-all duration-1000 ${
              showContact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              Get in Touch
            </h2>
            <p className={`text-xl text-gray-600 transform transition-all duration-1000 delay-100 ${
              showContact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              Have questions? We're here to help you transform your clinical documentation workflow.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className={`bg-white rounded-2xl p-8 shadow-xl transform transition-all duration-1000 ${
              showContact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="transform transition-all duration-1000 delay-200" style={{
                    opacity: showContact ? 1 : 0,
                    transform: showContact ? 'translateY(0)' : 'translateY(20px)'
                  }}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div className="transform transition-all duration-1000 delay-300" style={{
                    opacity: showContact ? 1 : 0,
                    transform: showContact ? 'translateY(0)' : 'translateY(20px)'
                  }}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="transform transition-all duration-1000 delay-400" style={{
                  opacity: showContact ? 1 : 0,
                  transform: showContact ? 'translateY(0)' : 'translateY(20px)'
                }}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="transform transition-all duration-1000 delay-500" style={{
                  opacity: showContact ? 1 : 0,
                  transform: showContact ? 'translateY(0)' : 'translateY(20px)'
                }}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all h-32"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <div className="transform transition-all duration-1000 delay-600" style={{
                  opacity: showContact ? 1 : 0,
                  transform: showContact ? 'translateY(0)' : 'translateY(20px)'
                }}>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className={`bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 transform transition-all duration-1000 delay-200 ${
                showContact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 transform transition-all duration-1000 delay-300" style={{
                    opacity: showContact ? 1 : 0,
                    transform: showContact ? 'translateY(0)' : 'translateY(20px)'
                  }}>
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="text-gray-800 font-medium">support@clinicaldocs.ai</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 transform transition-all duration-1000 delay-400" style={{
                    opacity: showContact ? 1 : 0,
                    transform: showContact ? 'translateY(0)' : 'translateY(20px)'
                  }}>
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="text-gray-800 font-medium">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 transform transition-all duration-1000 delay-500" style={{
                    opacity: showContact ? 1 : 0,
                    transform: showContact ? 'translateY(0)' : 'translateY(20px)'
                  }}>
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Office</p>
                      <p className="text-gray-800 font-medium">123 Healthcare Ave, Suite 100<br />San Francisco, CA 94107</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`bg-white rounded-2xl p-8 shadow-xl transform transition-all duration-1000 delay-600 ${
                showContact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Office Hours</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center transform transition-all duration-1000 delay-700" style={{
                    opacity: showContact ? 1 : 0,
                    transform: showContact ? 'translateY(0)' : 'translateY(20px)'
                  }}>
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium text-gray-800">9:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between items-center transform transition-all duration-1000 delay-800" style={{
                    opacity: showContact ? 1 : 0,
                    transform: showContact ? 'translateY(0)' : 'translateY(20px)'
                  }}>
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium text-gray-800">10:00 AM - 4:00 PM PST</span>
                  </div>
                  <div className="flex justify-between items-center transform transition-all duration-1000 delay-900" style={{
                    opacity: showContact ? 1 : 0,
                    transform: showContact ? 'translateY(0)' : 'translateY(20px)'
                  }}>
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium text-gray-800">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Practice?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of healthcare professionals who have revolutionized their documentation workflow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleGetStarted}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Start Free Trial</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer ref={footerRef} className="bg-gradient-to-b from-gray-900 to-gray-950 text-white py-16 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Newsletter Section */}
          <div className={`max-w-2xl mx-auto text-center mb-16 transform transition-all duration-1000 ${
            showFooter ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Stay Updated
            </h3>
            <p className="text-gray-400 mb-6">Subscribe to our newsletter for the latest updates and insights.</p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <span>Subscribe</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className={`transform transition-all duration-1000 delay-100 ${
              showFooter ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  ClinicalDocs AI
                </span>
              </div>
              <p className="text-gray-400 mb-6">Revolutionizing clinical documentation with AI technology.</p>
              <div className="flex space-x-4">
                {[
                  { icon: Twitter, href: '#', label: 'Twitter' },
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { icon: Facebook, href: '#', label: 'Facebook' },
                  { icon: Instagram, href: '#', label: 'Instagram' }
                ].map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 ${
                      showFooter ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className={`transform transition-all duration-1000 delay-200 ${
              showFooter ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <h3 className="text-lg font-semibold mb-6 text-white">Product</h3>
              <div className="space-y-4">
                {['Features', 'Pricing', 'Security', 'Updates', 'Documentation'].map((item, index) => (
                  <a
                    key={item}
                    href="#"
                    className="block text-gray-400 hover:text-blue-400 transition-colors duration-300"
                    style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div className={`transform transition-all duration-1000 delay-300 ${
              showFooter ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <h3 className="text-lg font-semibold mb-6 text-white">Company</h3>
              <div className="space-y-4">
                {['About', 'Careers', 'Blog', 'Press', 'Partners'].map((item, index) => (
                  <a
                    key={item}
                    href="#"
                    className="block text-gray-400 hover:text-blue-400 transition-colors duration-300"
                    style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Support Links */}
            <div className={`transform transition-all duration-1000 delay-400 ${
              showFooter ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <h3 className="text-lg font-semibold mb-6 text-white">Support</h3>
              <div className="space-y-4">
                {['Help Center', 'Privacy Policy', 'Terms of Service', 'Contact', 'Status'].map((item, index) => (
                  <a
                    key={item}
                    href="#"
                    className="block text-gray-400 hover:text-blue-400 transition-colors duration-300"
                    style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className={`pt-8 mt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center transform transition-all duration-1000 delay-500 ${
            showFooter ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} ClinicalDocs AI. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Cookies</a>
            </div>
          </div>

          {/* Scroll to Top Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg flex items-center justify-center text-white transform transition-all duration-300 hover:scale-110 ${
              showFooter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        </div>
      </footer>
    </div>
  );
}