// Terminal command definitions and handlers

const STORAGE_KEY = 'terminalUserName';

// Available page names (must match JSON file names)
const availablePages = ['about', 'projects', 'experience', 'contact', 'skills'];

// Cache for loaded page content
const pageContentCache = {};

// Load page content from JSON file
const loadPageContent = async (pageName) => {
  // Check cache first
  if (pageContentCache[pageName]) {
    return pageContentCache[pageName];
  }

  try {
    // Use base URL from Vite to handle base path in production
    const baseUrl = import.meta.env.BASE_URL || '/';
    const dataPath = `${baseUrl}data/${pageName}.json`;
    const response = await fetch(dataPath);
    if (!response.ok) {
      throw new Error(`Failed to load ${pageName}.json`);
    }
    const content = await response.json();
    pageContentCache[pageName] = content;
    return content;
  } catch (error) {
    console.error(`Error loading page content for ${pageName}:`, error);
    return null;
  }
};

// Get available page names
export const getAvailablePages = () => {
  return [...availablePages];
};

// Get user name from localStorage
export const getUserName = () => {
  return localStorage.getItem(STORAGE_KEY) || 'user';
};

// Set user name in localStorage
export const setUserName = (name) => {
  if (name && name.trim()) {
    localStorage.setItem(STORAGE_KEY, name.trim());
    return true;
  }
  return false;
};

// Generate prompt string
export const getPrompt = () => {
  const userName = getUserName();
  return `${userName}@matrix:~$`;
};

// Command handlers
export const executeCommand = (command, args = []) => {
  const cmd = command.toLowerCase().trim();

  switch (cmd) {
    case 'help':
      return {
        type: 'help',
        content: [
          { type: 'header', text: 'Available Commands:' },
          { type: 'paragraph', text: 'help     - Show this help message' },
          { type: 'paragraph', text: 'setname <name> - Set your name (persists across sessions)' },
          { type: 'paragraph', text: 'ls       - List all available pages' },
          { type: 'paragraph', text: 'cat <page> - Display content of a page' },
          { type: 'paragraph', text: 'cd <page>  - Navigate to a page (same as cat)' },
          { type: 'paragraph', text: 'rm       - Easter egg command' },
          { type: 'paragraph', text: 'clear    - Clear terminal output' },
          { type: 'paragraph', text: 'close    - Return to landing page' },
        ]
      };

    case 'setname':
      if (args.length === 0) {
        return {
          type: 'error',
          content: [
            { type: 'paragraph', text: 'Usage: setname <name>' },
            { type: 'paragraph', text: 'Example: setname Neo' }
          ]
        };
      }
      const name = args.join(' ');
      if (setUserName(name)) {
        return {
          type: 'success',
          content: [
            { type: 'paragraph', text: `Name set to: ${name}` },
            { type: 'paragraph', text: `Your prompt will now show: ${name}@matrix:~$` }
          ]
        };
      }
      return {
        type: 'error',
        content: [{ type: 'paragraph', text: 'Invalid name. Please provide a non-empty name.' }]
      };

    case 'ls':
      const pages = getAvailablePages();
      return {
        type: 'list',
        content: [
          { type: 'header', text: 'Available Pages:' },
          { type: 'list', items: pages }
        ]
      };

    case 'cat':
    case 'cd':
      if (args.length === 0) {
        return {
          type: 'error',
          content: [
            { type: 'paragraph', text: `Usage: ${cmd} <page>` },
            { type: 'paragraph', text: 'Use "ls" to see available pages.' }
          ]
        };
      }
      const pageName = args[0].toLowerCase();
      if (!availablePages.includes(pageName)) {
        return {
          type: 'error',
          content: [
            { type: 'paragraph', text: `Page "${pageName}" not found.` },
            { type: 'paragraph', text: 'Use "ls" to see available pages.' }
          ]
        };
      }
      // Return a promise-based result for async loading
      return {
        type: 'loading',
        pageName: pageName,
        cmd: cmd
      };

    case 'rm':
      return {
        type: 'easter-egg',
        content: [
          { type: 'paragraph', text: 'He\'s beginning to believe he can exit the Matrix!' }
        ]
      };

    case 'clear':
      return {
        type: 'clear',
        content: []
      };

    case 'close':
      return {
        type: 'close',
        content: []
      };

    default:
      // Try to provide helpful suggestions
      const suggestions = getCommandSuggestions(cmd);
      return {
        type: 'error',
        content: [
          { type: 'paragraph', text: `Command "${command}" not found.` },
          ...(suggestions.length > 0 ? [
            { type: 'paragraph', text: 'Did you mean:' },
            ...suggestions.map(s => ({ type: 'paragraph', text: `  ${s}` }))
          ] : [
            { type: 'paragraph', text: 'Type "help" to see available commands.' }
          ])
        ]
      };
  }
};

// Get command suggestions for typos
const getCommandSuggestions = (cmd) => {
  const commands = ['help', 'setname', 'ls', 'cat', 'cd', 'rm', 'clear', 'close'];
  const suggestions = [];
  
  for (const command of commands) {
    if (command.startsWith(cmd) || cmd.startsWith(command.substring(0, 2))) {
      suggestions.push(command);
    }
  }
  
  return suggestions.slice(0, 3);
};

// Auto-complete suggestions
export const getAutocompleteSuggestions = (input) => {
  const commands = ['help', 'setname', 'ls', 'cat', 'cd', 'rm', 'clear', 'close'];
  const parts = input.trim().split(/\s+/);
  
  if (parts.length === 1) {
    // Completing command
    const prefix = parts[0].toLowerCase();
    return commands.filter(cmd => cmd.startsWith(prefix));
  } else if (parts.length === 2) {
    // Completing page name for cat/cd
    const cmd = parts[0].toLowerCase();
    if (cmd === 'cat' || cmd === 'cd') {
      const prefix = parts[1].toLowerCase();
      const pages = getAvailablePages();
      return pages.filter(page => page.startsWith(prefix));
    }
  }
  
  return [];
};

// Load page content async (for cat/cd commands)
export const loadPageContentAsync = async (pageName) => {
  const content = await loadPageContent(pageName);
  if (!content) {
    return {
      type: 'error',
      content: [
        { type: 'paragraph', text: `Failed to load page "${pageName}".` },
        { type: 'paragraph', text: 'Please check if the JSON file exists.' }
      ]
    };
  }
  return {
    type: 'page',
    content: content
  };
};

// Get initial greeting - returns greeting + help command output
export const getInitialGreeting = () => {
  const userName = getUserName();
  return {
    type: 'greeting',
    content: [
      { type: 'header', text: `Welcome to the Real World, ${userName}...` },
      { type: 'paragraph', text: '' },
    ]
  };
};

