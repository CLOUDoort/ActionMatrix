declare module 'Task' {
  export interface SubtaskItem {
    id: string;
    title: string;
    details: string;
    difficulty: string;
    progress: number;
    priority: string;
  }
  export interface Subtask {
    [key: string]: SubtaskItem[];
  }
  export interface Task {
    id: string;
    title: string;
    details: string;
    priority: string;
    progress: number;
    difficulty?: string;
    subtask?: Subtask;
  }
}
