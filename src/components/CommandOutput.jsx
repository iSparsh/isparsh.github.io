import React from 'react';

const CommandOutput = ({ output }) => {
  if (!output || !output.content) {
    return null;
  }

  const renderContent = (item, index) => {
    switch (item.type) {
      case 'header':
        return (
          <div key={index} className="font-bold text-lg mb-2 text-green-400">
            {item.text}
          </div>
        );

      case 'paragraph':
        return (
          <div key={index} className="mb-1 text-green-300 font-normal">
            {item.text}
          </div>
        );

      case 'list':
        return (
          <ul key={index} className="list-none mb-2 ml-4 space-y-1">
            {item.items.map((listItem, idx) => (
              <li key={idx} className="text-green-300 font-normal">
                <span className="text-green-400 mr-2">•</span>
                {listItem}
              </li>
            ))}
          </ul>
        );

      default:
        return null;
    }
  };

  // Determine output styling based on type
  const getOutputClass = () => {
    switch (output.type) {
      case 'error':
        return 'text-red-400';
      case 'success':
        return 'text-green-400';
      case 'easter-egg':
        return 'text-yellow-400 font-bold';
      case 'loading':
        return 'text-green-400/60 italic';
      case 'command':
        return 'text-green-400';
      case 'greeting':
        return '';
      default:
        return '';
    }
  };

  return (
    <div className={`${getOutputClass()}`}>
      {output.content.map((item, index) => renderContent(item, index))}
    </div>
  );
};

export default CommandOutput;

