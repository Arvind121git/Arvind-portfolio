import mysql from 'mysql2/promise';
import {
  INITIAL_ABOUT_DATA,
  INITIAL_SKILLS_DATA,
  INITIAL_PROJECTS_DATA,
  INITIAL_EXPERIENCE_DATA,
  INITIAL_EDUCATION_DATA,
  INITIAL_CERTIFICATES_DATA,
} from '../utils/constants';

let pool = null;
let tablesInitialized = false;

async function getPool() {
  if (pool) return pool;

  const baseConfig = {
    host: process.env.TIDB_HOST || 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    port: Number(process.env.TIDB_PORT || 4000),
    user: process.env.TIDB_USER || '2EoebSQsjgpUmPG.root',
    password: process.env.TIDB_PASSWORD || 'cCUVERfiziLWlgV1',
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true,
    },
  };

  const dbName = process.env.TIDB_DATABASE || 'arvindportfolio';

  try {
    const tempConnection = await mysql.createConnection(baseConfig);
    await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    await tempConnection.end();
  } catch (err) {
    console.log('Database ensure note:', err.message);
  }

  pool = mysql.createPool({
    ...baseConfig,
    database: dbName,
    waitForConnections: true,
    connectionLimit: 10,
  });

  return pool;
}

function parseJsonField(val, fallback = []) {
  if (typeof val === 'string') {
    try {
      return JSON.parse(val);
    } catch (e) {
      return fallback;
    }
  }
  return val || fallback;
}

async function ensureTables() {
  if (tablesInitialized) return;
  const dbPool = await getPool();

  await dbPool.query(`
    CREATE TABLE IF NOT EXISTS about (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(255),
      title VARCHAR(255),
      tagline TEXT,
      bio TEXT,
      location VARCHAR(255),
      email VARCHAR(255),
      phone VARCHAR(255),
      github VARCHAR(500),
      linkedin VARCHAR(500),
      twitter VARCHAR(500),
      resumeUrl VARCHAR(500),
      stats JSON
    )
  `);

  await dbPool.query(`
    CREATE TABLE IF NOT EXISTS skills (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(255),
      category VARCHAR(100),
      level INT,
      icon VARCHAR(100)
    )
  `);

  await dbPool.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id VARCHAR(64) PRIMARY KEY,
      title VARCHAR(255),
      description TEXT,
      category VARCHAR(100),
      tags JSON,
      liveUrl VARCHAR(500),
      githubUrl VARCHAR(500),
      featured BOOLEAN
    )
  `);

  await dbPool.query(`
    CREATE TABLE IF NOT EXISTS experience (
      id VARCHAR(64) PRIMARY KEY,
      role VARCHAR(255),
      company VARCHAR(255),
      period VARCHAR(100),
      description TEXT
    )
  `);

  await dbPool.query(`
    CREATE TABLE IF NOT EXISTS education (
      id VARCHAR(64) PRIMARY KEY,
      degree VARCHAR(255),
      institution VARCHAR(255),
      year VARCHAR(100),
      grade VARCHAR(100)
    )
  `);

  await dbPool.query(`
    CREATE TABLE IF NOT EXISTS certificates (
      id VARCHAR(64) PRIMARY KEY,
      title VARCHAR(255),
      issuer VARCHAR(255),
      date VARCHAR(100),
      credentialId VARCHAR(255),
      link VARCHAR(500)
    )
  `);

  await dbPool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      subject VARCHAR(255),
      message TEXT,
      createdAt VARCHAR(100)
    )
  `);

  // Seed initial data if tables are empty
  const [aboutRows] = await dbPool.query(`SELECT COUNT(*) as count FROM about`);
  if (aboutRows[0].count === 0) {
    await dbPool.query(
      `INSERT INTO about (id, name, title, tagline, bio, location, email, phone, github, linkedin, twitter, resumeUrl, stats)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        '1',
        INITIAL_ABOUT_DATA.name,
        INITIAL_ABOUT_DATA.title,
        INITIAL_ABOUT_DATA.tagline,
        INITIAL_ABOUT_DATA.bio,
        INITIAL_ABOUT_DATA.location,
        INITIAL_ABOUT_DATA.email,
        INITIAL_ABOUT_DATA.phone,
        INITIAL_ABOUT_DATA.github,
        INITIAL_ABOUT_DATA.linkedin,
        INITIAL_ABOUT_DATA.twitter,
        INITIAL_ABOUT_DATA.resumeUrl,
        JSON.stringify(INITIAL_ABOUT_DATA.stats),
      ]
    );

    for (const s of INITIAL_SKILLS_DATA) {
      await dbPool.query(
        `INSERT INTO skills (id, name, category, level, icon) VALUES (?, ?, ?, ?, ?)`,
        [s.id, s.name, s.category, s.level, s.icon]
      );
    }

    for (const p of INITIAL_PROJECTS_DATA) {
      await dbPool.query(
        `INSERT INTO projects (id, title, description, category, tags, liveUrl, githubUrl, featured)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [p.id, p.title, p.description, p.category, JSON.stringify(p.tags || []), p.liveUrl, p.githubUrl, p.featured ? 1 : 0]
      );
    }

    for (const e of INITIAL_EXPERIENCE_DATA) {
      await dbPool.query(
        `INSERT INTO experience (id, role, company, period, description) VALUES (?, ?, ?, ?, ?)`,
        [e.id, e.role, e.company, e.period, e.description]
      );
    }

    for (const ed of INITIAL_EDUCATION_DATA) {
      await dbPool.query(
        `INSERT INTO education (id, degree, institution, year, grade) VALUES (?, ?, ?, ?, ?)`,
        [ed.id, ed.degree, ed.institution, ed.year, ed.grade]
      );
    }

    for (const c of INITIAL_CERTIFICATES_DATA) {
      await dbPool.query(
        `INSERT INTO certificates (id, title, issuer, date, credentialId, link) VALUES (?, ?, ?, ?, ?, ?)`,
        [c.id, c.title, c.issuer, c.date, c.credentialId, c.link]
      );
    }
  }

  tablesInitialized = true;
}

