export type Endeavor = {
  partitionKey?: string;
  rowKey?: string;
  isAttainable: boolean;
  isActive: boolean;
  archived: boolean;
  completed: boolean;
  isAmbient: boolean | undefined;
  name: Name;
  instantAim: InstantAim | undefined;
  longAim: LongAim | undefined;
  abstract: Abstract | undefined;
  tasks: Task[] | undefined;
  ideas: Idea[] | undefined;
  problems: Problem[] | undefined;
  resources: Resource[] | undefined;
  directives: Directive[] | undefined;
  timeframe: TimeFrame | undefined;
  score: Score | undefined;
  notes: string;
};

type Name = string;

type InstantAim = string;

type LongAim = string;

type Abstract = string;

export type Task = {
  name: string;
  description?: string;
};

export type Idea = {
  name: string;
  description?: string;
};

export type Problem = {
  name: string;
  description?: string;
};

export type Directive = {
  name: string;
  description?: string;
};

export type Resource = {
  name: string;
  description?: string;
};

export type TimeFrame = {
  hasTimeFrame: boolean;
  start: Date;
  end: Date;
};

export type Score = {
  hasScore: boolean;
  upvotes: number;
  downvotes?: number;
  neautralvotes?: number;
};
