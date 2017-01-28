

import fs from 'fs';

export function makeDir(dirPath) {
  try {
    fs.mkdirSync(dirPath);
  }
  catch (e) {
    // console.log(e);
  }
}

export function cleanDir(dirPath) {
  let files = [];
  try {
    files = fs.readdirSync(dirPath);
  }
  catch (e) {
    return;
  }
  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const filePath = `${dirPath}/${files[i]}`;
      if (fs.statSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
      }
    }
  }
}

makeDir(`${__dirname}/temp_images`);
cleanDir(`${__dirname}/temp_images`);

setInterval(() => {
  cleanDir(`${__dirname}/temp_images`);
}, 60 * 60 * 1000);
