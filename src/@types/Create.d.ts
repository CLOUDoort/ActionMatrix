declare module 'Create' {
  export interface ValueInterface {
    subtask: Subtask;
    createSubtask: (subtask: SubtaskItem) => void;
    updateSubtask: (pre: SubtaskItem, cur: SubtaskItem) => void;
    deleteSubtask: (subtask: SubtaskItem) => void;
    clearSubtask: () => void;
  }

  export type ActionInterface = {
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

  export interface LabelFormProps {
    name?: string;
    children: ReactNode;
    error?: string;
  }

  export interface TagFormProps {
    tag: string;
    select: string;
    handler: Dispatch<SetStateAction<string>>;
  }
}
