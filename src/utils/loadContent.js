// Utility to load content from JSON files

const contentCache = {};

export async function loadContent(pageName) {
  // Check cache first
  if (contentCache[pageName]) {
    return contentCache[pageName];
  }

  try {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const dataPath = `${baseUrl}data/${pageName}.json`;
    const response = await fetch(dataPath);
    if (!response.ok) {
      throw new Error(`Failed to load ${pageName}.json`);
    }
    const content = await response.json();
    contentCache[pageName] = content;
    return content;
  } catch (error) {
    console.error(`Error loading content for ${pageName}:`, error);
    return null;
  }
}

