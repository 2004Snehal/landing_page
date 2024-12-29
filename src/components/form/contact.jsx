import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Validate the form fields
  const validateForm = () => {
    const newErrors = {};

    // Check if name, email, and message are provided
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    if (!formData.message) newErrors.message = 'Message is required.';

    // If message is provided, check its length
    else if (formData.message.length < 10)
      newErrors.message = 'Message should be at least 10 characters long.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form before submitting
    if (validateForm()) {
      console.log('Form Submitted:', formData);
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-medium">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-lg font-medium">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows="4"
            className="w-full p-2 border rounded-lg"
            required
          />
          {errors.message && <p className="text-red-600 text-sm">{errors.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
