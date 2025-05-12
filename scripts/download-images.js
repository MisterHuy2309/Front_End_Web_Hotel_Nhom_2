import https from 'https';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const images = [
  {
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    name: 'hotel-luxury-1.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd',
    name: 'hotel-luxury-2.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39',
    name: 'hotel-luxury-3.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
    name: 'hotel-luxury-4.jpg'
  }
];

// Đảm bảo thư mục images tồn tại
const imagesDir = join(__dirname, '../public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Hàm tải ảnh
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = join(imagesDir, filename);
    const file = fs.createWriteStream(filepath);

    https.get(url + '?auto=format&fit=crop&w=1920&q=80', (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {
        console.error(`Error downloading ${filename}:`, err.message);
        reject(err);
      });
    });
  });
}

// Tải tất cả ảnh
async function downloadAllImages() {
  try {
    for (const img of images) {
      await downloadImage(img.url, img.name);
    }
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
}

downloadAllImages();
