// CardProfile.tsx
import React from 'react';

interface CardProfileProps {
  name: string;
  available: boolean;
}

const CardProfile: React.FC<CardProfileProps> = ({ name, available }) => {
  return (
    <div className="card-profile">
      <div className="card-profile-initial">{name.charAt(0).toUpperCase()}</div>
      <div className={`card-profile-initial-available card-profile-initial-available-${available}`}>
      </div>
    </div>
  );
};

export default CardProfile;
