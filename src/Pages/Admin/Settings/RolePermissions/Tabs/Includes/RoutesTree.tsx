import React from 'react';

interface Route {
  uri: string;
  uri_methods: string;
  slug: string;
  title: string;
  folder: string;
  hidden: boolean;
  children?: Routes;
}

interface Routes {
  [key: string]: {
    routes: Route[];
    children: Routes;
  };
}

interface Props {
  routes: Routes;
  handleSubmit: (checkboxStates: any[]) => void; // Update the type of handleSubmit accordingly
}

function handleToggle(key: string) {
  const target = document.getElementById(key);
  target?.classList.toggle('d-none');
}

function handleToggleCheck(key: string) {
  const target = document.getElementById(`${key}-checkbox`) as HTMLInputElement;
  const inputs = document.querySelectorAll(`#${key} input`);

  if (target instanceof HTMLInputElement) {
    inputs.forEach((input) => (input.checked = target.checked));
  }
}

function handleCheckedSingle(key: string) {
  const target = document.querySelector<HTMLInputElement>(`#${key}-checkbox`);

  if (target) {
    const checked = document.querySelectorAll<HTMLInputElement>(`#${key} input[type="checkbox"]:checked`);
    target.checked = checked.length > 0;
  }

  // Implement the functionality here
}

function getAllCheckboxStates() {
  const inputs = document.querySelectorAll<HTMLInputElement>(`.nested-routes.main input[type="checkbox"]`);

  const checkboxStates = [];

  for (const input of inputs) {
    if (input.checked) {
      checkboxStates.push(input.value);
    }
  }

  return checkboxStates;
}

const RoutesTree: React.FC<Props> = ({ routes, handleSubmit }) => {
  return (
    <div className='bg-gray-50 shadow sm:w-full p-2'>
      <form
        action=''
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          handleSubmit(getAllCheckboxStates());
        }}
      >
        <ul className='list-unstyled nested-routes main'>
          {renderRoutes(routes, 0, '')}
        </ul>
        <div className='d-flex justify-content-end'>
          <button type="submit" className="btn btn-info text-white">Save checked</button>
        </div>
      </form>
    </div>
  );
};

const renderRoutes = (
  routes: Routes,
  indent = 0,
  prevFolderName = ''
) => {
  indent += 2;

  return Object.keys(routes).map((key) => {
    let { children } = routes[key];
    const routeList = children?.routes || [];

    let others;
    if (children) {
      const { routes: unwanted, ...rest } = children;
      others = rest;
    }

    children = others;

    const currentId = key;

    return (
      <li key={currentId} className='mt-1'>
        <div className='toggler-section mb-2 px-1 border bg-white d-flex rounded-lg'>
          <label className='form-check-label px-0.5 d-flex align-items-center cursor-pointer'><input type='checkbox' id={`${currentId}-checkbox`} value={[(prevFolderName + '/' + key).replace(/^\//, ''), key]} className='form-check-input me-2' onClick={() => handleToggleCheck(currentId)} /></label>
          <label className='toggler p-2 text-base flex-grow-1' onClick={() => handleToggle(currentId)}>{(prevFolderName + '/' + key).replace(/^\//, '')}</label>
        </div>

        <ul id={currentId} className={`list-unstyled ms-${indent} d-none my-1`}>
          {routeList.length > 0 && (
            <>
              {routeList.map((route, i) => (
                <li className='link' key={`${i}+${key}_${route.slug}`}>
                  <label className="form-check-label py-1 px-3 cursor-pointer" title={route.uri_methods}>
                    <input type='checkbox' value={[route.uri_methods, route.title]} onClick={() => handleCheckedSingle(currentId)} className="form-check-input me-2" />
                    {route.title}
                  </label>
                </li>
              ))}
            </>
          )}

          {children && Object.keys(children).length > 0 && (
            <li className={`has-dropdown ml-${indent}`}>
              <ul className='list-unstyled dropdown'>
                {renderRoutes(children, indent, prevFolderName + '/' + key)}
              </ul>
            </li>
          )}
        </ul>
      </li>
    );
  });
};

export default RoutesTree;
