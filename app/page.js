import React from 'react';
import { db } from '../lib/db';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Certificate from '../components/Certificate';
import Contact from '../components/Contact';

export const revalidate = 0;

export default async function HomePage() {
  const about = await db.getCollection('about');
  const skills = await db.getCollection('skills');
  const projects = await db.getCollection('projects');
  const experience = await db.getCollection('experience');
  const education = await db.getCollection('education');
  const certificates = await db.getCollection('certificates');

  return (
    <>
      <Hero data={about} />
      <About data={about} />
      <Skills skills={skills} />
      <Projects projects={projects} limit={3} />
      <Experience experience={experience} />
      <Education education={education} />
      <Certificate certificates={certificates} />
      <Contact about={about} />
    </>
  );
}
