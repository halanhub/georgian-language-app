
import * as React from "react"

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-md dark:bg-gray-800 dark:border-gray-700">
      {children}
    </div>
  );
};

export { Card };
