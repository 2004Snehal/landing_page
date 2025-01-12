const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-xl font-bold text-blue-600 mb-4">Hodos</div>
            <p className="text-gray-600">Simplifying travel expense management.</p>
          </div>
          {/* Add more footer content as needed */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;