export const db = {
  getCollection: async (collectionName) => {
    await ensureTables();
    const dbPool = await getPool();

    if (collectionName === 'about') {
      const [rows] = await dbPool.query(`SELECT * FROM about WHERE id = '1' LIMIT 1`);
      if (rows && rows.length > 0) {
        const row = rows[0];
        return {
          ...row,
          stats: parseJsonField(row.stats, []),
        };
      }
      return INITIAL_ABOUT_DATA;
    }

    const [rows] = await dbPool.query(`SELECT * FROM ${collectionName}`);
    if (collectionName === 'projects') {
      return rows.map((r) => ({
        ...r,
        featured: Boolean(r.featured),
        tags: parseJsonField(r.tags, []),
      }));
    }
    return rows;
  },

  setCollection: async (collectionName, data) => {
    await ensureTables();
    const dbPool = await getPool();

    if (collectionName === 'about') {
      await dbPool.query(
        `UPDATE about SET name=?, title=?, tagline=?, bio=?, location=?, email=?, phone=?, github=?, linkedin=?, twitter=?, resumeUrl=?, stats=? WHERE id='1'`,
        [
          data.name || '',
          data.title || '',
          data.tagline || '',
          data.bio || '',
          data.location || '',
          data.email || '',
          data.phone || '',
          data.github || '',
          data.linkedin || '',
          data.twitter || '',
          data.resumeUrl || '',
          JSON.stringify(data.stats || []),
        ]
      );
      return data;
    }
    return data;
  },

  addItem: async (collectionName, item) => {
    await ensureTables();
    const dbPool = await getPool();

    if (collectionName === 'projects') {
      await dbPool.query(
        `INSERT INTO projects (id, title, description, category, tags, liveUrl, githubUrl, featured)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          item.id,
          item.title || '',
          item.description || '',
          item.category || 'Full Stack',
          JSON.stringify(item.tags || []),
          item.liveUrl || '',
          item.githubUrl || '',
          item.featured ? 1 : 0,
        ]
      );
    } else if (collectionName === 'skills') {
      await dbPool.query(
        `INSERT INTO skills (id, name, category, level, icon) VALUES (?, ?, ?, ?, ?)`,
        [item.id, item.name || '', item.category || 'Frontend', Number(item.level) || 90, item.icon || 'Code']
      );
    } else if (collectionName === 'experience') {
      await dbPool.query(
        `INSERT INTO experience (id, role, company, period, description) VALUES (?, ?, ?, ?, ?)`,
        [item.id, item.role || '', item.company || '', item.period || '', item.description || '']
      );
    } else if (collectionName === 'education') {
      await dbPool.query(
        `INSERT INTO education (id, degree, institution, year, grade) VALUES (?, ?, ?, ?, ?)`,
        [item.id, item.degree || '', item.institution || '', item.year || '', item.grade || '']
      );
    } else if (collectionName === 'certificates') {
      await dbPool.query(
        `INSERT INTO certificates (id, title, issuer, date, credentialId, link) VALUES (?, ?, ?, ?, ?, ?)`,
        [item.id, item.title || '', item.issuer || '', item.date || '', item.credentialId || '', item.link || '']
      );
    } else if (collectionName === 'messages') {
      await dbPool.query(
        `INSERT INTO messages (id, name, email, subject, message, createdAt) VALUES (?, ?, ?, ?, ?, ?)`,
        [item.id, item.name || '', item.email || '', item.subject || '', item.message || '', item.createdAt || new Date().toISOString()]
      );
    }
    return item;
  },

  updateItem: async (collectionName, id, updatedFields) => {
    await ensureTables();
    const dbPool = await getPool();

    if (collectionName === 'projects') {
      await dbPool.query(
        `UPDATE projects SET title=?, description=?, category=?, tags=?, liveUrl=?, githubUrl=?, featured=? WHERE id=?`,
        [
          updatedFields.title || '',
          updatedFields.description || '',
          updatedFields.category || '',
          JSON.stringify(updatedFields.tags || []),
          updatedFields.liveUrl || '',
          updatedFields.githubUrl || '',
          updatedFields.featured ? 1 : 0,
          id,
        ]
      );
    } else if (collectionName === 'skills') {
      await dbPool.query(
        `UPDATE skills SET name=?, category=?, level=?, icon=? WHERE id=?`,
        [updatedFields.name || '', updatedFields.category || '', Number(updatedFields.level) || 90, updatedFields.icon || 'Code', id]
      );
    } else if (collectionName === 'experience') {
      await dbPool.query(
        `UPDATE experience SET role=?, company=?, period=?, description=? WHERE id=?`,
        [updatedFields.role || '', updatedFields.company || '', updatedFields.period || '', updatedFields.description || '', id]
      );
    } else if (collectionName === 'education') {
      await dbPool.query(
        `UPDATE education SET degree=?, institution=?, year=?, grade=? WHERE id=?`,
        [updatedFields.degree || '', updatedFields.institution || '', updatedFields.year || '', updatedFields.grade || '', id]
      );
    } else if (collectionName === 'certificates') {
      await dbPool.query(
        `UPDATE certificates SET title=?, issuer=?, date=?, credentialId=?, link=? WHERE id=?`,
        [updatedFields.title || '', updatedFields.issuer || '', updatedFields.date || '', updatedFields.credentialId || '', updatedFields.link || '', id]
      );
    }
    return updatedFields;
  },

  deleteItem: async (collectionName, id) => {
    await ensureTables();
    const dbPool = await getPool();
    await dbPool.query(`DELETE FROM ${collectionName} WHERE id = ?`, [id]);
    return true;
  },
};
