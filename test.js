const yml = require("gray-matter");
const fs = require("fs");

const subjects = JSON.parse(fs.readFileSync("./subjects.json"));

function loadFileNames(dir, extEnding) {
  return fs.readdirSync(`./${dir}`).map((meta) => meta.replace(extEnding, ""));
}

function testPostFileNames() {
  const filenames = fs.readdirSync("./posts");
  const pattern = /^([0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])-)([a-zA-Z0-9_-]+)(\.md)$/;
  for (const filename of filenames) {
    if (!pattern.test(filename)) {
      throw new Error(
        `Invalid filename: ${filename}! Post filename should look like this: 2021-01-18-example.md`
      );
    }
  }
}

function testMetaDataFileNames() {
  const filenames = fs.readdirSync("./metadata");
  const pattern = /^([0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])-)([a-zA-Z0-9_-]+)(-metadata)(\.json)$/;
  for (filename of filenames) {
    if (!pattern.test(filename)) {
      throw new Error(
        `Invalid filename: ${filename}! Metadata filename should look like this: 2021-01-18-example-metadata.json`
      );
    }
  }
}

function readPostMeta(name) {
  const data = yml(fs.readFileSync(`./posts/${name}.md`)).data;
  if (data.date instanceof Date)
    data.date = data.date.toISOString().substring(0, 10);
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

  if (!Object.keys(subjects).includes(postMeta.subject))
    return errMsg + `, subject should be a key from subjects.json`;
}

// Test file names
testMetaDataFileNames();
testPostFileNames();

// Test post metas in markdown
const postFiles = loadFileNames("posts", ".md");

const errors = [];

for (post of postFiles) {
  const postMeta = readPostMeta(post);
  const error = testPostMeta(postMeta, post);
  if (error) errors.push(error);
}

if (errors.length > 0) throw new Error(errors.join("\n"));
