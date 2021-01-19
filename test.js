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

function readMetaFile(name) {
  return JSON.parse(fs.readFileSync(`./metadata/${name}-metadata.json`));
}

function readPostMeta(name) {
  const data = yml(fs.readFileSync(`./posts/${name}.md`)).data;
  if (data.date instanceof Date)
    data.date = `${data.date.getFullYear()}-${
      data.date.getMonth() + 1 < 10 ? "0" : ""
    }${data.date.getMonth() + 1}-${
      data.date.getDate() < 10 ? "0" : ""
    }${data.date.getDate()}`;
  return data;
}

function testPostMeta(postMeta, name) {
  const template = {
    title: "",
    date: "",
    subject: "",
    description: "",
  };

  const errMsg = `Invalid post metadata, for post ${name}`;

  if (Object.keys(postMeta).length !== Object.keys(template).length)
    return errMsg;

  for (let key in template) {
    if (!postMeta[key]) return errMsg;
  }

  const dateRegex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/g;
  if (!dateRegex.test(postMeta.date))
    return (
      errMsg +
      `, date should be in this format: 2021-01-18, got instead: ${postMeta.date}`
    );
}

function compare(name, postMeta, metas) {
  if (!metas.includes(name)) return;
  const meta = readMetaFile(name);
  if (!objectEqual(meta, postMeta)) {
    return `Post: ${name} is invalid. Metadata json and Post markdown meta is different!`;
  }
}

// Test file names
testMetaDataFileNames();
testPostFileNames();

// Test for metadata - post - thumbnail pairs
const metaFiles = loadFileNames("metadata", "-metadata.json");
const postFiles = loadFileNames("posts", ".md");

const errors = [];

for (post of postFiles) {
  const postMeta = readPostMeta(post);
  const error0 = testPostMeta(postMeta, post);
  const error = compare(post, postMeta, metaFiles);
  if (error) errors.push(error);
  if (error0) errors.push(error0);
}

if (errors.length > 0) throw new Error(errors.join("\n"));
