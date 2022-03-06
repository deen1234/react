import { HotelServices } from 'app/modules/Config/ducks/types';
import React, { ReactNode } from 'react';
import './style.less';

interface FacilityCardProps {
  title: string;
  icon: ReactNode;
  lists: HotelServices[];
}

const FacilityCard: React.FC<FacilityCardProps> = ({ title, icon, lists }: FacilityCardProps) => {
  return (
    <div className="facility-card-container">
      {icon}
      <h1 className="facility-title">{title}</h1>
      <ul className="list-section">
        {lists.map((list) => (
          <li key={list.id}>{list.service}</li>
        ))}
      </ul>
    </div>
  );
};

export default FacilityCard;
