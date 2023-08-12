import React from 'react';
import ConditionalDropdown from './ConditionalDropdown'; // Adjust the import path

const Index = () => {
  const dropdownSequence = [
    {
      name: 'customer',
      url: 'admin/customers?all=1',
    },
    {
      name: 'facility',
      url: 'admin/facilities?all=1&customer_id=:customer_id',
    },
    {
      name: 'specialty',
      url: 'admin/specialties?all=1&customer_id=:customer_id&facility_id=:facility_id',
    },
    {
      name: 'doctor',
      url: 'admin/doctors?all=1&customer_id=:customer_id&facility_id=:facility_id&specialty_id=:specialty_id',
    },
  ];

  return (
    <div>
      <ConditionalDropdown dropdownSequence={dropdownSequence} />
    </div>
  );
};

export default Index;
