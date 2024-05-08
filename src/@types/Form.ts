declare module 'Form' {
  export interface SubtaskFormItem {
    title: string;
    details: string;
    difficulty: string;
  }
  export interface SubtaskForm {
    [key: string]: SubtaskFormItem[];
  }
  export interface TaskForm {
    title: string;
    details: string;
    priority: string;
    option: boolean;
    difficulty: string;
  }
}
