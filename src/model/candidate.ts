export namespace CandidateModel {
  export type T = {
    id: number;
    name: string;
    dob: string;
    bioLink?: string;
    imageLink?: string;
    policy: string;
    votedCount: number;
    disabled: boolean;
    createdAt: Date;
    updatedAt: Date;
  };

  export type returnValue = {
    id: number;
    name: string;
    dob: string;
    bioLink: string;
    imageLink: string;
    policy: string;
    votedCount: number;
    percentage?: string;
  };

  export type electionResultValue = {
    id: number;
    name: string;
    dob: string;
    bioLink: string;
    imageLink: string;
    policy: string;
    votedCount: number;
    percentage: string;
  };
}
