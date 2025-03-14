import { ReactNode, useState } from 'react';

const HomeFeature = () => {
  const [state, setState] = useState('newTask');
  const handleState = (data: string) => setState(data);

  return (
    <section className="flex flex-col w-full">
      <h2 className="lg:text-h2 md:text-h3 sm:text-h4 text-h5 text-start">Features of the product</h2>
      <hr className="my-3 lg:my-5" />
      <div className="flex flex-wrap gap-7 lg:gap-0 md:gap-3 item-center">
        <figcaption className="w-full">
          <ul className="space-y-2 text-xs lg:space-y-7 lg:text-h4 md:text-h5 sm:text-base text-start">
            <ListItem state="newTask" cur={state}>
              <p onClick={() => handleState('newTask')}>Prioritize tasks and create subtasks as needed.</p>
            </ListItem>
            <ListItem state="filter" cur={state}>
              <p onClick={() => handleState('filter')}>Filter what you want with priority and difficulty.</p>
            </ListItem>
            <ListItem state="details" cur={state}>
              <p onClick={() => handleState('details')}>Check the details and progress of the work.</p>
            </ListItem>
            <ListItem state="focus" cur={state}>
              <p onClick={() => handleState('focus')}>Just focus on one thing.</p>
            </ListItem>
          </ul>
        </figcaption>
        <figure className="w-full sm:mt-10">
          <img className="border-2 rounded-2xl" src={`/${state}.png`} alt={state} />
        </figure>
      </div>
    </section>
  );
};

export default HomeFeature;

const ListItem = ({ state, cur, children }: { state: string; cur: string; children: ReactNode }) => {
  return (
    <li className={`${state !== cur ? 'opacity-20' : ''} transition-opacity duration-300 cursor-pointer`}>
      {children}
    </li>
  );
};
