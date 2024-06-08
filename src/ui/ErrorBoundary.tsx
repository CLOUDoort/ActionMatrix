import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

import { TiArrowBack } from 'react-icons/ti';

const ErrorBoundary = () => {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.data.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Unknown error';
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center max-w-[70%] gap-5">
        <h3 className="text-h3">Something went wrong 😢</h3>
        <p className="font-paragraph">{errorMessage}</p>
        <Link to="/" replace className="flex items-center gap-2">
          <TiArrowBack size={25} />
          <span>Go back</span>
        </Link>
      </div>
    </div>
  );
};

export default ErrorBoundary;
