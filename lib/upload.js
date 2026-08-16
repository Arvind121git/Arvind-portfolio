import fs from 'fs';
import path from 'path';

export async function saveUploadedFile(file, subFolder = 'uploads') {
  try {
    const uploadDir = path.join(process.cwd(), 'public', subFolder);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uniqueName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    const filePath = path.join(uploadDir, uniqueName);

    fs.writeFileSync(filePath, buffer);
    return `/${subFolder}/${uniqueName}`;
  } catch (error) {
    console.error('File upload error:', error);
    throw new Error('Failed to save uploaded file');
  }
}
