export default function TermsOfService() {
  return (
    <div className="py-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-lg text-brand-black/80 space-y-6">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-brand-black mt-10 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing or using our website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.</p>
          
          <h2 className="text-2xl font-bold text-brand-black mt-10 mb-4">2. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
          
          <h2 className="text-2xl font-bold text-brand-black mt-10 mb-4">3. Disclaimer</h2>
          <p>The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          
          <h2 className="text-2xl font-bold text-brand-black mt-10 mb-4">4. Limitations</h2>
          <p>In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.</p>
          
          <h2 className="text-2xl font-bold text-brand-black mt-10 mb-4">5. Revisions and Errata</h2>
          <p>The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete or current.</p>
          
          <h2 className="text-2xl font-bold text-brand-black mt-10 mb-4">6. Governing Law</h2>
          <p>These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
        </div>
      </div>
    </div>
  );
}
