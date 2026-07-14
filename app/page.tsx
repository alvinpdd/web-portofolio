'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Moon, Sun, Download, ChevronRight, ExternalLink, X, 
  MapPin, Mail, Phone, Linkedin, Award, Briefcase, 
  GraduationCap, User, Code, Cpu, Activity, LayoutTemplate,
  Terminal, FileText, Zap, ShieldCheck 
} from 'lucide-react';

const DATA = {
  profile: {
    name: "Alvin Christofer Pardede",
    role: "Electrical & Industrial Automation Engineer",
    summary: "Lulusan S1 Teknik Elektro Universitas Sumatera Utara dengan keahlian kuat di bidang Power System Analysis dan Otomasi Industri. Terampil melakukan Load Flow Analysis, Short Circuit Analysis, Protection Coordination, Arc Flash Study, serta Transient Stability menggunakan ETAP. Memiliki kemampuan praktis dalam perancangan sistem logika sekuensial dan pemrograman PLC serta HMI. Dikenal teliti, berorientasi pada solusi berbasis data, dan mampu bekerja secara kolaboratif.",
    phone: "0895601172402",
    email: "alvinpdd@gmail.com",
    linkedin: "https://www.linkedin.com/in/alvin-christofer-pardede/",
    location: "Medan, Sumatera Utara",
    photo: "profile.jpeg"
  },
  skills: {
    technical: [
      { name: "Power System Analysis", icon: <Zap size={18}/>, desc: "Load Flow, Short Circuit, Protection, Arc Flash, Transient Stability" },
      { name: "Industrial Automation", icon: <Cpu size={18}/>, desc: "PLC Programming, Sequential Logic Design" },
      { name: "HMI Design", icon: <LayoutTemplate size={18}/>, desc: "Human Machine Interface Configuration" }
    ],
    software: [
      { name: "ETAP", icon: <Activity size={18}/> },
      { name: "Mitsubishi FX Series (PLC)", icon: <Terminal size={18}/> },
      { name: "GX Works2 & GX Developer", icon: <Code size={18}/> },
      { name: "GT Designer (HMI)", icon: <LayoutTemplate size={18}/> },
      { name: "Proteus", icon: <Cpu size={18}/> },
      { name: "Python", icon: <Code size={18}/> },
      { name: "Microsoft Office", icon: <FileText size={18}/> }
    ],
    soft: [
      "Komunikasi efektif", "Problem solving & analisis data", "Kerja sama tim & kolaborasi",
      "Adaptif dan cepat belajar", "Kepemimpinan & pengelolaan proyek"
    ]
  },
  experience: [
    {
      id: 1,
      company: "BADAN PENDAPATAN DAERAH PROVINSI SUMATERA UTARA",
      role: "Staf Pendukung Evaluasi dan Pelaporan Pajak Daerah (Outsourcing)",
      period: "Februari 2024 - Sekarang",
      location: "Medan, Sumatera Utara",
      achievements: [
        "Mengelola dan memverifikasi >100 laporan pengajuan keringanan sanksi PKB setiap bulan, mempercepat verifikasi hingga 30%.",
        "Melakukan analisis data wajib pajak dan merekomendasikan pengurangan sanksi hingga 85%.",
        "Menerapkan evaluasi kelayakan berbasis lima kriteria utama, menurunkan kesalahan administratif sebesar 20%.",
        "Bekerja sama dengan lintas tim untuk memastikan ketepatan waktu pelaporan bulanan dan triwulanan."
      ]
    },
    {
      id: 2,
      company: "PT. Telkom Indonesia",
      role: "Network Service Area (NSA) - Internship",
      period: "Januari 2022 - Juni 2022",
      location: "Medan, Sumatera Utara",
      achievements: [
        "Melaksanakan pemeliharaan dan troubleshooting pada >5 lokasi BSS untuk menjaga stabilitas jaringan GSM.",
        "Instalasi ulang dan konfigurasi External Alarm Status menggunakan OMT, meningkatkan akurasi alarm ke OMC hingga 95%.",
        "Mengidentifikasi dan menanggulangi gangguan daya pada perangkat BTS, mengurangi downtime operasional."
      ]
    }
  ],
  education: [
    {
      id: 1,
      institution: "Universitas Sumatera Utara",
      degree: "S1 Teknik Elektro",
      gpa: "3,34 / 4,00",
      period: "Juni 2018 - Desember 2023",
      relevantCourses: "Sistem Tenaga Listrik, Sistem Kendali, Pembangkit Tenaga Listrik, Komunikasi Serat Optik, Radar dan Navigasi."
    },
    {
      id: 2,
      institution: "SMA NEGERI 2 MEDAN",
      degree: "Ilmu Pengetahuan Alam (IPA)",
      gpa: "",
      period: "",
      relevantCourses: ""
    }
  ],
  organizations: [
    {
      id: 1,
      name: "Ikatan Mahasiswa Teknik Elektro USU",
      role: "Kepala Bidang Pengabdian Masyarakat",
      period: "Juni 2021 - Juni 2022",
      desc: "Mengelola >2 program pengabdian, menyalurkan kompetensi teknik kepada masyarakat melalui pelatihan berbasis energi. Meningkatkan partisipasi mahasiswa hingga 40%."
    },
    {
      id: 2,
      name: "Pengabdian Masyarakat Mahasiswa USU",
      role: "Kepala Divisi Pendidikan dan Pelatihan & Ketua Panitia",
      period: "Januari 2019 - Januari 2021",
      desc: "Merancang pelatihan kepemimpinan dan dasar organisasi. Memimpin penanaman 1.000 pohon di Danau Toba, mengoordinasikan >200 relawan dan 5+ lembaga."
    }
  ],
  certificates: [
    {
      id: 1,
      name: "Basic Programming of PLC & HMI - Mitsubishi FX Series",
      issuer: "Engineering Academy (Anak Teknik Indonesia)",
      date: "Mei 2026",
      credentialId: "CMP-MITSU-V-26-ATI-0105",
      type: "automation"
    },
    {
      id: 2,
      name: "Electrical Power System Analysis with ETAP",
      issuer: "Skill Engineer",
      date: "Maret 2026",
      credentialId: "EXC-ETPBSI-0326-SE-006",
      type: "power"
    },
    {
      id: 3,
      name: "TOEFL Prediction Test",
      issuer: "Englishvit",
      date: "Oktober 2025",
      credentialId: "EV/TO9/10/2025/002682365",
      type: "language",
      score: "530"
    }
  ],
  projects: [
    {
      id: 1,
      title: "Power System Analysis Using ETAP",
      category: "Power Systems",
      summary: "Simulasi dan analisis sistem tenaga kelistrikan industri PT Garuda Paper menggunakan perangkat lunak ETAP.",
      tools: ["ETAP", "Excel"],
      status: "Completed (Final Project)",
      thumbnail: "cert-etap_page-0001.jpg",
      images: ["etap-project.png"],
      description: "Proyek simulasi jaringan pabrik kertas (PT Garuda Paper) untuk kebutuhan design engineering. Melibatkan pembuatan One-Line Diagram yang komprehensif mencakup Grid PLN, Diesel Generator, trafo, kabel, dan beban.",
      details: [
        { label: "Load Flow Analysis", value: "Simulasi 3 skenario operasi (Grid PLN, Diesel, Kombinasi). Analisis drop tegangan dan perbaikan tegangan (tap changer & capacitor bank)." },
        { label: "Short Circuit Analysis", value: "Penentuan kapasitas busbar pada HV 20kV, LV 0.4kV, dan MCC 6.6kV sesuai standar IEC." },
        { label: "Protection Coordination", value: "Perhitungan dan pembuatan diagram TCC untuk koordinasi proteksi yang andal." },
        { label: "Arc Flash Studies", value: "Analisis clearing time, perhitungan incident energy, penentuan boundary, dan klasifikasi PPE." },
        { label: "Transient Stability", value: "Simulasi gangguan 3-phase, motor acceleration study, dan load sharing." }
      ],
      competencies: ["Power System Analysis", "Load Flow", "Short Circuit", "Protection Coordination", "Arc Flash", "Transient Stability"]
    },
    {
      id: 2,
      title: "PLC Water Pump Automation",
      category: "Industrial Automation",
      summary: "Sistem otomasi kontrol pompa air bergantian menggunakan Programmable Logic Controller (PLC) dan HMI.",
      tools: ["Mitsubishi FX PLC", "GX Works2", "GT Designer", "GX Developer"],
      status: "Completed (Final Assignment)",
      thumbnail: "plc-sertifikat.jpg",
      images: ["plc-project.png","plc-project2.png"],
      description: "Implementasi sistem kontrol cerdas untuk tangki air. Sistem memompa air dari sumber ke Storage Tank menggunakan kendali motor Star Delta. Dilengkapi sensor Level High (LH) dan Level Low (LL) untuk operasional otomatis.",
      details: [
        { label: "Control Logic", value: "Pemrograman logika sekuensial untuk operasi otomatis pompa Inlet dan Outlet berdasarkan level air (Delay timer dan interlock system)." },
        { label: "I/O Mapping", value: "Pemetaan input komprehensif (Start/Stop, Overload, Emergency, Auto Selector, Sensors) dan Output (Kontaktor Utama/Star/Delta, Indikator)." },
        { label: "HMI Design", value: "Pembuatan antarmuka visual (Human Machine Interface) untuk monitoring status pompa, level air, dan alarm trip/overload." },
        { label: "Documentation", value: "Pembuatan Flowchart alur kerja dan Matrix Interlock untuk keamanan sistem." }
      ],
      competencies: ["PLC Programming", "Industrial Automation", "Automation Control", "Electrical Design", "Sequential Logic"]
    }
  ]
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const SectionHeading = ({ children, subtitle }: any) => (
  <div className="mb-12 md:mb-20">
    <motion.h2 
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="text-3xl md:text-5xl font-bold tracking-tight text-white"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mt-4 text-neutral-400 text-lg max-w-2xl"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="h-1 w-20 bg-blue-500 mt-6 rounded-full"
    />
  </div>
);

const GlassCard = ({ children, className = "" }: any) => (
  <div className={`bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-3xl p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-md ${className}`}>
    {children}
  </div>
);

const ProjectModal = ({ project, isOpen, onClose }: any) => {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-neutral-900/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-[#0a0a0a] border border-neutral-800 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors z-10"
          >
            <X size={20} className="text-white" />
          </button>

          <div className="relative h-64 md:h-96 w-full bg-neutral-900 overflow-hidden">
             <img 
               src={encodeURI(project.thumbnail)} 
               alt={project.title} 
               onError={(e: any) => e.target.src = 'https://placehold.co/800x400/1e293b/white?text=Project+Thumbnail'}
               className="w-full h-full object-cover opacity-90 mix-blend-normal"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
             
             <div className="absolute bottom-0 left-0 p-6 md:p-10">
                <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full uppercase tracking-wider mb-3 inline-block">
                  {project.category}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{project.title}</h2>
             </div>
          </div>

          <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="col-span-1 lg:col-span-2 space-y-8">
              <section>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <FileText size={20} className="text-blue-500"/> Gambaran Proyek
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  {project.description}
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Activity size={20} className="text-blue-500"/> Hasil & Implementasi
                </h3>
                <div className="space-y-4">
                  {project.details.map((detail: any, idx: number) => (
                    <div key={idx} className="bg-neutral-800/50 p-4 rounded-2xl border border-neutral-800">
                      <h4 className="font-semibold text-white mb-1">{detail.label}</h4>
                      <p className="text-sm text-neutral-400">{detail.value}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <LayoutTemplate size={20} className="text-blue-500"/> Dokumentasi
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.images.map((img: string, idx: number) => (
                    <div key={idx} className="rounded-xl overflow-hidden border border-neutral-800 group cursor-pointer">
                       <img 
                         src={encodeURI(img)} 
                         alt={`Doc ${idx}`} 
                         onError={(e: any) => e.target.src = 'https://placehold.co/400x300/1e293b/white?text=Documentation'}
                         className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                       />
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <GlassCard className="!p-6">
                <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">Teknologi / Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool: string) => (
                    <span key={tool} className="px-3 py-1.5 bg-neutral-800 text-neutral-200 text-sm rounded-lg border border-neutral-700">
                      {tool}
                    </span>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="!p-6">
                <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">Kompetensi</h4>
                <ul className="space-y-2">
                  {project.competencies.map((comp: string) => (
                    <li key={comp} className="flex items-start gap-2 text-sm text-neutral-300">
                      <ShieldCheck size={16} className="text-blue-500 mt-0.5 shrink-0" />
                      {comp}
                    </li>
                  ))}
                </ul>
              </GlassCard>

              <div className="p-6 bg-blue-900/20 rounded-3xl border border-blue-800/30">
                <h4 className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-2">Status</h4>
                <p className="text-white font-medium">{project.status}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Tentang', 'Keahlian', 'Pengalaman', 'Proyek', 'Sertifikat'];

  return (
    <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={`flex items-center justify-between mx-auto max-w-6xl rounded-full px-6 py-3 transition-all duration-300 ${scrolled ? 'bg-neutral-900/70 backdrop-blur-lg border border-neutral-800 shadow-sm' : 'bg-transparent'}`}>
          
          <a href="#" className="text-xl font-bold tracking-tighter text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">ACP</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a href="#kontak" className="hidden md:flex items-center gap-2 px-5 py-2 bg-white text-neutral-900 text-sm font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-white/10">
              Hubungi Saya
            </a>
          </div>

        </div>
      </div>
    </header>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-6xl mx-auto">
          
          <motion.div 
            style={{ y, opacity }}
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Available for Work
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight"
            >
              Hai, saya <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                {DATA.profile.name}
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-neutral-300 mb-10 max-w-lg"
            >
              {DATA.profile.role}. Mengkhususkan diri dalam Power System Analysis dan Automasi Industri berbasis data.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              {/* Tombol Lihat Proyek: Dibuat putih agar menonjol di background hitam */}
              <a href="#proyek" className="px-8 py-4 bg-white text-neutral-900 font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-white/10">
                Lihat Proyek <ChevronRight size={18} />
              </a>
              
              {/* Tombol Download CV: Dibuat gelap dengan garis tepi agar elegan */}
              <a 
                href="/CV.pdf" 
                download="CV_Alvin_Christofer_Pardede.pdf" 
                className="px-8 py-4 bg-neutral-900 text-white border border-neutral-700 font-semibold rounded-full hover:bg-neutral-800 transition-colors flex items-center gap-2"
              >
                Download CV <Download size={18} />
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}
            className="w-full lg:w-1/2 flex justify-center relative"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-400 blur-2xl opacity-20 animate-pulse" />
              <img 
                src={encodeURI(DATA.profile.photo)} 
                alt={DATA.profile.name} 
                className="relative w-full h-full object-cover rounded-[2rem] shadow-2xl"
                onError={(e: any) => e.target.src = 'https://placehold.co/400x400/1e293b/white?text=Profile'}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const InfiniteMarquee = () => {
  const keywords = ["Power System Analysis", "Industrial Automation", "PLC Programming", "ETAP", "Python", "Problem Solving", "Leadership", "Continuous Learning", "HMI Design", "Short Circuit Analysis"];
  
  return (
    <div className="w-full bg-blue-600 dark:bg-blue-900 text-white py-4 overflow-hidden flex items-center whitespace-nowrap">
      <motion.div 
        animate={{ x: [0, -1035] }} 
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="flex items-center gap-8 text-sm md:text-base font-medium tracking-widest uppercase"
      >
        {[...keywords, ...keywords, ...keywords].map((word, i) => (
          <span key={i} className="flex items-center gap-8">
            {word} <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const About = () => (
  <section id="tentang" className="py-24 relative">
    <div className="container mx-auto px-6 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <SectionHeading subtitle="Ringkasan Profesional & Pendidikan">Tentang Saya</SectionHeading>
        </div>
        
        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="lg:col-span-7 space-y-10"
        >
          <motion.p variants={fadeInUp} className="text-lg leading-relaxed text-neutral-300">
            {DATA.profile.summary}
          </motion.p>
          
          <motion.div variants={fadeInUp} className="space-y-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <GraduationCap className="text-blue-500" /> Pendidikan
            </h3>
            <div className="space-y-6">
              {DATA.education.map(edu => (
                <div key={edu.id} className="relative pl-6 border-l-2 border-neutral-700">
                  <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5 ring-4 ring-[#0a0a0a]" />
                  <h4 className="text-lg font-bold text-white">{edu.institution}</h4>
                  <p className="text-blue-400 font-medium">{edu.degree}</p>
                  {edu.period && <p className="text-sm text-neutral-400 mt-1">{edu.period}</p>}
                  {edu.gpa && <p className="text-sm font-semibold text-neutral-300 mt-2">IPK: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Skills = () => (
  <section id="keahlian" className="py-24">
    <div className="container mx-auto px-6 max-w-6xl">
      <SectionHeading subtitle="Kompetensi teknis dan perangkat lunak yang dikuasai">Keahlian</SectionHeading>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <GlassCard className="h-full border-t-4 border-t-blue-500">
            <h3 className="text-xl font-bold mb-6 text-white">Technical Skills</h3>
            <ul className="space-y-5">
              {DATA.skills.technical.map((skill, i) => (
                <li key={i} className="group">
                  <div className="flex items-center gap-3 text-white font-medium mb-1">
                    <span className="p-2 bg-blue-900/30 rounded-lg text-blue-400 group-hover:scale-110 transition-transform">{skill.icon}</span>
                    {skill.name}
                  </div>
                  <p className="text-sm text-neutral-400 pl-11">{skill.desc}</p>
                </li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>

        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <GlassCard className="h-full border-t-4 border-t-indigo-500">
            <h3 className="text-xl font-bold mb-6 text-white">Software & Tools</h3>
            <div className="flex flex-wrap gap-3">
              {DATA.skills.software.map((skill, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 bg-neutral-800 rounded-xl border border-neutral-700 text-sm font-medium text-neutral-300 hover:border-indigo-500 transition-colors">
                  {skill.icon} {skill.name}
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <GlassCard className="h-full border-t-4 border-t-purple-500">
            <h3 className="text-xl font-bold mb-6 text-white">Soft Skills</h3>
            <ul className="space-y-3">
              {DATA.skills.soft.map((skill, i) => (
                <li key={i} className="flex items-center gap-3 text-neutral-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                  {skill}
                </li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  </section>
);

const Experience = () => (
  <section id="pengalaman" className="py-24">
    <div className="container mx-auto px-6 max-w-4xl">
      <SectionHeading subtitle="Rekam jejak profesional">Pengalaman Kerja</SectionHeading>
      
      <div className="space-y-12">
        {DATA.experience.map((exp, index) => (
          <motion.div 
            key={exp.id}
            variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.1 }}
            className="relative pl-8 md:pl-0"
          >
            <div className="md:grid md:grid-cols-5 md:gap-8 items-start group">
              <div className="hidden md:block col-span-1 pt-1 text-right">
                <span className="text-sm font-bold text-neutral-400 group-hover:text-blue-500 transition-colors">{exp.period}</span>
              </div>
              
              <div className="md:col-span-4 relative pb-12 md:pb-0">
                <div className="absolute left-[-2rem] top-2 h-full w-px bg-neutral-800 md:hidden" />
                <div className="absolute left-[-2.35rem] md:left-[-2.5rem] top-1.5 w-3 h-3 bg-[#0a0a0a] border-2 border-blue-500 rounded-full group-hover:bg-blue-500 transition-colors md:hidden" />
                
                <GlassCard className="!p-6 md:!p-8 group-hover:border-blue-500/30 transition-colors">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <p className="text-blue-400 font-medium text-lg">{exp.company}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <span className="inline-block px-3 py-1 bg-neutral-800 rounded-full text-xs font-semibold text-neutral-400 mb-1 md:hidden">
                        {exp.period}
                      </span>
                      <p className="text-sm text-neutral-400 flex items-center md:justify-end gap-1 mt-1">
                        <MapPin size={14}/> {exp.location}
                      </p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 text-neutral-300 text-sm md:text-base leading-relaxed">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">▹</span> {ach}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="proyek" className="py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionHeading subtitle="Showcase pekerjaan nyata dan simulasi">Proyek Unggulan</SectionHeading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DATA.projects.map((project, index) => (
            <motion.div 
              key={project.id}
              variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.1 }}
              className="group cursor-pointer h-full flex flex-col"
              onClick={() => setSelectedProject(project)}
            >
              <GlassCard className="!p-0 overflow-hidden flex-1 flex flex-col hover:-translate-y-2 transition-transform duration-300">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={encodeURI(project.thumbnail)} 
                    alt={project.title}
                    onError={(e: any) => e.target.src = 'https://placehold.co/800x400/1e293b/white?text=Project+Thumbnail'}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-black/80 backdrop-blur-md text-xs font-bold rounded-full uppercase tracking-wider text-white">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-neutral-400 line-clamp-3 mb-6 flex-1">
                    {project.summary}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-neutral-800 flex items-center justify-between">
                    <div className="flex gap-2 text-neutral-500">
                       <Terminal size={18} /> <Activity size={18} />
                    </div>
                    <span className="text-sm font-semibold text-blue-400 flex items-center gap-1">
                      Lihat Detail <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
      
      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

const Certificates = () => (
  <section id="sertifikat" className="py-24">
    <div className="container mx-auto px-6 max-w-6xl">
      <SectionHeading subtitle="Validasi kompetensi dan pembelajaran berkelanjutan">Sertifikasi</SectionHeading>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DATA.certificates.map((cert, index) => (
          <motion.div 
            key={cert.id}
            variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="h-full flex flex-col group hover:border-blue-500/50">
              <div className="mb-4 w-12 h-12 rounded-2xl bg-blue-900/30 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                {cert.name}
              </h3>
              <p className="text-neutral-400 text-sm mb-4">{cert.issuer}</p>
              
              <div className="mt-auto pt-4 border-t border-neutral-800/50 space-y-1">
                <p className="text-xs text-neutral-400 flex justify-between">
                  <span>Diterbitkan:</span> <span className="font-medium text-neutral-300">{cert.date}</span>
                </p>
                <p className="text-xs text-neutral-400 flex justify-between">
                  <span>ID:</span> <span className="font-mono text-neutral-300">{cert.credentialId}</span>
                </p>
                {cert.score && (
                  <p className="text-xs text-neutral-400 flex justify-between">
                    <span>Skor:</span> <span className="font-bold text-blue-400">{cert.score}</span>
                  </p>
                )}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Organizations = () => (
  <section id="organisasi" className="py-24">
    <div className="container mx-auto px-6 max-w-4xl">
      <SectionHeading subtitle="Keterlibatan dan kepemimpinan">Pengalaman Organisasi</SectionHeading>
      
      <div className="space-y-6">
        {DATA.organizations.map((org, index) => (
          <motion.div 
            key={org.id}
            variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-indigo-900/30 text-indigo-400 flex items-center justify-center shrink-0">
                <User size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{org.name}</h3>
                <p className="text-indigo-400 font-medium mb-1">{org.role}</p>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">{org.period}</p>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  {org.desc}
                </p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => {
  return (
    <section id="kontak" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-600 dark:bg-blue-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMCIvPgo8Y2lyY2xlIGN4PSI0IiBjeT0iNCIgcj0iMC41IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMiIvPgo8L3N2Zz4=')] opacity-30" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          Mari Terhubung
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="text-lg text-blue-100 mb-12"
        >
          Tertarik untuk berkolaborasi atau memiliki peluang menarik? Silakan hubungi saya melalui platform di bawah ini.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a href={`mailto:${DATA.profile.email}`} className="flex items-center gap-2 px-6 py-4 bg-white text-blue-900 rounded-full font-bold hover:scale-105 transition-transform shadow-xl shadow-black/10">
            <Mail size={20} /> Email Saya
          </a>
          <a href={`https://wa.me/${DATA.profile.phone}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white rounded-full font-bold hover:bg-white/10 transition-colors">
            <Phone size={20} /> WhatsApp
          </a>
          <a href={`https://www.linkedin.com/in/alvin-christofer-pardede/`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white rounded-full font-bold hover:bg-white/10 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg> 
            LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-8 bg-neutral-900 dark:bg-[#050505] border-t border-neutral-800 text-center">
    <div className="container mx-auto px-6">
      <p className="text-neutral-400 text-sm font-medium">
        &copy; {new Date().getFullYear()} {DATA.profile.name}. All rights reserved.
      </p>
      <p className="text-neutral-600 text-xs mt-2 flex items-center justify-center gap-1">
        Built with Next.js <span className="mx-1">•</span> TypeScript <span className="mx-1">•</span> Tailwind CSS
      </p>
    </div>
  </footer>
);

const Preloader = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-[#0a0a0a]"
    >
      <div className="overflow-hidden mb-4">
        <motion.h1 
          initial={{ y: 50 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl md:text-4xl font-bold tracking-widest uppercase text-neutral-900 dark:text-white"
        >
          ALVIN CHRISTOFER PARDEDE
        </motion.h1>
      </div>
      <div className="w-48 h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-full bg-blue-600 dark:bg-blue-500"
        />
      </div>
    </motion.div>
  );
};

export default function Portfolio() {
  const [loading, setLoading] = useState(true);

  // Paksa background menjadi GELAP (Dark Mode) permanen
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = '#0a0a0a';
    document.body.style.color = '#ffffff';
  }, []);

  return (
    // Class pembungkus diubah menjadi dark dan bg-[#0a0a0a]
    <div className="min-h-screen font-sans selection:bg-blue-500/30 dark bg-[#0a0a0a] text-white">
      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 5px; }
      `}} />
      
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Navbar /> 
          <main>
            <Hero />
            <InfiniteMarquee />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Certificates />
            <Organizations />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
  );
}