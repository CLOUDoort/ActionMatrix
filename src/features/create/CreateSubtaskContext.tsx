import type { ActionInterface, ValueInterface } from 'Create';
import type { Subtask, SubtaskItem } from 'Task';
import { ReactNode, createContext, useContext, useReducer } from 'react';

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
    case 'subtask/updated': {
      const { prev, cur } = action.payload;
      if (prev.difficulty !== cur.difficulty) {
        return {
          ...state,
          [prev.difficulty]: state[prev.difficulty].filter((el) => el.id !== prev.id),
          [cur.difficulty]: [...state[cur.difficulty], cur], // 새로운 난이도 배열에 추가
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
    <CreateSubtaskContext.Provider value={{ subtask, createSubtask, updateSubtask, deleteSubtask, clearSubtask }}>
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
