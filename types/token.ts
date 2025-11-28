export type TokenFormState = {
  name: string;
  narrative: string;
  userNotes?: string;
};

export type TokenChecklist = {
  title: string;
  narrative: string;
  narrativeStatus: string;
  narrativeNotes: string[];
  tokenomicsQuestions: string[];
  userNotes: string;
};
