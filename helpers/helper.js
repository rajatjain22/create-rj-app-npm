import fs from "fs-extra";
import path from "path";
import { execSync } from "child_process";
import { capitalizeFirstLetter } from "../utils/index.js";

// Helper function to copy files
function copyFiles(sourceDir, targetDir, files) {
  files.forEach((file) => {
    const sourceFile = path.join(sourceDir, file);
    const targetFile = path.join(targetDir, file);
    if (fs.existsSync(sourceFile)) {
      fs.copyFileSync(sourceFile, targetFile);
    } else {
      console.error(`Error: ${sourceFile} does not exist!`);
    }
  });
}

// Helper function to copy directories
function copyDirectory(sourceDir, targetDir) {
  if (fs.existsSync(sourceDir)) {
    fs.copySync(sourceDir, targetDir);
  } else {
    console.error(`Error: Directory ${sourceDir} does not exist!`);
  }
}

// Helper function to install packages
function installPackages(packages, projectDirectory, packageManager = "npm") {
  const installCommand = packageManager === "yarn" ? "yarn add" : "npm install";
  const packageString = packages.join(" ");

  console.log(`Installing ${packages.length} packages...`);
  try {
    execSync(`${installCommand} ${packageString}`, {
      cwd: projectDirectory,
      stdio: "inherit",
    });
    console.log("Packages installed successfully.");
  } catch (error) {
    console.error("Error installing packages:", error);
  }
}

// Helper function to update the sidebar menu
async function updateSidebarMenu(dir, filePath, pageName) {
  const menuFilePath = path.join(dir, filePath);

  try {
    // Read the current menu JSON file
    const data = await fs.readFile(menuFilePath, "utf8");
    const menuItems = JSON.parse(data);

    // Add new item to the menu
    menuItems.push({
      icon: "<svg ...>...</svg>", // Replace with actual SVG content
      label: capitalizeFirstLetter(pageName),
      path: "#", // Adjust the path as needed
    });

    // Save the updated menu back to the file
    await fs.writeFile(menuFilePath, JSON.stringify(menuItems, null, 2));
    console.log("Sidebar menu updated successfully.");
  } catch (error) {
    console.error("Error updating sidebar menu:", error);
  }
}

export { copyFiles, copyDirectory, installPackages, updateSidebarMenu };
