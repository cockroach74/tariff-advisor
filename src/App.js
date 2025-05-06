import { useState } from 'react';

function App() {
  const [form, setForm] = useState({
    users: '',
    remoteOnly: 'no',
    afterHours: 'no',
    priority: 'no',
    contract: 'no',
    organization: 'business',
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

    if (
      form.organization.toLowerCase().includes('municipality') ||
      form.organization.toLowerCase().includes('ngo')
    ) {
      category = 'Municipal / NGO';
    }

    const baseRate =
      form.remoteOnly === 'yes'
        ? 'CHF 80–110/hr (Remote Only)'
        : 'CHF 120–150/hr (On-Site + Remote)';
    const afterHours =
      form.afterHours === 'yes'
        ? 'After-Hours: CHF 160–220/hr'
        : 'Standard Hours Only';
    const contract =
      form.contract === 'yes'
        ? 'Managed Plan (CHF 60–140/month per user)'
        : 'Ad-Hoc or Prepaid Hour Packs';
    const priority =
      form.priority === 'yes'
        ? 'Includes SLA with <4hr response time'
        : 'Standard Response Time (Same or Next Day)';

    setResult({ category, baseRate, afterHours, contract, priority });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>IT Support Tariff Advisor</h1>

      <label>
        Number of users:
        <input
          type="number"
          name="users"
          value={form.users}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Remote support only?
        <select name="remoteOnly" value={form.remoteOnly} onChange={handleChange}>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </label>
      <br />

      <label>
        Need support after business hours?
        <select name="afterHours" value={form.afterHours} onChange={handleChange}>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </label>
      <br />

      <label>
        Need priority response (&lt;4h)?
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </label>
      <br />

      <label>
        Prefer fixed monthly contract?
        <select name="contract" value={form.contract} onChange={handleChange}>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </label>
      <br />

      <label>
        Organization type:
        <input
          type="text"
          name="organization"
          value={form.organization}
          onChange={handleChange}
        />
      </label>
      <br />

      <button onClick={calculateTariff} style={{ marginTop: '1rem' }}>
        Get Recommendation
      </button>

      {result && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Recommended Tariff</h2>
          <p><strong>Client Category:</strong> {result.category}</p>
          <p><strong>Support Type:</strong> {result.baseRate}</p>
          <p><strong>After-Hours:</strong> {result.afterHours}</p>
          <p><strong>Billing:</strong> {result.contract}</p>
          <p><strong>Priority:</strong> {result.priority}</p>
        </div>
      )}
    </div>
  );
}

export default App;
