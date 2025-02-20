import React from 'react';

interface AdditionalInfoProps {
  data: { [key: string]: any };
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ data }) => {
  return (
    <div>
      <h3 className="font-medium text-gray-500 text-base" style={{ fontWeight: 'bold' }}>Additional Information</h3>
      <div className="space-y-2">
        {Object.entries(data).map(([key, value]) => (
          <div key={key}>
            <span className="text-gray-500">{key}:</span>
            <span className="ml-2 text-gray-700">{String(value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdditionalInfo;
