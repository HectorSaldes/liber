import React from 'react';
import { Skeleton } from 'primereact/skeleton';

export default function IconSkeleton() {
  const rows = [];
  for (let i = 0; i < 12; i += 1) {
    const data = (
      <div className="p-col-6 p-sm-4 p-md-2" key={i}>
        <Skeleton height="4rem" />
      </div>
    );
    rows.push(data);
  }
  return <>{rows}</>;
}
