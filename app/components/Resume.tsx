'use client';
import React, { useState } from 'react';

export default function Resume() {
  const accentColor = '#60A5FA';
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const jsPDF = (await import('jspdf')).default;
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 12;
      const leftColWidth = 120;
      const leftContentWidth = leftColWidth - margin;
      const rightColX = leftColWidth + 5;
      const rightColWidth = pageWidth - rightColX - margin;

      let yPos = 15;

      // Header
      pdf.setFontSize(26);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text('Kazi Mostofa Sakin', margin, yPos);
      yPos += 8;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const desc1 = pdf.splitTextToSize('4th-year Computer Science student with hands-on experience in full-stack development, automation, and machine learning', leftContentWidth + 20);
      pdf.text(desc1, margin, yPos);
      yPos += desc1.length * 4;

      yPos += 4;
      pdf.setFontSize(9);
      pdf.setTextColor(80, 80, 80);
      const contact = 'linkedin.com/in/kazisakin  |  github.com/Kazisakin  |  kazisakin.dev';
      pdf.text(contact, pageWidth - margin - pdf.getTextWidth(contact), yPos);

      yPos += 6;
      pdf.setLineWidth(0.3);
      pdf.setDrawColor(180, 180, 180);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 8;

      // Helper functions
      const addSectionTitle = (title: string) => {
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(96, 165, 250);
        pdf.text(title.toUpperCase(), margin, yPos);
        yPos += 6;
      };

      const addBullet = (text: string, width: number) => {
        const lines = pdf.splitTextToSize('• ' + text, width - 8);
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(0, 0, 0);
        pdf.text(lines, margin + 4, yPos);
        yPos += lines.length * 3.5;
      };

      // WORK EXPERIENCE
      addSectionTitle('Work Experience');

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text('Manager – Customer Escalation Team', margin, yPos);
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text('May — July 2025', leftColWidth - 30, yPos);
      yPos += 4;

      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'italic');
      pdf.text('IO Solutions, Fredericton, NB', margin, yPos);
      yPos += 5;

      ['Managed 5-10 daily escalations for Rogers/Fido covering network, billing, and device issues, resolving 90% on first contact',
       'Coached agents on escalation protocols and effective communication, boosting team efficiency',
       'Analyzed telecom datasets with 1,000+ records to identify fault patterns, improving resolution strategies'
      ].forEach(item => addBullet(item, leftContentWidth));

      yPos += 2;

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text('Customer Care Specialist', margin, yPos);
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text('May 2023 — Apr 2025', leftColWidth - 30, yPos);
      yPos += 4;

      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'italic');
      pdf.setTextColor(80, 80, 80);
      pdf.text('IO Solutions, Fredericton, NB', margin, yPos);
      yPos += 5;

      ['Supported 20+ daily customer inquiries, delivering resolutions with empathetic communication',
       'Achieved highest sales performance in the team for two consecutive periods'
      ].forEach(item => addBullet(item, leftContentWidth));

      yPos += 3;

      // MAJOR PROJECTS
      addSectionTitle('Major Projects');

      const addProject = (title: string, tech: string, bullets: string[]) => {
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(0, 0, 0);
        pdf.text(title, margin, yPos);
        yPos += 4;
        pdf.setFontSize(8);
        pdf.setTextColor(100, 100, 100);
        pdf.setFont('helvetica', 'normal');
        pdf.text(tech, margin, yPos);
        yPos += 4;
        bullets.forEach(item => addBullet(item, leftContentWidth));
        yPos += 1.5;
      };

      addProject('Wildfire Detection System', 'Java · JavaFX · JUnit', [
        'Created 16×16 map UI to visualize weather metrics using JavaFX with lat/lon grid',
        'Implemented buffered Data Loader with linear filtering and Time Slider for 24-hour forecasts'
      ]);

      addProject('SMS Spam Classifier', 'Python · Pandas · Docker · Flask', [
        'Developed SMS classifier for 11,000+ messages using regex preprocessing, achieving F1-score of 0.94',
        'Deployed containerized web app using Docker and Render.com with responsive frontend'
      ]);

      addProject('Case Management System', 'Next.js · OpenAI API · PostgreSQL', [
        'Built automated system using OpenAI API to categorize user problems with real-time status updates',
        'Designed real-time Case Statistics Dashboard visualizing cases with 5 category breakdowns'
      ]);

      yPos += 2;

      // LEADERSHIP
      addSectionTitle('Leadership & Volunteering');

      const addLeadership = (title: string, date: string, bullets: string[]) => {
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(0, 0, 0);
        pdf.text(title, margin, yPos);
        pdf.setFontSize(8);
        pdf.setTextColor(100, 100, 100);
        pdf.text(date, leftColWidth - 30, yPos);
        yPos += 5;
        bullets.forEach(item => addBullet(item, leftContentWidth));
        yPos += 1.5;
      };

      addLeadership('Web Developer · ROBOFLIGHT', 'Dec 2023 — Dec 2024', [
        'Redeveloped platform with Next.js using React components and server-side rendering with 5+ API endpoints'
      ]);

      addLeadership('Webmaster · Bangladesh Student Society UNB', 'Dec 2023 — Oct 2024', [
        'Developed secure voting system with PHP/MySQL, enabling 100+ members to vote with 2FA validation'
      ]);

      // RIGHT COLUMN
      let rightY = 45;

      const addRightSectionTitle = (title: string) => {
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(96, 165, 250);
        pdf.text(title.toUpperCase(), rightColX, rightY);
        rightY += 6;
      };

      const addRightBlock = (label: string, content: string) => {
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(0, 0, 0);
        pdf.text(label, rightColX, rightY);
        rightY += 4;

        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9);
        const lines = pdf.splitTextToSize(content, rightColWidth);
        pdf.text(lines, rightColX, rightY);
        rightY += lines.length * 3.5 + 3;
      };

      addRightSectionTitle('Skills');

      addRightBlock('Languages', 'Java, JavaScript, Python, C, PHP, SQL');
      addRightBlock('Frameworks', 'React, Node.js, Next.js, Flask, Django, FastAPI');
      addRightBlock('Cloud & DevOps', 'Docker, Jenkins, Git, GitHub, Render, Vercel, Linux CLI');
      addRightBlock('Testing', 'Selenium WebDriver, TestNG, JUnit');
      addRightBlock('Tools', 'VS Code, Maven, Jira, Figma');
      addRightBlock('Design', 'Figma, Adobe XD, Photoshop, Illustrator, Premiere Pro');

      rightY += 2;
      addRightSectionTitle('Education');

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text('University of New Brunswick', rightColX, rightY);
      rightY += 4;
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Bachelor of Computer Science', rightColX, rightY);
      rightY += 3.5;
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Jan 2023 – Dec 2026', rightColX, rightY);
      rightY += 3;
      pdf.text('Fredericton, NB', rightColX, rightY);
      rightY += 8;

      addRightSectionTitle('Certifications');

      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text('R Programming Boot Camp', rightColX, rightY);
      rightY += 3.5;
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 100, 100);
      const cert1 = pdf.splitTextToSize('Bangladesh University of Professional Economics Club, 2023', rightColWidth);
      pdf.text(cert1, rightColX, rightY);
      rightY += cert1.length * 3 + 4;

      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text('Advanced WordPress Development', rightColX, rightY);
      rightY += 3.5;
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 100, 100);
      pdf.text('Softech-IT, 2018', rightColX, rightY);
      rightY += 8;

      addRightSectionTitle('Soft Skills');

      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(0, 0, 0);
      const softSkills = pdf.splitTextToSize('Strong attention to detail, quick learner, analytical thinking, effective communication, proactive problem-solving', rightColWidth);
      pdf.text(softSkills, rightColX, rightY);

      pdf.save('Kazi_Mostofa_Sakin_Resume.pdf');
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10 print:bg-white print:py-0 pt-24">
      <div className="max-w-[900px] mx-auto mb-6 flex justify-end print:hidden">
        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-600 transition shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating PDF...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
              </svg>
              Download PDF
            </>
          )}
        </button>
      </div>

      <div
        id="resume"
        className="max-w-[900px] mx-auto bg-slate-900 p-16 shadow-2xl print:shadow-none print:p-0 print:bg-white"
        style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', lineHeight: '1.6' }}
      >
        <header className="mb-10 pb-6 border-b border-slate-700 print:border-slate-300">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-6xl font-extrabold tracking-tight mb-3 text-white print:text-slate-900" style={{ letterSpacing: '-0.03em' }}>
                Kazi Mostofa Sakin
              </h1>
              <p className="text-[15px] font-medium text-slate-300 print:text-slate-600 max-w-2xl leading-relaxed">
                4th-year Computer Science student with hands-on experience in full-stack development, automation, and machine learning
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
          <div className="col-span-8 space-y-9">
            <section>
              <h2 className="text-[14px] font-bold uppercase tracking-[0.15em] mb-5 flex items-center gap-2" style={{ color: accentColor }}>
                <span className="w-8 h-[2px] bg-blue-500"></span>
                Work Experience
              </h2>

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

            <section>
              <h2 className="text-[14px] font-bold uppercase tracking-[0.15em] mb-5 flex items-center gap-2" style={{ color: accentColor }}>
                <span className="w-8 h-[2px] bg-blue-500"></span>
                Major Projects
              </h2>

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

            <section>
              <h2 className="text-[14px] font-bold uppercase tracking-[0.15em] mb-5 flex items-center gap-2" style={{ color: accentColor }}>
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

          <div className="col-span-4 space-y-8">
            <section>
              <h2 className="text-[14px] font-bold uppercase tracking-[0.15em] mb-4 flex items-center gap-2" style={{ color: accentColor }}>
                <span className="w-6 h-[2px] bg-blue-500"></span>
                Skills
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-white print:text-slate-900 text-[12px] mb-1.5">Languages</h3>
                  <p className="text-slate-300 print:text-slate-600 text-[11px] leading-relaxed">Java, JavaScript, Python, C, PHP, SQL</p>
                </div>
                <div>
                  <h3 className="font-bold text-white print:text-slate-900 text-[12px] mb-1.5">Frameworks</h3>
                  <p className="text-slate-300 print:text-slate-600 text-[11px] leading-relaxed">React, Node.js, Next.js, Flask, Django, FastAPI</p>
                </div>
                <div>
                  <h3 className="font-bold text-white print:text-slate-900 text-[12px] mb-1.5">Cloud & DevOps</h3>
                  <p className="text-slate-300 print:text-slate-600 text-[11px] leading-relaxed">Docker, Jenkins, Git, GitHub, Render, Vercel, Linux CLI</p>
                </div>
                <div>
                  <h3 className="font-bold text-white print:text-slate-900 text-[12px] mb-1.5">Testing</h3>
                  <p className="text-slate-300 print:text-slate-600 text-[11px] leading-relaxed">Selenium WebDriver, TestNG, JUnit, Black Box Testing</p>
                </div>
                <div>
                  <h3 className="font-bold text-white print:text-slate-900 text-[12px] mb-1.5">Tools</h3>
                  <p className="text-slate-300 print:text-slate-600 text-[11px] leading-relaxed">Eclipse, VS Code, Maven, Jira, Trello, Figma</p>
                </div>
                <div>
                  <h3 className="font-bold text-white print:text-slate-900 text-[12px] mb-1.5">Design</h3>
                  <p className="text-slate-300 print:text-slate-600 text-[11px] leading-relaxed">Figma, Adobe XD, Photoshop, Illustrator, Premiere Pro</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-[14px] font-bold uppercase tracking-[0.15em] mb-4 flex items-center gap-2" style={{ color: accentColor }}>
                <span className="w-6 h-[2px] bg-blue-500"></span>
                Education
              </h2>
              <div>
                <div className="font-bold text-white print:text-slate-900 text-[13px]">University of New Brunswick</div>
                <div className="text-slate-300 print:text-slate-600 text-[11px] mt-1">Bachelor of Computer Science</div>
                <div className="text-slate-400 print:text-slate-500 text-[10px] mt-0.5">Jan 2023 – Dec 2026</div>
                <div className="text-slate-400 print:text-slate-600 text-[10px] mt-2 leading-relaxed">Fredericton, NB</div>
              </div>
            </section>

            <section>
              <h2 className="text-[14px] font-bold uppercase tracking-[0.15em] mb-4 flex items-center gap-2" style={{ color: accentColor }}>
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

            <section>
              <h2 className="text-[14px] font-bold uppercase tracking-[0.15em] mb-4 flex items-center gap-2" style={{ color: accentColor }}>
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
        @page {
          size: A4;
          margin: 12mm;
        }

        @media print {
          body * {
            visibility: hidden !important;
          }

          #resume,
          #resume * {
            visibility: visible !important;
          }

          #resume {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            box-shadow: none !important;
          }

          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
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
        }
      `}</style>
    </div>
  );
}
