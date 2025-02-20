import React from 'react';

interface LocationProps {
  location: string;
  region: string;
  postal: string;
  timezone: string;
  localTime: string;
}

const Location: React.FC<LocationProps> = ({ location, region, postal, timezone, localTime }) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Location</h3>
        <p className="text-gray-600">{location}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Region</h3>
        <p className="text-gray-600">{region}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Postal Code</h3>
        <p className="text-gray-600">{postal}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Time Zone</h3>
        <p className="text-gray-600">{timezone}</p>
        <p className="text-sm text-gray-500 mt-1">{localTime}</p>
      </div>
    </div>
  );
};

export default Location;
