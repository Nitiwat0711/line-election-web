import { differenceInYears } from "date-fns";
export const calculateDiffYear = (dob: string) => {
  const diff = differenceInYears(new Date(), new Date(dob));
  return diff;
};
