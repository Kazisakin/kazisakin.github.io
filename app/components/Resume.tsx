'use client';
import React from 'react';

export default function Resume() {
  const accentColor = '#60A5FA';

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10 print:bg-white print:py-0">
      {/* Download Button - Hidden during print */}
      <div className="max-w-[900px] mx-auto mb-6 flex justify-end print:hidden">
        <button 
          onClick={handleDownload}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-600 transition shadow-lg flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
          </svg>
          Download PDF
        </button>
      </div>

      {/* RESUME BODY */}
      <div className="max-w-[900px] mx-auto bg-slate-900 p-16 shadow-2xl print:shadow-none print:p-0 print:bg-white" 
           style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', lineHeight: '1.6' }}>
        
        {/* HEADER */}
        <header className="mb-10 pb-6 border-b border-slate-700 print:border-slate-300">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-6xl font-extrabold tracking-tight mb-3 text-white print:text-slate-900" 
                  style={{ letterSpacing: '-0.03em' }}>
                Kazi Mostofa Sakin
              </h1>
              <p className="text-[15px] font-medium text-slate-300 print:text-slate-600 max-w-2xl leading-relaxed">
                3rd-year Computer Science student with hands-on experience in full-stack development, automation, and machine learning
              </p>
            </div>
            <div className="text-right text-[12px] space-y-1 pt-3 text-slate-400 print:text-slate-500 font-medium">
              <div>linkedin.com/in/kazisakin</div>
              <div>github.com/Kazisakin</div>
              <div>kazisakin.dev</div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-10">
          {/* LEFT COLUMN */}
          <div className="col-span-8 space-y-9">
            
            {/* EXPERIENCE */}
            <section>
              <h2 className="text-[14px] font-bold uppercase tracking-[0.15em] mb-5 flex items-center gap-2" 
                  style={{ color: accentColor }}>
                <span className="w-8 h-[2px] bg-blue-500"></span>
                Work Experience
              </h2>
              
              {/* Job 1 */}
              <div className="mb-7">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-bold text-white print:text-slate-900 text-[15px]">Manager – Customer Escalation Team</span>
                  <span className="text-slate-400 print:text-slate-500 text-[11px] font-semibold uppercase tracking-wide">
                    May — July 2025
                  </span>
                </div>
                <div className="text-slate-400 print:text-slate-600 text-[12px] mb-2.5 italic">
                  IO Solutions, Fredericton, NB · Part-time
                </div>
                <ul className="space-y-2 text-slate-300 print:text-slate-600">
                  <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-blue-400 print:before:text-blue-600 before:font-bold">
                    Managed 5-10 daily escalations for Rogers/Fido covering network, billing, and device issues, resolving 90% on first contact
                  </li>
                  <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-blue-400 print:before:text-blue-600 before:font-bold">
                    Coached agents on escalation protocols and effective communication, boosting team efficiency
                  </li>
                  <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-blue-400 print:before:text-blue-600 before:font-bold">
                    Analyzed telecom datasets with 1,000+ records to identify fault patterns, improving resolution strategies
                  </li>
                </ul>
              </div>

              {/* Job 2 */}
              <div className="mb-7">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-bold text-white print:text-slate-900 text-[15px]">Customer Care Specialist</span>
                  <span className="text-slate-400 print:text-slate-500 text-[11px] font-semibold uppercase tracking-wide">
                    May 2023 — Apr 2025
                  </span>
                </div>
                <div className="text-slate-400 print:text-slate-600 text-[12px] mb-2.5 italic">
                  IO Solutions, Fredericton, NB · Part-time
                </div>
                <ul className="space-y-2 text-slate-300 print:text-slate-600">
                  <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-blue-400 print:before:text-blue-600 before:font-bold">
                    Supported 20+ daily customer inquiries, delivering resolutions with empathetic communication
                  </li>
                  <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-blue-400 print:before:text-blue-600 before:font-bold">
                    Achieved highest sales performance in the team for two consecutive periods by identifying and converting wireless plan upgrades and service add-ons
                  </li>
                </ul>
              </div>
            </section>

            {/* PROJECTS */}
            <section>
              <h2 className="text-[14px] font-bold uppercase tracking-[0.15em] mb-5 flex items-center gap-2" 
                  style={{ color: accentColor }}>
                <span className="w-8 h-[2px] bg-blue-500"></span>
                Major Projects
              </h2>

              {/* Project 1 */}
              <div className="mb-6">
                <div className="mb-1.5">
                  <h3 className="font-bold text-white print:text-slate-900 text-[14px] inline">Wildfire Detection System</h3>
                  <span className="text-slate-400 print:text-slate-500 text-[11px] ml-2">
                    Java · JavaFX · Real-time Visualization · GitHub
                  </span>
                </div>
                <div className="text-slate-400 print:text-slate-600 text-[11px] italic mb-2">
                  Technical Lead, Academic Project
                </div>
                <ul className="space-y-1.5 text-slate-300 print:text-slate-600">
                  <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-blue-400 print:before:text-blue-600 before:font-bold">
                    Created 16×16 map UI to visualize weather metrics using JavaFX with lat/lon grid
                  </li>
                  <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-blue-400 print:before:text-blue-600 before:font-bold">
                    Implemented buffered Data Loader with linear filtering and Time Slider for 24-hour forecasts, validated using JUnit
                  </li>
                </ul>
              </div>

              {/* Project 2 */}
              <div className="mb-6">
                <div className="mb-1.5">
                  <h3 className="font-bold text-white print:text-slate-900 text-[14px] inline">SMS Spam Classifier</h3>
                  <span className="text-slate-400 print:text-slate-500 text-[11px] ml-2">
                    Machine Learning · Pandas · Docker · Render.com · Live
                  </span>
                </div>
                <ul className="space-y-1.5 text-slate-300 print:text-slate-600">
                  <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-blue-400 print:before:text-blue-600 before:font-bold">
                    Developed SMS classifier for 11,000+ messages using regex-based preprocessing, achieving F1-score of 0.94
                  </li>
                  <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-blue-400 print:before:text-blue-600 before:font-bold">
                    Deployed containerized web app using Docker and Render.com with responsive frontend for real-time detection
                  </li>
                </ul>
              </div>

              {/* Project 3 */}
              <div className="mb-6">
                <div className="mb-1.5">
                  <h3 className="font-bold text-white print:text-slate-900 text-[14px] inline">Case Management System</h3>
                  <span className="text-slate-400 print:text-slate-500 text-[11px] ml-2">
                    Next.js · OpenAI API · PostgreSQL · GitHub · Live
                  </span>
                </div>
                <ul className="space-y-1.5 text-slate-300 print:text-slate-600">
                  <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-blue-400 print:before:text-blue-600 before:font-bold">
                    Built automated system using OpenAI API to categorize user problems with real-time status updates
                  </li>
                  <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-blue-400 print:before:text-blue-600 before:font-bold">
                    Designed real-time Case Statistics Dashboard visualizing total, resolved, and pending cases with 5 category breakdowns
                  </li>
                </ul>
              </div>
            </section>

            {/* LEADERSHIP */}
            <section>
              <h2 className="text-[14px] font-bold uppercase tracking-[0.15em] mb-5 flex items-center gap-2" 
                  style={{ color: accentColor }}>
                <span className="w-8 h-[2px] bg-blue-500"></span>
                Leadership & Volunteering
              </h2>

              <div className="mb-5">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-bold text-white print:text-slate-900 text-[14px]">Web Developer · ROBOFLIGHT</span>
                  <span className="text-slate-400 print:text-slate-500 text-[11px] font-semibold uppercase tracking-wide">
                    Dec 2023 — Dec 2024
                  </span>
                </div>
                <ul className="space-y-1.5 text-slate-300 print:text-slate-600 mt-2">
                  <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-blue-400 print:before:text-blue-600 before:font-bold">
                    Created responsive WordPress website using custom PHP plugins, themes, and CSS
                  </li>
                  <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-blue-400 print:before:text-blue-600 before:font-bold">
                    Redeveloped with Next.js using React components and server-side rendering with 5+ API endpoints
                  </li>
                </ul>
              </div>

              <div className="mb-5">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-bold text-white print:text-slate-900 text-[14px]">Webmaster · Bangladesh Student Society UNB</span>
                  <span className="text-slate-400 print:text-slate-500 text-[11px] font-semibold uppercase tracking-wide">
                    Dec 2023 — Oct 2024
                  </span>
                </div>
                <ul className="space-y-1.5 text-slate-300 print:text-slate-600 mt-2">
                  <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-blue-400 print:before:text-blue-600 before:font-bold">
                    Developed secure voting system by customizing WordPress with PHP/MySQL, enabling 100+ members to vote
                  </li>
                  <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-blue-400 print:before:text-blue-600 before:font-bold">
                    Implemented 2FA email validation with PHP hooks, applying 30-minute token limit after failed attempts
                  </li>
                </ul>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-4 space-y-8">
            
            {/* SKILLS */}
            <section>
              <h2 className="text-[14px] font-bold uppercase tracking-[0.15em] mb-4 flex items-center gap-2" 
                  style={{ color: accentColor }}>
                <span className="w-6 h-[2px] bg-blue-500"></span>
                Skills
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-white print:text-slate-900 text-[12px] mb-1.5">Languages</h3>
                  <p className="text-slate-300 print:text-slate-600 text-[11px] leading-relaxed">
                    Java, JavaScript, Python, C, PHP, SQL
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-white print:text-slate-900 text-[12px] mb-1.5">Frameworks</h3>
                  <p className="text-slate-300 print:text-slate-600 text-[11px] leading-relaxed">
                    React, Node.js, Next.js, Flask, Django, FastAPI
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-white print:text-slate-900 text-[12px] mb-1.5">Cloud & DevOps</h3>
                  <p className="text-slate-300 print:text-slate-600 text-[11px] leading-relaxed">
                    Docker, Jenkins, Git, GitHub, Render, Vercel, Linux CLI
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-white print:text-slate-900 text-[12px] mb-1.5">Testing</h3>
                  <p className="text-slate-300 print:text-slate-600 text-[11px] leading-relaxed">
                    Selenium WebDriver, TestNG, JUnit, Black Box Testing
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-white print:text-slate-900 text-[12px] mb-1.5">Tools</h3>
                  <p className="text-slate-300 print:text-slate-600 text-[11px] leading-relaxed">
                    Eclipse, VS Code, Maven, Jira, Trello, Figma
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-white print:text-slate-900 text-[12px] mb-1.5">Design</h3>
                  <p className="text-slate-300 print:text-slate-600 text-[11px] leading-relaxed">
                    Figma, Adobe XD, Photoshop, Illustrator, Premiere Pro
                  </p>
                </div>
              </div>
            </section>

            {/* EDUCATION */}
            <section>
              <h2 className="text-[14px] font-bold uppercase tracking-[0.15em] mb-4 flex items-center gap-2" 
                  style={{ color: accentColor }}>
                <span className="w-6 h-[2px] bg-blue-500"></span>
                Education
              </h2>
              <div>
                <div className="font-bold text-white print:text-slate-900 text-[13px]">University of New Brunswick</div>
                <div className="text-slate-300 print:text-slate-600 text-[11px] mt-1">Bachelor of Computer Science</div>
                <div className="text-slate-400 print:text-slate-500 text-[10px] mt-0.5">Jan 2023 – Dec 2026</div>
                <div className="text-slate-400 print:text-slate-600 text-[10px] mt-2 leading-relaxed">
                  Fredericton, NB
                </div>
              </div>
            </section>

            {/* CERTIFICATIONS */}
            <section>
              <h2 className="text-[14px] font-bold uppercase tracking-[0.15em] mb-4 flex items-center gap-2" 
                  style={{ color: accentColor }}>
                <span className="w-6 h-[2px] bg-blue-500"></span>
                Certifications
              </h2>
              <div className="space-y-3">
                <div>
                  <div className="font-bold text-white print:text-slate-900 text-[11px]">R Programming Boot Camp</div>
                  <div className="text-slate-400 print:text-slate-600 text-[10px]">Bangladesh University of Professional Economics Club, 2023</div>
                </div>
                <div>
                  <div className="font-bold text-white print:text-slate-900 text-[11px]">Advanced WordPress Development</div>
                  <div className="text-slate-400 print:text-slate-600 text-[10px]">Softech-IT, 2018</div>
                </div>
              </div>
            </section>

            {/* SOFT SKILLS */}
            <section>
              <h2 className="text-[14px] font-bold uppercase tracking-[0.15em] mb-4 flex items-center gap-2" 
                  style={{ color: accentColor }}>
                <span className="w-6 h-[2px] bg-blue-500"></span>
                Soft Skills
              </h2>
              <p className="text-slate-300 print:text-slate-600 text-[11px] leading-relaxed">
                Strong attention to detail, quick learner, analytical thinking, effective communication, proactive problem-solving
              </p>
            </section>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .bg-slate-950 {
            background: white !important;
            padding: 0 !important;
          }
          .bg-slate-900 {
            background: white !important;
            padding: 40px !important;
            box-shadow: none !important;
            margin: 0 !important;
          }
          .text-white {
            color: #0f172a !important;
          }
          .text-slate-300 {
            color: #475569 !important;
          }
          .text-slate-400 {
            color: #64748b !important;
          }
          .border-slate-700 {
            border-color: #cbd5e1 !important;
          }
          .before\\:text-blue-400::before {
            color: #2563eb !important;
          }
          @page {
            margin: 0.5in;
          }
        }
      `}</style>
    </div>
  );
}