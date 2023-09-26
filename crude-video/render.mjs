import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs';
import puppeteer from 'puppeteer';

if (!fs.existsSync('./frames')) {
  fs.mkdirSync('./frames');
}

const execAsync = promisify(exec);

async function renderVideo() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 720 });

  for (let i = 0; i < 150; i++) {
    const url = `http://localhost:5173?frame=${i}`;
    await page.goto(url);

    await page.screenshot({
      path: `frames/${i}.jpg`,
      type: 'jpeg',
    });
  }

  await browser.close();

  await execAsync(
    `ffmpeg -framerate 30 -i frames/%d.jpg -c:v libx264 -r 30 output.mp4 -y`
  );

  fs.rmSync('./frames', { recursive: true });

  process.exit(0);
}

renderVideo().catch((error) => {
  console.error('An error occurred:', error);
  process.exit(1);
});
