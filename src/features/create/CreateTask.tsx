import { Form, redirect, useNavigate } from 'react-router-dom';

import Button from '../../ui/Button';
import CreateSubtask from './CreateSubtask';
import { SubtaskItem } from 'Task';
import Tag from '../../ui/Tag';
import type { TaskForm } from 'Form';
import { createTask } from '../../services/apiCreateTask';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import { useCreateSubtask } from './CreateSubtaskContext';
import { useState } from 'react';
import FormLabel from '@/ui/FormLabel';

const initialFormState: TaskForm = {
  title: '',
  details: '',
  priority: 'high',
  option: true,
  difficulty: 'hard',
};

const CreateTask = () => {
  const navigate = useNavigate();
  const [flashBorder, setFlashBorder] = useState(false);
  const [state, setState] = useState(initialFormState);
  const { title, details, priority, option, difficulty } = state;
  const { subtask } = useCreateSubtask();

  const handleState = (key: string, value: string | boolean) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section className="flex flex-col w-full max-h-[50rem] gap-3 px-5 py-9 lg:px-14 max-w-7xl">
      <div className="flex items-center justify-between h-16 pb-5 lg:text-h3 text-h4 ">
        <p>New Task</p>
      </div>
      <div className={`flex-1 flex flex-col xl:flex-row gap-5 pb-10`}>
        <Form
          method="POST"
          className="w-full p-8 space-y-4 border rounded-md border-slate-200 xl:w-[29rem] min-w-[25rem] h-full"
        >
          <FormLabel name="Title">
            <input
              type="text"
              id="title"
              name="title"
              className="p-2 border-2 rounded-md border-slate-200"
              placeholder="Title"
              value={title}
              onChange={(e) => handleState('title', e.target.value)}
            />
          </FormLabel>
          <FormLabel name="Details">
            <textarea
              id="details"
              name="details"
              className="p-2 border-2 rounded-md border-slate-200 min-h-20"
              placeholder="Details"
              value={details}
              onChange={(e) => handleState('details', e.target.value)}
            />
          </FormLabel>
          <FormLabel name="Priority">
            <div className="flex gap-2">
              <Tag type="high" select={priority} handler={() => handleState('priority', 'high')} />
              <Tag type="medium" select={priority} handler={() => handleState('priority', 'medium')} />
              <Tag type="low" select={priority} handler={() => handleState('priority', 'low')} />
            </div>
          </FormLabel>
          <FormLabel name="Options">
            <div className="flex gap-2">
              <Button type={`option${option}`} handler={() => handleState('option', true)}>
                Difficulty
              </Button>
              <Button
                type={`option${!option}`}
                handler={() => handleState('option', false)}
                conditionStyle={`${flashBorder ? 'border-red-400 bg-red-300' : ''}`}
              >
                Divide
              </Button>
            </div>
            {option && (
              <div className="flex gap-2">
                <Tag type="hard" select={difficulty} handler={() => handleState('difficulty', 'hard')} />
                <Tag type="normal" select={difficulty} handler={() => handleState('difficulty', 'normal')} />
                <Tag type="easy" select={difficulty} handler={() => handleState('difficulty', 'easy')} />
              </div>
            )}
          </FormLabel>
          <div className="flex justify-end gap-2">
            <Button type="cancel" handler={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="save" submit={true}>
              Save
            </Button>
          </div>

          {/* input을 통해 data 전달 */}
          <input
            type="hidden"
            name={option ? 'difficulty' : 'subtask'}
            value={option ? difficulty : JSON.stringify(subtask)}
          />
          <input type="hidden" name="priority" value={priority} />
          <input type="hidden" name="option" value={JSON.stringify(option)} />
        </Form>
        <CreateSubtask priority={priority} option={option} flashHandler={setFlashBorder} />
      </div>
    </section>
  );
};

export const action =
  ({ clearSubtask }: { clearSubtask: () => void }) =>
  async ({ request }: { request: any }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const { title, details, priority, option } = data;

    if (!title || !details) {
      toast.error('Not enough content!');
      return null;
    }

    const taskId = nanoid(8);
    const base = { id: taskId, title, details, priority, progress: 0 };

    let task;
    if (option === 'true') task = { ...base, difficulty: data.difficulty };
    else {
      const temp = JSON.parse(String(data.subtask));
      const subtaskNum = Object.keys(temp).reduce((acc, cur) => acc + temp[cur].length, 0);
      Object.keys(temp)
        .filter((el) => temp[el].length !== 0)
        .forEach((key) => {
          temp[key] = temp[key].map((item: SubtaskItem) => {
            return { ...item, taskId };
          });
        });

      task = { ...base, subtask: temp, subtaskNum, completedSubtaskNum: 0 };
    }
    createTask('todo', task);
    clearSubtask();
    toast.success('Create Task!');
    return redirect('/app/todo');
  };

export default CreateTask;
