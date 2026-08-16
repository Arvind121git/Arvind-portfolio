import React from 'react';
import Loader from '../components/Loader';

export default function Loading() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader text="Loading Portfolio..." />
    </div>
  );
}
