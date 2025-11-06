import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { X, Terminal as TerminalIcon } from 'lucide-react';
import CommandOutput from './CommandOutput';
import {
  executeCommand,
  getPrompt,
  getInitialGreeting,
  getAutocompleteSuggestions,
  loadPageContentAsync
} from '../utils/terminalCommands';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [outputHistory, setOutputHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [autocompleteIndex, setAutocompleteIndex] = useState(-1);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [hasBeenFocused, setHasBeenFocused] = useState(false);
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const terminalRef = useRef(null);

  // Initialize with greeting and help
  useEffect(() => {
    const greeting = getInitialGreeting();
    const helpOutput = executeCommand('help');
    setOutputHistory([greeting, helpOutput]);
  }, []);

  // Auto-focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      setIsInputFocused(true);
      setHasBeenFocused(true);
    }
  }, []);

  // Auto-scroll to bottom when new output is added
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [outputHistory]);

  // Handle command execution
  const handleCommand = useCallback(async (command) => {
    if (!command.trim()) return;

    const parts = command.trim().split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1);

    // Add command to history
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);

    // Execute command first to check for special commands
    const result = executeCommand(cmd, args);

    // Handle special commands
    if (result.type === 'clear') {
      setOutputHistory([]);
      return;
    }

    if (result.type === 'close') {
      // Navigate to landing page
      window.location.hash = '#/';
      return;
    }

    // Add command prompt to output (only if not a special command)
    const prompt = getPrompt();
    setOutputHistory(prev => [...prev, {
      type: 'command',
      content: [{ type: 'paragraph', text: `${prompt} ${command}` }]
    }]);

    // Handle async loading for cat/cd commands
    if (result.type === 'loading') {
      // Show loading indicator
      setOutputHistory(prev => [...prev, {
        type: 'loading',
        content: [{ type: 'paragraph', text: 'Loading...' }]
      }]);
      
      // Load page content
      const pageResult = await loadPageContentAsync(result.pageName);
      // Remove loading indicator and add actual result
      setOutputHistory(prev => {
        const newHistory = [...prev];
        newHistory.pop(); // Remove loading indicator
        return [...newHistory, pageResult];
      });
    } else {
      // Add output to history
      setOutputHistory(prev => [...prev, result]);
    }
  }, []);

  // Handle input submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const command = input.trim();
    handleCommand(command);
    setInput('');
    setAutocompleteIndex(-1);
    setAutocompleteSuggestions([]);
  };

  // Handle keyboard events
  const handleKeyDown = (e) => {
    // Tab completion
    if (e.key === 'Tab') {
      e.preventDefault();
      const suggestions = getAutocompleteSuggestions(input);
      if (suggestions.length > 0) {
        if (autocompleteIndex === -1) {
          // First tab - show suggestions
          setAutocompleteSuggestions(suggestions);
          setAutocompleteIndex(0);
        } else {
          // Cycle through suggestions
          const nextIndex = (autocompleteIndex + 1) % suggestions.length;
          setAutocompleteIndex(nextIndex);
        }
        return;
      }
    }

    // Command history navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
        setAutocompleteSuggestions([]);
        setAutocompleteIndex(-1);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
        setAutocompleteSuggestions([]);
        setAutocompleteIndex(-1);
      }
      return;
    }

    // Escape to clear autocomplete
    if (e.key === 'Escape') {
      setAutocompleteSuggestions([]);
      setAutocompleteIndex(-1);
    }
  };

  // Apply autocomplete when index changes
  useEffect(() => {
    if (autocompleteIndex >= 0 && autocompleteSuggestions.length > 0) {
      const parts = input.trim().split(/\s+/);
      if (parts.length === 1) {
        // Completing command
        setInput(autocompleteSuggestions[autocompleteIndex]);
      } else if (parts.length === 2) {
        // Completing argument
        const cmd = parts[0];
        const suggestion = autocompleteSuggestions[autocompleteIndex];
        setInput(`${cmd} ${suggestion}`);
      }
    }
  }, [autocompleteIndex, autocompleteSuggestions]);

  // Update autocomplete suggestions when input changes
  useEffect(() => {
    if (input.trim() && autocompleteIndex === -1) {
      const suggestions = getAutocompleteSuggestions(input);
      if (suggestions.length > 0) {
        setAutocompleteSuggestions(suggestions);
      } else {
        setAutocompleteSuggestions([]);
      }
    }
  }, [input, autocompleteIndex]);

  const currentPrompt = getPrompt();

  // Handle terminal window click to focus input
  const handleTerminalClick = (e) => {
    // Don't focus if clicking on the close button or output area
    if (
      e.target.closest('a[href]') ||
      e.target.closest('[role="status"]') ||
      outputRef.current?.contains(e.target)
    ) {
      return;
    }
    // Focus the input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      ref={terminalRef}
      onClick={handleTerminalClick}
      className="relative w-full max-w-4xl mx-auto h-[80vh] max-h-[600px] bg-black/95 border-2 border-green-500/50 rounded-lg shadow-2xl overflow-hidden flex flex-col cursor-text"
      style={{
        boxShadow: '0 0 20px rgba(0, 255, 0, 0.3), inset 0 0 20px rgba(0, 255, 0, 0.1)'
      }}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-green-900/30 border-b border-green-500/50">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-5 h-5 text-green-400" />
          <span className="text-green-400 text-sm font-mono">terminal</span>
        </div>
        <Link
          to="/"
          className="p-1 hover:bg-red-500/20 rounded transition-colors focus:outline-none focus-visible:outline-none"
          aria-label="Close terminal and return to landing page"
          style={{ outline: 'none' }}
          onMouseDown={(e) => e.preventDefault()}
        >
          <X className="w-5 h-5 text-red-400 hover:text-red-300" />
        </Link>
      </div>

      {/* Output area */}
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto px-4 py-3 font-mono text-sm space-y-2 terminal-scrollbar"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(0, 255, 0, 0.3) transparent'
        }}
      >
        {outputHistory.map((output, index) => (
          <div key={index} className="mb-2">
            {output.type !== 'clear' && <CommandOutput output={output} />}
          </div>
        ))}
        <div 
          className="sr-only" 
          aria-live="polite" 
          aria-atomic="true"
          role="status"
        >
          {outputHistory.length > 0 && outputHistory[outputHistory.length - 1]?.type !== 'clear' 
            ? 'Command executed' 
            : ''}
        </div>
        <div className="h-4"></div>
      </div>

      {/* Input area */}
      <div className="border-t border-green-500/50 bg-black/50 px-4 py-2">
        <form onSubmit={handleSubmit} className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <span className="text-green-400 font-mono select-none">{currentPrompt}</span>
          <div className="flex-1 relative flex items-center min-w-0">
            {!isInputFocused && (
              <span className="absolute left-0 text-green-300 font-mono pointer-events-none z-10">
                █
              </span>
            )}
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setAutocompleteIndex(-1);
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                setIsInputFocused(true);
                setHasBeenFocused(true);
              }}
              onBlur={() => setIsInputFocused(false)}
              className="flex-1 bg-transparent text-green-300 font-mono outline-none focus:outline-none min-w-0 relative z-0"
              autoComplete="off"
              spellCheck="false"
              aria-label="Terminal command input"
              style={{ 
                caretColor: isInputFocused ? '#86efac' : 'transparent'
              }}
            />
          </div>
        </form>
        {autocompleteSuggestions.length > 0 && autocompleteIndex >= 0 && (
          <div className="text-green-400/60 text-xs font-mono mt-1">
            Suggestion: {autocompleteSuggestions[autocompleteIndex]}
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;

