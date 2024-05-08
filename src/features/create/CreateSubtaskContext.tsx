import type { Subtask, SubtaskItem } from 'Task';
import { ReactNode, createContext, useContext, useReducer } from 'react';

interface ValueInterface {
  subtask: Subtask;
  createSubtask: (subtask: SubtaskItem) => void;
  modifySubtask: (pre: SubtaskItem, cur: SubtaskItem) => void;
  deleteSubtask: (subtask: SubtaskItem) => void;
  clearSubtask: () => void;
}

type ActionInterface = {
  type: string;
  payload?: any;
};

const CreateSubtaskContext = createContext<ValueInterface | null>(null);

const initialState = {
  hard: [],
  normal: [],
  easy: [],
};

const reducer = (state: Subtask, action: ActionInterface): Subtask => {
  switch (action.type) {
    case 'subtask/created': {
      return {
        ...state,
        [action.payload.difficulty]: [...state[action.payload.difficulty], action.payload],
      };
    }
    case 'subtask/modified': {
      return {
        ...state,
        [action.payload.prev.difficulty]: state[action.payload.prev.difficulty].filter(
          (el) => el.id !== action.payload.prev.id,
        ),
        [action.payload.cur.difficulty]: [...state[action.payload.cur.difficulty], action.payload.cur],
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

const CreateSubtaskContextProvider = ({ children }: { children: ReactNode }) => {
  const [subtask, dispatch] = useReducer(reducer, initialState);

  const createSubtask = (subtask: SubtaskItem) => {
    dispatch({
      type: 'subtask/created',
      payload: subtask,
    });
  };

  const modifySubtask = (prev: SubtaskItem, cur: SubtaskItem) => {
    dispatch({
      type: 'subtask/modified',
      payload: {
        prev,
        cur,
      },
    });
  };

  const deleteSubtask = (subtask: SubtaskItem) => {
    dispatch({
      type: 'subtask/deleted',
      payload: subtask,
    });
  };

  const clearSubtask = () => {
    dispatch({
      type: 'subtask/clear',
    });
  };

  return (
    <CreateSubtaskContext.Provider value={{ subtask, createSubtask, modifySubtask, deleteSubtask, clearSubtask }}>
      {children}
    </CreateSubtaskContext.Provider>
  );
};

const useCreateSubtask = () => {
  const context = useContext(CreateSubtaskContext);
  if (context === null) throw new Error('Subtask Context was used outside the SubtaskProvider');
  return context;
};

export { CreateSubtaskContextProvider, useCreateSubtask };
