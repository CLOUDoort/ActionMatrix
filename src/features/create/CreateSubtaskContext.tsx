import { SubtaskInterface, SubtaskItemInterface } from 'Task';
import { ReactNode, createContext, useContext, useReducer } from 'react';

interface ValueInterface {
  subtask: SubtaskInterface;
  createSubtask: (subtask: SubtaskItemInterface) => void;
  modifySubtask: (pre: SubtaskItemInterface, cur: SubtaskItemInterface) => void;
  deleteSubtask: (subtask: SubtaskItemInterface) => void;
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

const reducer = (state: SubtaskInterface, action: ActionInterface): SubtaskInterface => {
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

  const createSubtask = (subtask: SubtaskItemInterface) => {
    dispatch({
      type: 'subtask/created',
      payload: subtask,
    });
  };

  const modifySubtask = (prev: SubtaskItemInterface, cur: SubtaskItemInterface) => {
    dispatch({
      type: 'subtask/modified',
      payload: {
        prev,
        cur,
      },
    });
  };

  const deleteSubtask = (subtask: SubtaskItemInterface) => {
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
