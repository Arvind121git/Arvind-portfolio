import React from 'react';
import { db } from '../../lib/db';
import Experience from '../../components/Experience';

export const revalidate = 0;

export default async function ExperiencePage() {
  const experience = await db.getCollection('experience');

  return (
    <div style={{ paddingTop: '80px' }}>
      <Experience experience={experience} />
    </div>
  );
}
