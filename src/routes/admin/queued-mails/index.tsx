import Index from '@/Pages/Admin/Index';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const index: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
    </Routes>
  );
};

export default index;
