import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const ShippingManagement = () => {
  const [activeTab, setActiveTab] = useState('provinces');
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [formData, setFormData] = useState({
    province: { name: '' },
    district: { province_id: '', name: '' },
    payment: { province_id: '', district_id: '', amount: '' }
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchProvinces();
    fetchDistricts();
    fetchPayments();
  }, []);

  // Fetch provinces
  const fetchProvinces = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/provinces`);
      setProvinces(response.data);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  // Fetch districts
  const fetchDistricts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/districts`);
      setDistricts(response.data);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  // Fetch payments
  const fetchPayments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/shipping_payments`);
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  // Fetch districts by province
  const fetchDistrictsByProvince = async (provinceId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/districts/by-province/${provinceId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching districts by province:', error);
      return [];
    }
  };

  // Handle form input changes
  const handleInputChange = (formType, field, value) => {
    setFormData(prev => ({
      ...prev,
      [formType]: {
        ...prev[formType],
        [field]: value
      }
    }));
  };

  // Handle province selection change
  const handleProvinceChange = async (e) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);
    handleInputChange('payment', 'province_id', provinceId);
    handleInputChange('payment', 'district_id', '');
  };

  // Submit province form
  const submitProvince = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/provinces`, formData.province);
      setFormData({...formData, province: { name: '' }});
      fetchProvinces();
      alert('Province added successfully!');
    } catch (error) {
      console.error('Error adding province:', error);
      alert('Error adding province');
    }
  };

  // Submit district form
  const submitDistrict = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/districts`, formData.district);
      setFormData({...formData, district: { province_id: '', name: '' }});
      fetchDistricts();
      alert('District added successfully!');
    } catch (error) {
      console.error('Error adding district:', error);
      alert('Error adding district');
    }
  };

  // Submit payment form
  const submitPayment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/shipping_payments`, formData.payment);
      setFormData({...formData, payment: { province_id: '', district_id: '', amount: '' }});
      setSelectedProvince('');
      fetchPayments();
      alert('Shipping payment added successfully!');
    } catch (error) {
      console.error('Error adding payment:', error);
      alert('Error adding payment');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-1">
      <div className="max-w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-white">
          <h1 className="text-3xl font-bold">Shipping Management System</h1>
          <p className="mt-2">Manage provinces, districts, and shipping payments</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200">
          {['provinces', 'districts', 'payments'].map(tab => (
            <button
              key={tab}
              className={`px-6 py-3 font-medium text-sm capitalize ${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Provinces Tab */}
          {activeTab === 'provinces' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Manage Provinces</h2>
              
              {/* Add Province Form */}
              <form onSubmit={submitProvince} className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-3">Add New Province</h3>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Province Name"
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                    value={formData.province.name}
                    onChange={(e) => handleInputChange('province', 'name', e.target.value)}
                    required
                  />
                  <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                    Add Province
                  </button>
                </div>
              </form>
              
              {/* Provinces List */}
              <div>
                <h3 className="text-lg font-medium mb-3">Existing Provinces</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {provinces.map(province => (
                    <div key={province.id} className="p-4 border border-gray-200 rounded-lg shadow-sm">
                      <h4 className="font-medium">{province.name}</h4>
                      <p className="text-sm text-gray-500">ID: {province.id}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Districts Tab */}
          {activeTab === 'districts' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Manage Districts</h2>
              
              {/* Add District Form */}
              <form onSubmit={submitDistrict} className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-3">Add New District</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <select
                    className="p-2 border border-gray-300 rounded-md"
                    value={formData.district.province_id}
                    onChange={(e) => handleInputChange('district', 'province_id', e.target.value)}
                    required
                  >
                    <option value="">Select Province</option>
                    {provinces.map(province => (
                      <option key={province.id} value={province.id}>{province.name}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="District Name"
                    className="p-2 border border-gray-300 rounded-md"
                    value={formData.district.name}
                    onChange={(e) => handleInputChange('district', 'name', e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  Add District
                </button>
              </form>
              
              {/* Districts List */}
              <div>
                <h3 className="text-lg font-medium mb-3">Existing Districts</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Province</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {districts.map(district => (
                        <tr key={district.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{district.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{district.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {provinces.find(p => p.id === district.province_id)?.name || district.province_id}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Manage Shipping Payments</h2>
              
              {/* Add Payment Form */}
              <form onSubmit={submitPayment} className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-3">Add New Shipping Payment</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <select
                    className="p-2 border border-gray-300 rounded-md"
                    value={formData.payment.province_id}
                    onChange={handleProvinceChange}
                    required
                  >
                    <option value="">Select Province</option>
                    {provinces.map(province => (
                      <option key={province.id} value={province.id}>{province.name}</option>
                    ))}
                  </select>
                  <select
                    className="p-2 border border-gray-300 rounded-md"
                    value={formData.payment.district_id}
                    onChange={(e) => handleInputChange('payment', 'district_id', e.target.value)}
                    required
                    disabled={!selectedProvince}
                  >
                    <option value="">Select District</option>
                    {districts
                      .filter(district => district.province_id == selectedProvince)
                      .map(district => (
                        <option key={district.id} value={district.id}>{district.name}</option>
                      ))
                    }
                  </select>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Amount"
                    className="p-2 border border-gray-300 rounded-md"
                    value={formData.payment.amount}
                    onChange={(e) => handleInputChange('payment', 'amount', e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  Add Payment
                </button>
              </form>
              
              {/* Payments List */}
              <div>
                <h3 className="text-lg font-medium mb-3">Existing Shipping Payments</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Province</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {payments.map(payment => (
                        <tr key={payment.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{payment.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {provinces.find(p => p.id === payment.province_id)?.name || payment.province_id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {districts.find(d => d.id === payment.district_id)?.name || payment.district_id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">${parseFloat(payment.amount).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingManagement ;