import { ReactNode, createContext, useContext, useReducer } from 'react';
import type { Subtask, SubtaskItem } from 'Task';
import type { SubtaskAction, SubtaskValue } from 'Create';

const CreateSubtaskContext = createContext<SubtaskValue | null>(null);

const initialState = {
  hard: [],
  normal: [],
  easy: [],
};

const reducer = (state: Subtask, action: SubtaskAction): Subtask => {
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
    case 'subtask/updated': {
      const { prev, cur } = action.payload;
      const curArray = state[cur.difficulty] ? [...state[cur.difficulty], cur] : [cur];
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

const CreateSubtaskContextProvider = ({ children }: { children: ReactNode }) => {
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
  };

  const updateSubtask = (prev: SubtaskItem, cur: SubtaskItem) => {
    dispatch({
      type: 'subtask/updated',
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
    <CreateSubtaskContext.Provider
      value={{ subtask, initSubtask, createSubtask, updateSubtask, deleteSubtask, clearSubtask }}
    >
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
