import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Building2,
  FileText,
  CheckCircle2,
  XCircle,
  Loader2,
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  education: string;
  dept: string;
  req_exp: string;
}

interface SubmitStatus {
  type: 'success' | 'error' | '';
  message: string;
}

const InternshipForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    education: '',
    dept: '',
    req_exp: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({ type: '', message: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!formData.education) newErrors.education = 'Education level is required.';
    if (!formData.dept) newErrors.dept = 'Department is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/intern/intern`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitStatus({ type: 'error', message: data.message || 'Failed to submit form' });
      } else if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Form submitted successfully!' });

      }


      setFormData({
        name: '',
        email: '',
        phone: '',
        education: '',
        dept: '',
        req_exp: '',
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'There was an error submitting your application. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="px-8 py-6">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-8 flex items-center justify-center gap-2">
            <GraduationCap className="h-8 w-8" />
            Join Our Team
          </h2>

          {submitStatus.message && (
            <div
              className={`p-4 rounded-md flex items-center gap-2 ${submitStatus.type === 'error'
                  ? 'bg-red-50 text-red-700'
                  : 'bg-green-50 text-green-700'
                }`}
            >
              {submitStatus.type === 'error' ? (
                <XCircle className="h-5 w-5" />
              ) : (
                <CheckCircle2 className="h-5 w-5" />
              )}
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { label: 'Full Name', name: 'name', icon: User, type: 'text' },
              { label: 'Email Address', name: 'email', icon: Mail, type: 'email' },
              { label: 'Phone Number', name: 'phone', icon: Phone, type: 'tel' },
            ].map(({ label, name, icon: Icon, type }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {label} *
                </label>
                <input
                  type={type}
                  name={name}
                  value={formData[name as keyof FormData]}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[name as keyof FormData] ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors[name as keyof FormData] && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors[name as keyof FormData]}
                  </p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Education Level *
              </label>
              <select
                name="education"
                value={formData.education}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.education ? 'border-red-500' : 'border-gray-300'
                  }`}
              >
                <option value="">Select Education Level</option>
                <option value="High School">High School</option>
                <option value="Bachelor's">Bachelor's Degree</option>
                <option value="Master's">Master's Degree</option>
                <option value="PhD">PhD</option>
              </select>
              {errors.education && (
                <p className="text-sm text-red-600 mt-1">{errors.education}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Department *
              </label>
              <select
                name="dept"
                value={formData.dept}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.dept ? 'border-red-500' : 'border-gray-300'
                  }`}
              >
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Design">Design</option>
                <option value="Business Development">Business Development</option>
              </select>
              {errors.dept && <p className="text-sm text-red-600 mt-1">{errors.dept}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Relevant Experience
              </label>
              <textarea
                name="req_exp"
                value={formData.req_exp}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InternshipForm