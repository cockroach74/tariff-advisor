import { useState } from 'react';

export default function TariffAdvisor() {
  const [form, setForm] = useState({
    users: '',
    remoteOnly: 'no',
    afterHours: 'no',
    priority: 'no',
    contract: 'no',
    organization: 'business'
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const calculateTariff = () => {
    const users = parseInt(form.users);
    let category = 'SMB';
    if (users <= 10) category = 'SOHO';
    else if (users <= 50) category = 'SMB';
    else if (users <= 250) category = 'Mid-Market';
    else category = 'Enterprise';
    if (form.organization.includes('municipality') || form.organization.includes('ngo')) category = 'Municipal / NGO';

    const baseRate = form.remoteOnly === 'yes' ? 'CHF 80–110/hr (Remote Only)' : 'CHF 120–150/hr (On-Site + Remote)';
    const afterHours = form.afterHours === 'yes' ? 'After-Hours: CHF 160–220/hr' : 'Standard Hours Only';
    const contract = form.contract === 'yes' ? 'Managed Plan (CHF 60–140/month per user)' : 'Ad-Hoc or Prepaid Hour Packs';
    const priority = form.priority === 'yes' ? 'Includes SLA with <4hr response time' : 'Standard Response Time (Same or Next Day)';

    setResult({ category, baseRate, afterHours, contract, priority });
  };

  const RadioGroup = ({ name, value, onChange, options }) => (
    <div className="flex gap-4 mt-1">
      {options.map((option) => (
        <label key={option.value} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span className="text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-md space-y-6">
        <div className="text-center">
          <img
            src={process.env.PUBLIC_URL + '/InterHyve_Logo.jpg'}
            alt="InterHyve Systems Logo"
            className="mx-auto mb-4 max-w-[300px] h-auto"
          />
          <h1 className="text-3xl font-bold text-gray-800">IT Support Tariff Advisor</h1>
          <p className="text-gray-600">Find the right plan based on your needs</p>
        </div>

        <div className="border rounded-lg shadow-sm">
          <div className="space-y-4 p-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Users</label>
              <input
                name="users"
                type="number"
                value={form.users}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter number of users"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Remote Support Only?</label>
              <RadioGroup
                name="remoteOnly"
                value={form.remoteOnly}
                onChange={(val) => setForm({ ...form, remoteOnly: val })}
                options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Need After-Hours Support?</label>
              <RadioGroup
                name="afterHours"
                value={form.afterHours}
                onChange={(val) => setForm({ ...form, afterHours: val })}
                options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Need Priority (&lt;4h) Response?</label>
              <RadioGroup
                name="priority"
                value={form.priority}
                onChange={(val) => setForm({ ...form, priority: val })}
                options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prefer a Fixed Contract?</label>
              <RadioGroup
                name="contract"
                value={form.contract}
                onChange={(val) => setForm({ ...form, contract: val })}
                options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization Type</label>
              <input
                name="organization"
                value={form.organization}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., business, municipality, ngo"
              />
            </div>

            <button
              onClick={calculateTariff}
              className="w-full mt-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Get Recommendation
            </button>

            {result && (
              <div className="mt-6 p-4 border rounded-lg bg-gray-50 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">Recommended Tariff</h3>
                <p><strong>Client Category:</strong> {result.category}</p>
                <p><strong>Support Type:</strong> {result.baseRate}</p>
                <p><strong>After-Hours Needs:</strong> {result.afterHours}</p>
                <p><strong>Preferred Billing:</strong> {result.contract}</p>
                <p><strong>Priority Support:</strong> {result.priority}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
