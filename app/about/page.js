import React from 'react';
import { db } from '../../lib/db';
import About from '../../components/About';
import Education from '../../components/Education';

export const revalidate = 0;

export default async function AboutPage() {
  const about = await db.getCollection('about');
  const education = await db.getCollection('education');

  return (
    <div style={{ paddingTop: '80px' }}>
      <About data={about} />
      <Education education={education} />
    </div>
  );
}
