import React from 'react';
import { db } from '../../lib/db';
import Projects from '../../components/Projects';

export const revalidate = 0;

export default async function ProjectsPage() {
  const projects = await db.getCollection('projects');

  return (
    <div style={{ paddingTop: '80px' }}>
      <Projects projects={projects} />
    </div>
  );
}
