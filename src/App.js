import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import logo from '/mnt/data/InterHyve_Logo.jpg';

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

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-md space-y-6">
      <div className="text-center">
        <Image src={logo} alt="InterHyve Systems Logo" width={300} height={70} className="mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800">IT Support Tariff Advisor</h1>
        <p className="text-gray-600">Find the right plan based on your needs</p>
      </div>

      <Card>
        <CardContent className="space-y-4 p-6">
          <div>
            <Label>Number of Users</Label>
            <Input name="users" type="number" value={form.users} onChange={handleChange} />
          </div>

          <div>
            <Label>Remote Support Only?</Label>
            <RadioGroup name="remoteOnly" value={form.remoteOnly} onValueChange={(val) => setForm({ ...form, remoteOnly: val })}>
              <RadioGroupItem value="yes" label="Yes" />
              <RadioGroupItem value="no" label="No" />
            </RadioGroup>
          </div>

          <div>
            <Label>Need After-Hours Support?</Label>
            <RadioGroup name="afterHours" value={form.afterHours} onValueChange={(val) => setForm({ ...form, afterHours: val })}>
              <RadioGroupItem value="yes" label="Yes" />
              <RadioGroupItem value="no" label="No" />
            </RadioGroup>
          </div>

          <div>
            <Label>Need Priority (&lt;4h) Response?</Label>
            <RadioGroup name="priority" value={form.priority} onValueChange={(val) => setForm({ ...form, priority: val })}>
              <RadioGroupItem value="yes" label="Yes" />
              <RadioGroupItem value="no" label="No" />
            </RadioGroup>
          </div>

          <div>
            <Label>Prefer a Fixed Contract?</Label>
            <RadioGroup name="contract" value={form.contract} onValueChange={(val) => setForm({ ...form, contract: val })}>
              <RadioGroupItem value="yes" label="Yes" />
              <RadioGroupItem value="no" label="No" />
            </RadioGroup>
          </div>

          <div>
            <Label>Organization Type</Label>
            <Input name="organization" value={form.organization} onChange={handleChange} />
          </div>

          <Button onClick={calculateTariff} className="w-full mt-4">Get Recommendation</Button>

          {result && (
            <div className="mt-6 p-4 border rounded-lg bg-gray-50 space-y-2">
              <h3 className="text-lg font-semibold">Recommended Tariff</h3>
              <p><strong>Client Category:</strong> {result.category}</p>
              <p><strong>Support Type:</strong> {result.baseRate}</p>
              <p><strong>After-Hours Needs:</strong> {result.afterHours}</p>
              <p><strong>Preferred Billing:</strong> {result.contract}</p>
              <p><strong>Priority Support:</strong> {result.priority}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
