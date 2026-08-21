import React from 'react';
import { db } from '../../lib/db';
import Certificate from '../../components/Certificate';

export const dynamic = 'force-dynamic';

export default async function CertificatesPage() {
  const certificates = await db.getCollection('certificates');

  return (
    <div style={{ paddingTop: '80px' }}>
      <Certificate certificates={certificates} />
    </div>
  );
}
