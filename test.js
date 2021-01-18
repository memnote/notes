const yml = require("gray-matter");
const fs = require("fs");

function objectEqual(obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
  for (let key in obj1) {
    if (obj1[key] !== obj2[key]) return false;
  }
  return true;
}

function loadFileNames(dir, extEnding) {
  return fs.readdirSync(`./${dir}`).map((meta) => meta.replace(extEnding, ""));
}

function testPostFileNames() {
  const filenames = fs.readdirSync("./posts");
  const pattern = /^([0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])-)([a-zA-Z0-9_-]+)(\.md)$/g;
  for (filename of filenames) {
    if (!pattern.test(filename))
      throw new Error(
        `Invalid filename: ${filename}! Post filename should look like this: 2021-01-18-example.md`
      );
  }
}

function testMetaDataFileNames() {
  const filenames = fs.readdirSync("./metadata");
  const pattern = /^([0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])-)([a-zA-Z0-9_-]+)(-metadata)(\.json)$/g;
  for (filename of filenames) {
    if (!pattern.test(filename))
      throw new Error(
        `Invalid filename: ${filename}! Metadata filename should look like this: 2021-01-18-example-metadata.json`
      );
  }
}

function testThumbnailFileNames() {
  const filenames = fs.readdirSync("./assets/thumbnails");
  const pattern = /^([0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])-)([a-zA-Z0-9_-]+)(-thumbnail)(\.jpg)$/g;
  for (filename of filenames) {
    if (!pattern.test(filename))
      throw new Error(
        `Invalid filename: ${filename}! Thumbnail filename should look like this: 2021-01-18-example-thumbnail.jpg`
      );
  }
}

function readMetaFile(name) {
  return JSON.parse(fs.readFileSync(`./metadata/${name}-metadata.json`));
}

function readPostMeta(name) {
  const data = yml(fs.readFileSync(`./posts/${name}.md`)).data;
  if (data.date)
    data.date = `${data.date.getFullYear()}-${
      data.date.getMonth() + 1 < 10 ? "0" : ""
    }${data.date.getMonth() + 1}-${
      data.date.getDate() < 10 ? "0" : ""
    }${data.date.getDate()}`;
  return data;
}

function compareAll(name, metas, posts, thumbnails) {
  if (!metas.includes(name))
    throw new Error(`Metadata not found with this name: ${name}`);
  if (!posts.includes(name))
    throw new Error(`Post not found with this name: ${name}`);
  if (!thumbnails.includes(name))
    throw new Error(
      `Thumbnail not found with this name: ${name}, Every post should has at least a default shitty thumbnail!`
    );
  const meta = readMetaFile(name);
  const postMeta = readPostMeta(name);
  if (!objectEqual(meta, postMeta)) {
    throw new Error(
      `Post: ${name} is invalid. Metadata json and Post markdown meta is different!`
    );
  }
}

// Test file names
testMetaDataFileNames();
testPostFileNames();
testThumbnailFileNames();

// Test for metadata - post - thumbnail pairs
const metaFiles = loadFileNames("metadata", "-metadata.json");
const postFiles = loadFileNames("posts", ".md");
const thumbnailFiles = loadFileNames("assets/thumbnails", "-thumbnail.jpg");

const lengths = [metaFiles.length, postFiles.length, thumbnailFiles.length];

if (lengths.some((length) => length !== lengths[0])) {
  throw new Error(
    "Every post has to have a post file (markdown), a metadata file (json), and at least a basic thumbnail (jpg)"
  );
}

for (meta of metaFiles) {
  compareAll(meta, metaFiles, postFiles, thumbnailFiles);
}
