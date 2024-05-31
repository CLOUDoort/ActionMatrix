import { ReactNode, useRef, useState } from 'react';

interface LensPosition {
  x: number;
  y: number;
  visible: boolean;
}

const HomeFeature = () => {
  const [lensPosition, setLensPosition] = useState<LensPosition>({ x: 0, y: 0, visible: false });
  const imgRef = useRef<HTMLImageElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = imgRef.current;
    const lens = lensRef.current;
    if (!img || !lens) return;

    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const lensX = Math.max(0, Math.min(x - lens.offsetWidth / 2, img.width - lens.offsetWidth));
    const lensY = Math.max(0, Math.min(y - lens.offsetHeight / 2, img.height - lens.offsetHeight));

    setLensPosition({ x: lensX, y: lensY, visible: true });
  };

  const handleMouseLeave = () => {
    setLensPosition((prev) => ({ ...prev, visible: false }));
  };

  const [state, setState] = useState('newTask');
  const handleState = (data: string) => setState(data);
  return (
    <section className="w-[90%] flex flex-col">
      <h2 className="lg:text-h2 md:text-h3 sm:text-h4 text-h5 text-start">Features of the product</h2>
      <hr className="my-3 lg:my-5" />
      <div className="flex flex-wrap gap-7 lg:gap-0 md:gap-3 item-center">
        <figcaption className="lg:min-w-[35rem] min-w-[17rem]">
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
        <figure className="relative w-full sm:mt-10" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <img
            className={`border-2 rounded-2xl transition-opacity duration-300`}
            cursor-pointer
            src={`/${state}.png`}
            alt={state}
            ref={imgRef}
          />
          <div
            ref={lensRef}
            className={`absolute border bg-no-repeat ${lensPosition.visible ? 'block' : 'hidden'} lg:w-[15rem] lg:h-[15rem] md:w-[10rem] md:h-[10rem] w-[5rem] h-[5rem] border-2 rounded-lg`}
            style={{
              top: `${lensPosition.y}px`,
              left: `${lensPosition.x}px`,
              backgroundImage: `url('/${state}.png')`,
              backgroundSize: `${imgRef.current?.width! * 1.5}px ${imgRef.current?.height! * 1.5}px`,
              backgroundPosition: `-${lensPosition.x * 1.5}px -${lensPosition.y * 1.5}px`,
            }}
          ></div>
        </figure>
      </div>
    </section>
  );
};

export default HomeFeature;

const ListItem = ({ state, cur, children }: { state: string; cur: string; children: ReactNode }) => {
  return (
    <li className={`${state !== cur ? 'opacity-20 transition-opacity duration-300' : ''} cursor-pointer`}>
      {children}
    </li>
  );
};
