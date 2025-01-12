const Features = () => {
  const features = [
    {
      title: "Real-time Tracking",
      description: "Monitor expenses as they happen with our intuitive website"
    },
    {
      title: "Smart Automation",
      description: "Automatic receipt scanning and expense categorization"
    },
    {
      title: "Smart Filing",
      description: "Effortlessly edit your invoices anytime, anywhere, and share them instantly with just one click. Simplify your workflow and stay organized like never before!"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Hodos</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;