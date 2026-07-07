import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ChevronRight, FileCode2, Send, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import { dataStore } from '../utils/dataStore';

interface HeroProps {
  onGetStarted: () => void;
  onViewProjects: () => void;
}

export default function Hero({ onGetStarted, onViewProjects }: HeroProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    companyEmail: "",
    projectScope: "",
    phone: "",
    companyName: "",
    serviceCategory: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<{ name: string; size: string; type: string; dataUrl: string }[]>([]);
  const [dragActive, setDragActive] = useState(false);
  
  const fullNameRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.companyEmail || !formData.phone || !formData.projectScope || !formData.serviceCategory) {
      alert("Please complete all required fields, including Service Category.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const attachmentsText = selectedFiles.length > 0 
        ? "\n" + selectedFiles.map(f => `[Uploaded Attachment: ${f.name} (${f.size})]`).join("\n")
        : "";
      dataStore.addLead({
        fullName: formData.fullName,
        companyEmail: formData.companyEmail,
        phone: formData.phone || "N/A",
        projectScope: formData.projectScope + attachmentsText,
        serviceCategory: formData.serviceCategory,
        attachments: selectedFiles
      });
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      companyEmail: "",
      projectScope: "",
      phone: "",
      companyName: "",
      serviceCategory: ""
    });
    setSelectedFiles([]);
    setSubmitted(false);
  };

  const handleFocusForm = () => {
    if (fullNameRef.current) {
      fullNameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      fullNameRef.current.focus();
    }
  };

  return (
    <section 
      id="hero-section"
      className="relative min-h-[75vh] pt-28 sm:pt-32 pb-14 flex items-center bg-white overflow-hidden"
    >
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/assets/images/blueprint_cad_1780503663960.png" 
          alt="Technical Blueprint background" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-[0.55] select-none"
        />
        {/* Subtle Gradient to keep typography readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
      </div>

      {/* Background Subtle Architect Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.025] pointer-events-none" style={{
        backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column: SECURE FIELD ESTIMATING PIPELINE */}
          <div className="lg:col-span-4 pt-4 text-left">
            <div>
              <span className="font-mono text-xs font-black text-industrial-red uppercase tracking-widest block mb-4">
                SECURE FIELD ESTIMATING PIPELINE
              </span>
              
              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-black mb-6 leading-tight uppercase">
                Let's Build Something Uncompromising.
              </h2>
              
              <p className="font-sans text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                Submit your inquiry, for initial site evaluation, plan review.
              </p>
            </div>

            {/* Verified Contact Meta Information Cards */}
            <div className="space-y-6 pt-6 border-t border-gray-200">
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-50 border border-gray-200 text-black shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] text-gray-400 uppercase tracking-widest font-black leading-none mb-1">
                    DIRECT DIGITAL DISPATCH
                  </span>
                  <a 
                    href="mailto:jgconstruction880@gmail.com" 
                    className="font-display font-bold text-sm sm:text-base text-black hover:text-[#D41D1D] transition-colors font-sans"
                  >
                    jgconstruction880@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-50 border border-gray-200 text-black shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] text-gray-400 uppercase tracking-widest font-black leading-none mb-1">
                    REGIONAL SITE OFFICE HOTLINE
                  </span>
                  <a 
                    href="tel:+639453087399" 
                    className="font-display font-bold text-sm sm:text-base text-black hover:text-[#1B49B8] transition-colors font-sans"
                  >
                    (+63) 945 308 7399
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-50 border border-gray-200 text-black shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] text-gray-400 uppercase tracking-widest font-black leading-none mb-1">
                    HQ DESIGN & CONTRACTING SUITE
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-gray-700 font-medium">
                    Lot 8, Block 6, Legian 2D Subdivision, Carsadang Bago I, Imus City, Cavite, Philippines
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: High-Contrast Technical Form Box */}
          <div className="lg:col-span-8 w-full bg-white border-2 border-black p-6 sm:p-8 relative shadow-[8px_8px_0px_#1B49B8] flex flex-col">

            {submitted ? (
              <div className="py-12 px-4 text-center flex flex-col items-center justify-center h-full">
                <div className="p-4 bg-green-50 border-2 border-green-500 rounded-full text-green-600 mb-6">
                  <CheckCircle className="h-10 w-10" />
                </div>
                
                <h3 className="font-display font-black text-2xl text-black uppercase mb-3 text-center">
                  SPECIFICATIONS INGESTED
                </h3>
                
                <p className="max-w-md text-gray-600 font-sans text-sm leading-relaxed mb-8 text-center scroll-mt-24">
                  Your structural scope has been queued into our estimator database. A coordinating civil engineer will correspond with full bidding valuations shortly.
                </p>

                <div className="bg-[#fafafa] border border-black p-4 w-full text-left font-mono text-xs text-black mb-8 overflow-x-auto max-w-sm mx-auto">
                  <div className="text-black font-black">JG_LEDGER_RECEIPT</div>
                  <div className="mt-2">CLIENT: <span className="font-bold">{formData.fullName}</span></div>
                  <div>EMAIL: {formData.companyEmail}</div>
                  <div>PHONE: {formData.phone}</div>
                  {formData.fullName.length > 0 && (
                    <div>ROUTE_STAMP: JG_{formData.fullName.substring(0,3).toUpperCase()}_0226</div>
                  )}
                  {selectedFiles.length > 0 && (
                    <>
                      <div>ATTACHMENTS ({selectedFiles.length}):</div>
                      {selectedFiles.map((f, idx) => (
                        <div key={idx} className="truncate pl-3 text-black font-mono text-xs">- {f.name}</div>
                      ))}
                    </>
                  )}
                </div>

                 <div className="flex flex-col sm:flex-row gap-3 w-full justify-center max-w-sm mb-4">
                  <a
                    href="tel:+639453087399"
                    className="flex-1 flex items-center justify-center gap-2 text-[#1B49B8] bg-white hover:bg-blue-50/50 border border-[#1B49B8] font-display font-bold px-4 py-3 rounded-none transition-colors cursor-pointer text-xs uppercase tracking-widest text-center"
                  >
                    <Phone className="h-4 w-4" /> Call Us
                  </a>
                  <a
                    href="mailto:jgconstruction880@gmail.com"
                    className="flex-1 flex items-center justify-center gap-2 text-industrial-red bg-white hover:bg-red-50/50 border border-industrial-red font-display font-bold px-4 py-3 rounded-none transition-colors cursor-pointer text-xs uppercase tracking-widest text-center"
                  >
                    <Mail className="h-4 w-4" /> Email Us
                  </a>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full max-w-sm text-black bg-white hover:bg-gray-50 border border-black font-display font-bold py-3 rounded-none transition-colors cursor-pointer text-xs uppercase tracking-widest text-center"
                >
                  Submit Another Project
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between text-left space-y-4">
                {/* 2 per row grid for details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block text-[10px] font-mono font-black text-black uppercase tracking-wider mb-1.5">
                      Name <span className="text-industrial-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      ref={fullNameRef}
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-white border border-black px-3 py-2 text-sm rounded-none focus:outline-none focus:ring-2 focus:ring-[#1B49B8] text-black placeholder-gray-400 font-sans"
                      placeholder="e.g. Juan dela Cruz"
                    />
                  </div>

                  <div>
                    <label htmlFor="companyEmail" className="block text-[10px] font-mono font-black text-black uppercase tracking-wider mb-1.5">
                      Email <span className="text-industrial-red">*</span>
                    </label>
                    <input
                      type="email"
                      id="companyEmail"
                      required
                      value={formData.companyEmail}
                      onChange={(e) => setFormData({ ...formData, companyEmail: e.target.value })}
                      className="w-full bg-white border border-black px-3 py-2 text-sm rounded-none focus:outline-none focus:ring-2 focus:ring-[#1B49B8] text-black placeholder-gray-400 font-sans"
                      placeholder="e.g. j.delacruz@gmail.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-[10px] font-mono font-black text-black uppercase tracking-wider mb-1.5">
                      Phone Number <span className="text-industrial-red">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-black px-3 py-2 text-sm rounded-none focus:outline-none focus:ring-2 focus:ring-[#1B49B8] text-black placeholder-gray-400 font-sans"
                      placeholder="e.g. +63 (0917) 555-0901"
                    />
                  </div>

                  <div>
                    <label htmlFor="serviceCategory" className="block text-[10px] font-mono font-black text-black uppercase tracking-wider mb-1.5">
                      Project Scope Category <span className="text-industrial-red">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="serviceCategory"
                        required
                        value={formData.serviceCategory || ""}
                        onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                        className="w-full bg-white border border-black px-3 py-2 text-sm rounded-none focus:outline-none focus:ring-2 focus:ring-[#1B49B8] text-black font-sans appearance-none cursor-pointer pr-10"
                      >
                        <option value="" disabled className="text-gray-400">-- Choose Service Area --</option>
                        {dataStore.getServices().map((service) => (
                          <option key={service.id} value={service.title} className="text-black">
                            {service.title}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-black">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col min-h-[120px]">
                  <label htmlFor="projectScope" className="block text-[10px] font-mono font-black text-black uppercase tracking-wider mb-1.5">
                    Project Scope & Structural Requirements <span className="text-industrial-red">*</span>
                  </label>
                  <textarea
                    id="projectScope"
                    required
                    value={formData.projectScope}
                    onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                    className="flex-1 min-h-[100px] w-full bg-white border border-black px-3 py-2 text-sm rounded-none focus:outline-none focus:ring-2 focus:ring-[#1B49B8] text-black placeholder-gray-400 font-sans resize-y"
                    placeholder="Describe specific structural targets, materials needed, load metrics..."
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-black text-black uppercase tracking-wider mb-1.5">
                    Upload Blueprints / Files <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragActive(true);
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragActive(false);
                      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                        const filesArray = Array.from(e.dataTransfer.files) as File[];
                        const pdfFiles = filesArray.filter(file => file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"));
                        if (pdfFiles.length !== filesArray.length) {
                          alert("Only PDF files are accepted. Non-PDF files have been filtered out.");
                        }
                        pdfFiles.forEach((file: File) => {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setSelectedFiles(prev => [...prev, {
                              name: file.name,
                              size: (file.size / 1024).toFixed(1) + " KB",
                              type: file.type,
                              dataUrl: reader.result as string
                            }]);
                          };
                          reader.readAsDataURL(file);
                        });
                      }
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed p-4 text-center cursor-pointer transition-colors ${
                      dragActive 
                        ? "border-[#1B49B8] bg-blue-50/30" 
                        : "border-gray-300 hover:border-black bg-[#fafafa]"
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      multiple
                      accept=".pdf,application/pdf"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          const filesArray = Array.from(e.target.files) as File[];
                          const pdfFiles = filesArray.filter(file => file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"));
                          if (pdfFiles.length !== filesArray.length) {
                            alert("Only PDF files are accepted. Non-PDF files have been filtered out.");
                          }
                          pdfFiles.forEach((file: File) => {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setSelectedFiles(prev => [...prev, {
                                name: file.name,
                                size: (file.size / 1024).toFixed(1) + " KB",
                                type: file.type,
                                dataUrl: reader.result as string
                              }]);
                            };
                            reader.readAsDataURL(file);
                          });
                        }
                      }}
                      className="hidden"
                    />
                    {selectedFiles.length > 0 ? (
                      <div className="space-y-2 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                        <div className="text-left font-mono text-[10px] text-gray-400 uppercase font-black tracking-widest">// SELECTED FILES ({selectedFiles.length}):</div>
                        {selectedFiles.map((file, idx) => (
                          <div key={idx} className="flex items-center justify-between text-left bg-white border border-black p-2">
                            <div className="flex items-center gap-2 overflow-hidden mr-2">
                              <span className="font-mono text-xs font-bold text-gray-500 shrink-0">#{(idx+1)}:</span>
                              <span className="font-sans text-xs text-black font-semibold truncate max-w-[200px]" title={file.name}>
                                {file.name}
                              </span>
                              <span className="font-mono text-[9px] text-gray-400 shrink-0">({file.size})</span>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedFiles(prev => prev.filter((_, i) => i !== idx));
                              }}
                              className="text-industrial-red hover:text-red-700 font-mono text-[10px] uppercase font-black tracking-widest px-2 cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <div className="font-mono text-[9px] text-gray-400 uppercase font-black tracking-widest text-center mt-2 hover:text-black transition-colors">
                          + Drag & drop or <span className="text-[#1B49B8] underline cursor-pointer" onClick={() => fileInputRef.current?.click()}>add more files</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="font-mono text-[10px] text-gray-400 uppercase font-black tracking-widest">
                          Drag and drop blueprints or <span className="text-[#1B49B8] underline">browse files</span>
                        </div>
                        <p className="font-sans text-[10px] text-gray-500">
                          Supports PDF files only (Max 25MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1B49B8] hover:bg-[#153a94] disabled:bg-gray-400 text-white font-display font-extrabold tracking-widest text-xs uppercase py-3.5 px-6 rounded-none transition-all duration-300 shadow-[4px_4px_0px_#111111] active:shadow-[0px_0px_0px_#111111] border-2 border-black cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  {loading ? (
                    <>
                      <FileCode2 className="h-4.5 w-4.5 animate-spin" />
                      <span>VERIFYING SYSTEM CALCULATIONS...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>

                <p className="text-[9px] font-mono text-gray-400 text-center uppercase tracking-normal">
                  All calculations mapped directly to standard engineering rules. Privacy strictly secured.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
