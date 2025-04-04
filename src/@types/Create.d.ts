declare module 'Create' {
  export interface SubtaskValue {
    subtask: Subtask;
    initSubtask: (subtask: Subtask) => void;
    createSubtask: (subtask: SubtaskItem) => void;
    updateSubtask: (pre: SubtaskItem, cur: SubtaskItem) => void;
    deleteSubtask: (subtask: SubtaskItem) => void;
    clearSubtask: () => void;
  }

  export type SubtaskAction = {
    type: string;
    payload?: any;
  };

  export interface Inputs {
    title: string;
    details: string;
  }

  export interface CreateSubtaskProps {
    priority: string;
    option: boolean;
    flashHandler: Dispatch<SetStateAction<boolean>>;
  }

  export interface CreateSubtaskFormProps {
    priority: string;
    handleFormState: () => void;
    update?: SubtaskItem;
  }

  export interface FormLabelProps {
    name?: string;
    children: ReactNode;
    error?: string;
  }

  export interface FormTagProps {
    tag: string;
    select: string;
    handler: Dispatch<SetStateAction<string>>;
  }
}
