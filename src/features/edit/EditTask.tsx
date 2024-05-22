import { Form, LoaderFunction, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { editTask, getTask } from '@/services/apiTasks';
import { useEffect, useState } from 'react';

import Button from '@/ui/Button';
import EditSubtask from './EditSubtask';
import FormLabel from '@/ui/FormLabel';
import { SubtaskItem } from 'Task';
import Tag from '@/ui/Tag';
import { toast } from 'react-toastify';
import { useEditSubtask } from './EditSubtaskContext';

const EditTask = () => {
  const task: any = useLoaderData();
  const navigate = useNavigate();
  const [flashBorder, setFlashBorder] = useState(false);
  const { subtask, initSubtask } = useEditSubtask();

  const [form, setForm] = useState({
    title: task.title,
    details: task.details,
    priority: task.priority,
    difficulty: task.difficulty ?? '',
    option: task.difficulty ? true : false,
  });
  const { title, details, priority, difficulty, option } = form;

  const handleState = (target: string, value: string | boolean) => {
    setForm({ ...form, [target]: value });
  };

  useEffect(() => initSubtask(task.subtask), []);

  return (
    <section className="flex flex-col w-full max-h-[50rem] gap-3 px-5 py-9 lg:px-14 max-w-7xl">
      <div className="flex items-center justify-between h-16 pb-5 lg:text-h3 text-h4 ">
        <p>Edit Task</p>
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
          <input type="hidden" name="taskId" value={task.id} />
          <input type="hidden" name="progress" value={task.progress} />
        </Form>
        <EditSubtask priority={priority} option={option} flashHandler={setFlashBorder} />
      </div>
    </section>
  );
};

export const loader: LoaderFunction<any> = ({ params }: any) => {
  const task = getTask(params.type, params.id);
  return task;
};

export const action = async ({ request }: { request: any }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { taskId, title, details, priority, option, progress } = data;

  if (!title || !details) {
    toast.error('Not enough content!');
    return null;
  }

  const base = { id: taskId, title, details, priority };

  let task;
  if (option === 'true') task = { ...base, difficulty: data.difficulty, progress: Number(progress) };
  else {
    const temp = JSON.parse(String(data.subtask));
    const subtaskNum = Number(Object.keys(temp).reduce((acc, cur) => acc + temp[cur].length, 0)) || 0;
    const completedSubtaskNum =
      Number(
        Object.keys(temp)
          .filter((el) => temp[el].length !== 0)
          .reduce((acc, cur) => temp[cur].filter((el: SubtaskItem) => el.complete).length + acc, 0),
      ) || 0;
    const progress = Math.trunc((completedSubtaskNum / subtaskNum) * 100);
    Object.keys(temp)
      .filter((el) => temp[el].length !== 0)
      .forEach((key) => {
        temp[key] = temp[key].map((item: SubtaskItem) => {
          return { ...item, taskId };
        });
      });

    task = { ...base, progress, subtask: temp, subtaskNum, completedSubtaskNum };
  }
  const next = editTask(task);
  toast.success('Edit Task!');
  return redirect(`/app/${next}`);
};

export default EditTask;
