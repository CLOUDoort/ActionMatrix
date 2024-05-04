declare module 'Form' {
  export interface SubtaskFormItemInterface {
    title: string;
    details: string;
    difficulty: string;
  }
  export interface SubtaskFormInterface {
    [key: string]: SubtaskFormItemInterface[];
  }
  export interface TaskFormInterface {
    title: string;
    details: string;
    priority: string;
    option: boolean;
    difficulty: string;
  }
}
