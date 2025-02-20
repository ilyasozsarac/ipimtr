import React, { useState } from 'react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/solid';

interface InfoCardProps {
  label: string;
  value: string;
  field: string;
  isIP?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({ label, value, field, isIP = false }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer
        ${isIP ? 'p-6 border-2 border-blue-500' : 'p-5'}`}
      onClick={copyToClipboard}
    >
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-700">
            {label}
          </h3>
          <div className="relative">
            <ClipboardDocumentIcon className={`${isIP ? 'h-6 w-6' : 'h-5 w-5'} text-gray-400 hover:text-gray-600`} />
            {copied && (
              <span className="absolute -top-8 -left-16 bg-blue-500 text-white text-xs px-2 py-1 rounded-lg shadow-md">
                Copied!
              </span>
            )}
          </div>
        </div>
        <p className={`${isIP ? 'text-3xl font-bold text-gray-800' : 'text-lg text-gray-700'} break-all`}>
          {value}
        </p>
        {isIP && (
          <div className="mt-2 inline-flex items-center text-sm text-blue-600">
            <span className="mr-2">●</span>
            <span>Click to copy</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
