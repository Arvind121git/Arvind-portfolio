import React from 'react';
import { db } from '../../lib/db';
import Skills from '../../components/Skills';

export const dynamic = 'force-dynamic';

export default async function SkillsPage() {
  const skills = await db.getCollection('skills');

  return (
    <div style={{ paddingTop: '80px' }}>
      <Skills skills={skills} />
    </div>
  );
}
