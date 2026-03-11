import React, { memo } from 'react';
import { Link } from 'react-router-dom';

// Tilt disabled — these are plain passthrough wrappers
export const Tiltable = memo(function Tiltable({ children, className = "", tiltOptions, ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
});

export const TiltableButton = memo(function TiltableButton({ children, className, tiltOptions, ...props }) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
});

export const TiltableLink = memo(function TiltableLink({ children, className, tiltOptions, to, ...props }) {
  return (
    <Link to={to} className={className} {...props}>
      {children}
    </Link>
  );
});

export const TiltableAnchor = memo(function TiltableAnchor({ children, className, tiltOptions, ...props }) {
  return (
    <a className={className} {...props}>
      {children}
    </a>
  );
});
