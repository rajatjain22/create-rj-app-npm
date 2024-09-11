import inquirer from "inquirer";
import path from "path";
import fs from "fs-extra";
import {
  copyDirectory,
  copyFiles,
  updateSidebarMenu,
} from "../helpers/helper.js";
import { __dirname, projectPaths } from "../index.js";

// Function to setup an e-commerce project
async function setupEcommerceProject(projectDirectory) {
  const ecomOptions = await inquirer.prompt([
    {
      type: "confirm",
      name: "includeCartPage",
      message: "Do you want to include a cart page?",
      default: true,
    },
    {
      type: "confirm",
      name: "includeSingleProductPage",
      message: "Do you want to include a single product page?",
      default: true,
    },
  ]);

  // Add E-commerce specific files
  const ecommerceFiles = [
    "src/app/globals.css",
    "src/app/layout.jsx",
    "src/app/Provider.jsx",
    "src/app/page.jsx",
  ];
  copyFiles(projectPaths.ecom, projectDirectory, ecommerceFiles);

  // Copy cart page if confirmed
  if (ecomOptions.includeCartPage) {
    copyDirectory(
      path.join(projectPaths.ecom, "src/app/cart"),
      path.join(projectDirectory, "src/app/cart")
    );

    // Update the sidebar menu based on user's choice
    await updateSidebarMenu(
      projectDirectory,
      "src/_components/Sidebar/sidebar.json",
      "cart"
    );
  } else {
    console.log("Cart page not included.");
  }

  // Append to README.md
  fs.appendFileSync(
    path.join(projectDirectory, "README.md"),
    "- E-commerce functionality\n"
  );
}

export default setupEcommerceProject;
