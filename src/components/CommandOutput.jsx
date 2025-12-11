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

      case 'project':
        return (
          <div key={index} className="mb-4 border-l-2 border-green-500/50 pl-4">
            <div className="font-bold text-green-400 mb-2">{item.title}</div>
            <div className="text-green-300 font-normal mb-2">{item.description}</div>
            {item.results && (
              <div className="text-green-300 font-semibold mb-2">{item.results}</div>
            )}
            {item.features && item.features.length > 0 && (
              <ul className="list-none mb-2 ml-4 space-y-1">
                {item.features.map((feature, idx) => (
                  <li key={idx} className="text-green-300 font-normal">
                    <span className="text-green-400 mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

      case 'research':
        return (
          <div key={index} className="mb-4 border-l-2 border-green-500/50 pl-4">
            <div className="font-bold text-green-400 mb-1">{item.title}</div>
            {item.period && (
              <div className="text-green-300/80 text-sm mb-1">{item.period}</div>
            )}
            {item.role && (
              <div className="text-green-300/80 text-sm mb-1">{item.role}</div>
            )}
            {item.mentor && (
              <div className="text-green-300/80 text-sm mb-2">Mentor: {item.mentor}</div>
            )}
            {item.paper && (
              <div className="text-green-300 font-semibold mb-2">Paper: {item.paper}</div>
            )}
            {item.description && (
              <div className="text-green-300 font-normal mb-2">{item.description}</div>
            )}
            {item.achievement && (
              <div className="text-green-300 italic mb-2">{item.achievement}</div>
            )}
            {item.status && (
              <div className="text-green-300 italic mb-2">{item.status}</div>
            )}
          </div>
        );

      case 'contact':
      case 'email':
        // Only show email in terminal
        // Handle both 'contact' type (if JSON structure is correct) and 'email' type (if duplicate keys cause parsing issue)
        // Check if this is an email contact by looking for email-like value or label
        const isEmailContact = item.label === 'Email' || 
                              (item.value && item.value.includes('@')) ||
                              (item.type === 'email');
        if (!isEmailContact) {
          return null;
        }
        const contactContent = item.href ? (
          <a 
            href={item.href} 
            className="text-green-400 hover:text-green-300 underline"
          >
            {item.value}
          </a>
        ) : (
          <span>{item.value}</span>
        );
        return (
          <div key={index} className="mb-2 text-green-300 font-normal">
            <span className="text-green-400 font-semibold">{item.label || 'Email'}:</span> {contactContent}
          </div>
        );

      case 'resume':
        // Resume should be in public/assets for public access
        const baseUrl = typeof window !== 'undefined' ? (import.meta.env.BASE_URL || '/') : '/';
        const resumePath = `${baseUrl}assets/${item.file}`;
        return (
          <div key={index} className="mb-2 text-green-300 font-normal">
            <span className="text-green-400 font-semibold">Resume:</span>{' '}
            <a 
              href={resumePath} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 underline"
            >
              {item.file} (click to view)
            </a>
          </div>
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

