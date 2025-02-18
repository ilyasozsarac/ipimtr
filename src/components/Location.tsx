import React from 'react';

interface LocationProps {
  location: string;
  region: string;
  postal: string;
  timezone: string;
}

const Location: React.FC<LocationProps> = ({ location, region, postal, timezone }) => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-700 mb-2">Location Details</h3>
      <p className="text-2xl font-bold text-gray-800 mb-4">{location}</p>
      <div className="space-y-2">
        <div>
          <span className="text-gray-500">Region:</span>
          <span className="ml-2 text-gray-700">{region}</span>
        </div>
        <div>
          <span className="text-gray-500">Postal Code:</span>
          <span className="ml-2 text-gray-700">{postal}</span>
        </div>
        <div>
          <span className="text-gray-500">Timezone:</span>
          <span className="ml-2 text-gray-700">{timezone}</span>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-500">
      </div>
    </div>
  );
};

export default Location;
