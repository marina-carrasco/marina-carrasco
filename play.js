const fs = require("fs");

const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));
const user = String(event.issue.user.login).replace(/[^A-Za-z0-9-]/g, "");

const n = parseInt(fs.readFileSync("pets.txt", "utf8"), 10) + 1;
fs.writeFileSync("pets.txt", String(n));

const [cat, mood] =
  n >= 50 ? ["😻", "head over heels"] :
  n >= 25 ? ["😸", "very happy"] :
  n >= 10 ? ["😺", "happy"] :
            ["🐱", "curious"];

let readme = fs.readFileSync("README.md", "utf8");
const set = (tag, value) => {
  readme = readme.replace(
    new RegExp(`<!--${tag}-->[\\s\\S]*?<!--/${tag}-->`),
    () => `<!--${tag}-->${value}<!--/${tag}-->`
  );
};
set("CAT", cat);
set("MOOD", mood);
set("PETS", n);
set("LAST", `@${user}`);
fs.writeFileSync("README.md", readme);
