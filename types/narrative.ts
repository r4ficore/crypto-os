export type NarrativeStatus = 'rising' | 'stable' | 'cooling';

export type NarrativeItem = {
  name: string;
  status: NarrativeStatus;
  notes: string;
  watchFactors?: string[];
};
