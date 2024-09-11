#!/usr/bin/env node

import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";
import { copyDirectory, copyFiles } from "./helpers/helper.js";

import setupEcommerceProject from "./controller/ecommerce.js";

// Get the directory name of the current module
const __filename = new URL(import.meta.url).pathname;
export const __dirname = path.dirname(__filename);

export const projectPaths = {
  ecom: path.join(__dirname, "Templates/Ecom")
};

// Main function to create the project
async function createProject() {
  const { projectName, projectType } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "What is the name of your project?",
      default: "my-project",
    },
    {
      type: "list",
      name: "projectType",
      message: "What type of project would you like to create?",
      choices: ["E-commerce", "Blog"],
    },
  ]);

  console.log("Setting up project...");

  const projectDirectory = path.join(process.cwd(), projectName);
  fs.ensureDirSync(projectDirectory);

  // Common files for all projects
  const commonFiles = [
    ".eslintrc.json",
    ".gitignore",
    "jsconfig.json",
    "next.config.mjs",
    "package.json",
    "postcss.config.mjs",
    "README.md",
    "tailwind.config.js",
  ];

  const commonAssets = [
    "src/app/fonts",
    "src/app/favicon.ico",
    "src/_components/Sidebar",
  ];

  // Copy common files and assets
  copyFiles(projectPaths.ecom, projectDirectory, commonFiles);

  commonAssets.forEach((asset) => {
    copyDirectory(
      path.join(projectPaths.ecom, asset),
      path.join(projectDirectory, asset)
    );
  });

  // Handle specific project types
  if (projectType === "E-commerce") {
    await setupEcommerceProject(projectDirectory);
  } else if (projectType === "Blog") {
    // setupBlogProject(projectDirectory);
  }

  console.log(`Project ${projectName} created successfully.`);
}

// Run the main function
createProject().catch((error) => {
  console.error("Error:", error);
});
