export namespace VoteModel {
  export type T = {
    id: number;
    userId: number;
    candidateId: number;
    disabled: boolean;
    createdAt: Date;
    updatedAt: Date;
  };

  export type returnExportValue = {
    candidateId: number;
    nationalId: string;
  };
}
