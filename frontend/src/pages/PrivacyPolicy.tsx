export default function PrivacyPolicy() {
  return (
    <div className="py-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-lg text-brand-black/80 space-y-6">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-brand-black mt-10 mb-4">1. Information We Collect</h2>
          <p>We collect information that you provide directly to us, including when you fill out a form, request a consultation, or communicate with us. This may include your name, email address, phone number, and company details.</p>
          
          <h2 className="text-2xl font-bold text-brand-black mt-10 mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services, to communicate with you, to send you marketing communications (with your consent), and to comply with legal obligations.</p>
          
          <h2 className="text-2xl font-bold text-brand-black mt-10 mb-4">3. Information Sharing</h2>
          <p>We do not share your personal information with third parties except as described in this privacy policy or with your consent. We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</p>
          
          <h2 className="text-2xl font-bold text-brand-black mt-10 mb-4">4. Security</h2>
          <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
          
          <h2 className="text-2xl font-bold text-brand-black mt-10 mb-4">5. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at suyashmarketing365@gmail.com.</p>
        </div>
      </div>
    </div>
  );
}
