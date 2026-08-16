import React from 'react';
import { db } from '../../lib/db';
import Contact from '../../components/Contact';

export const revalidate = 0;

export default async function ContactPage() {
  const about = await db.getCollection('about');

  return (
    <div style={{ paddingTop: '80px' }}>
      <Contact about={about} />
    </div>
  );
}
