import { ReactNode, createContext, useContext, useReducer } from 'react';
import { toast } from 'react-toastify';
import type { Subtask, SubtaskItem } from 'Task';

interface ValueInterface {
  subtask: Subtask;
  initSubtask: (subtask: Subtask) => void;
  createSubtask: (subtask: SubtaskItem) => void;
  modifySubtask: (pre: SubtaskItem, cur: SubtaskItem) => void;
  deleteSubtask: (subtask: SubtaskItem) => void;
  clearSubtask: () => void;
}

type ActionInterface = {
  type: string;
  payload?: any;
};

const EditSubtaskContext = createContext<ValueInterface | null>(null);

const initialState = {
  hard: [],
  normal: [],
  easy: [],
};

const reducer = (state: Subtask, action: ActionInterface): Subtask => {
  switch (action.type) {
    case 'subtask/init': {
      return {
        ...action.payload,
      };
    }
    case 'subtask/created': {
      const newTask = action.payload;
      const cur = state[newTask.difficulty] ? [...state[newTask.difficulty], newTask] : [newTask];
      return {
        ...state,
        [action.payload.difficulty]: cur,
      };
    }
    case 'subtask/modified': {
      const { prev, cur } = action.payload;
      const curArray = state[cur] ? [...state[cur.difficulty], cur] : [cur];
      if (prev.difficulty !== cur.difficulty) {
        return {
          ...state,
          [prev.difficulty]: state[prev.difficulty].filter((el) => el.id !== prev.id),
          [cur.difficulty]: curArray,
        };
      }
      return {
        ...state,
        [cur.difficulty]: state[cur.difficulty].map((el) => (el.id === cur.id ? cur : el)),
      };
    }
    case 'subtask/deleted': {
      return {
        ...state,
        [action.payload.difficulty]: state[action.payload.difficulty].filter((el) => el.id !== action.payload.id),
      };
    }
    case 'subtask/clear': {
      return initialState;
    }
    default:
      throw new Error('Unknown Action type.');
  }
};

const EditSubtaskContextProvider = ({ children }: { children: ReactNode }) => {
  const [subtask, dispatch] = useReducer(reducer, initialState);

  const initSubtask = (subtask: Subtask) => {
    dispatch({
      type: 'subtask/init',
      payload: subtask,
    });
  };

  const createSubtask = (subtask: SubtaskItem) => {
    dispatch({
      type: 'subtask/created',
      payload: subtask,
    });
    toast.success('Create Subtask!');
  };

  const modifySubtask = (prev: SubtaskItem, cur: SubtaskItem) => {
    dispatch({
      type: 'subtask/modified',
      payload: {
        prev,
        cur,
      },
    });
    toast.success('Modify Subtask!');
  };

  const deleteSubtask = (subtask: SubtaskItem) => {
    dispatch({
      type: 'subtask/deleted',
      payload: subtask,
    });
    toast.success('Delete Subtask!');
  };

  const clearSubtask = () => {
    dispatch({
      type: 'subtask/clear',
    });
  };

  return (
    <EditSubtaskContext.Provider
      value={{ subtask, initSubtask, createSubtask, modifySubtask, deleteSubtask, clearSubtask }}
    >
      {children}
    </EditSubtaskContext.Provider>
  );
};

const useEditSubtask = () => {
  const context = useContext(EditSubtaskContext);
  if (context === null) throw new Error('Subtask Context was used outside the SubtaskProvider');
  return context;
};

export { EditSubtaskContextProvider, useEditSubtask };
