import fs from "fs";
import path from "path";

import matter from "gray-matter";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export function getAllProjects() {
  const filenames = fs.readdirSync(projectsDirectory);

  return filenames.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(projectsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);

    return {
      slug,
      title: data.title,
      image: data.image,
      description: data.description,
    };
  });
}
