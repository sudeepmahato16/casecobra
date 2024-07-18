import React, { FC, ReactNode } from "react";

interface FormItemProps {
  children: ReactNode;
  error?: string;
}

const FormItem: FC<FormItemProps> = ({ children, error }) => {
  return (
    <div className="flex flex-col gap-2.5">
      {children}
      {error ? <small className="text-red-500">{error}</small> : null}
    </div>
  );
};

export default FormItem;
