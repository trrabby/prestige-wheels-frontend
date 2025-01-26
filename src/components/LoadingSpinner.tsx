import { CgSpinnerTwoAlt } from "react-icons/cg";

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <CgSpinnerTwoAlt className="animate-spin" />
    </div>
  );
};
