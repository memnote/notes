/**
 * This should generate <post>-metadata.json files from the
 * post markdown. It should only run on push / merge if all the
 * tests are passed.
 */

const yml = require("gray-matter");
const fs = require("fs");

function loadFileNames(dir, extEnding) {
  return fs.readdirSync(`./${dir}`).map((meta) => meta.replace(extEnding, ""));
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

function findNewPostsWithoutMetaData(metaFiles = [], postFiles = []) {
  return postFiles.filter((post) => !metaFiles.includes(post));
}

const metaFiles = loadFileNames("metadata", "-metadata.json");
const postFiles = loadFileNames("posts", ".md");

const newPosts = findNewPostsWithoutMetaData(metaFiles, postFiles);

for (let post of newPosts) {
  const { title, subject, date, description } = readPostMeta(post);
  if (!title || !subject || !date || !description) {
    throw new Error(
      `Metadata json can't be generated from post: ${post}, because it has invalid meta data.`
    );
  }
  const json = JSON.stringify({
    title,
    subject,
    date,
    description,
  });

  fs.writeFileSync(`./metadata/${post}-metadata.json`, json);
}
