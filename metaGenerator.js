/**
 * This should generate <post>-metadata.json files from the
 * post markdown. It should only run on push / merge if all the
 * tests are passed.
 */

const fs = require("fs");
const yml = require("gray-matter");

function objectEqual(obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
  for (let key in obj1) {
    if (obj1[key] !== obj2[key]) return false;
  }
  return true;
}

function mdFormatter(data) {
  const parsed = yml(data).data;
  return {
    ...parsed,
    date: parsed.date.toISOString().substring(0, 10),
  };
}

async function readdir(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) reject(err);
      resolve(files);
    });
  });
}

async function loadFiles(directoryPath, endExt, formatter = (data) => data) {
  const filenames = await readdir(directoryPath);
  const promises = [];
  for (let filename of filenames) {
    promises.push(
      new Promise((resolve, reject) => {
        fs.readFile(`${directoryPath}/${filename}`, (err, data) => {
          if (err) reject(err);
          resolve({
            filename: filename.replace(endExt, ""),
            data: formatter(data.toString()),
          });
        });
      })
    );
  }

  const result = await Promise.all(promises);
  const map = {};
  result.forEach((res) => (map[res.filename] = res.data));
  return map;
}

async function main() {
  const posts = await loadFiles("./posts", ".md", mdFormatter);
  const metas = await loadFiles("./metadata", "-metadata.json", JSON.parse);

  const promises = [];

  for (let filename in posts) {
    if (!metas[filename] || !objectEqual(metas[filename], posts[filename])) {
      promises.push(
        new Promise((resolve, reject) => {
          fs.writeFile(
            `./metadata/${filename}-metadata.json`,
            JSON.stringify(posts[filename]),
            (err) => {
              if (err) reject(err);
              resolve();
            }
          );
        })
      );
    }
  }

  await Promise.all(promises);
}

main();
