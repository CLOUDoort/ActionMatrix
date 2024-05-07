declare module 'Task' {
  export interface SubtaskItemInterface {
    id: string;
    title: string;
    details: string;
    difficulty: string;
    progress: number;
    priority: string;
  }
  export interface SubtaskInterface {
    [key: string]: SubtaskItemInterface[];
  }
  export interface TaskInterface {
    id: string;
    title: string;
    details: string;
    priority: string;
    progress: number;
    difficulty?: string;
    subtask?: SubtaskInterface;
  }
}
