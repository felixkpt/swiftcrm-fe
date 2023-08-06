import Str from "@/utils/Str"
import { useEffect, useState } from "react";
import RoutesTree2 from "./RoutesTree2";

// Define the Props interface for the RoutesTree component
interface Props {
  routes: Routes[];
  permissions: PermissionData[];
  allPermissions: PermissionData[];
  handleSubmit: ({ folders, permissions }: any) => void;
  saving: boolean;
}

// Constants used for managing the component behavior
const PARENT_FOLDER_ID_PREFIX = 'parent-folder-';
const MAIN_CONTAINER_CLASS = 'nested-routes';

function constructMenus() {
  const currentFolder = document.querySelectorAll(`div.${MAIN_CONTAINER_CLASS}.main-tree.tab-pane.active>div`)

  const topLevelFolders = document.querySelectorAll(`div.${MAIN_CONTAINER_CLASS}.main-tree.tab-pane>div`);

  return {current_folder: constructMenu(currentFolder, true), all_folders: constructMenu(topLevelFolders)}

}

function constructMenu(topLevelFolders, isCurrent = false) {
  const nestedRoutes = [];

  const counter = 0
  for (const container of topLevelFolders) {
    const input = container.querySelector(`input[id$="-parent-checkbox"]`) as HTMLInputElement;

    if (isCurrent || (input && (input.checked || input.indeterminate))) {

      const title = container.querySelector('.folder-title').value
      const children = constructMenuRecursively(container, counter);
      const icon = container.querySelector('input.folder-icon').value
      const hidden = container.querySelector('input.folder-hidden').checked

      nestedRoutes.push({ folder: input.value, title, icon, hidden, children, routes: getRoutes(container) });
    }
  }

  return nestedRoutes;
}

// Recursive function to construct the menu tree structure
function constructMenuRecursively(folderElement: HTMLElement, counter: number) {
  counter += 1

  const childrenContainers = folderElement?.querySelectorAll(`.COUNTER${counter}>div[id^="${PARENT_FOLDER_ID_PREFIX}"]`)

  const nestedRoutes = [];

  for (const container of childrenContainers) {
    const input = container.querySelector(`input[id$="-parent-checkbox"]`) as HTMLInputElement;

    if (input && (input.checked || input.indeterminate)) {
      const children = constructMenuRecursively(container, counter);

      const title = container.querySelector('.folder-title').value
      const icon = container.querySelector('input.folder-icon').value
      const hidden = container.querySelector('input.folder-hidden').checked

      nestedRoutes.push({ folder: input.value, title, icon, hidden, children, routes: getRoutes(container) });
    }
  }

  return nestedRoutes;
}

// Function to get the selected routes for a given parent container
function getRoutes(container: any) {
  const id = container.id
  const routes = container.querySelectorAll(`#chld-${id}-parent-children>.routes-table .route-section`)

  const items = []
  for (const route of routes) {

    const input = route.querySelector('input[type="checkbox"]')

    if (input.checked) {
      const title = route.querySelector('input.route-title').value
      const icon = route.querySelector('input.folder-icon').value
      const hidden = route.querySelector('input.folder-hidden').checked

      if (hidden === false)
        items.push({ uri: input.value, title, icon })
    }
  }

  return items
}

// The main RoutesTree component
const PrepareRoutesTree: React.FC<Props> = ({ routes, permissions, allPermissions, handleSubmit, saving }) => {

  const [isInitialRender, setIsInitialRender] = useState(true);

  // Run checkbox checking logic once on component render
  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false); // Set isInitialRender to false after the initial render
    }
  }, []);


  return (
    <div>
      <div className="d-flex align-items-start mt-1">
        <div className="nav flex-column nav-pills me-3 position-relative" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          {
            routes.map((child, i) => {

              const folder = child.folder
              const currentId = Str.slug((folder).replace(/^\//, ''));

              return <div key={currentId} className='draggable d-flex'>
                <button className={`nav-link text-start border w-100 ${i === 0 ? 'show active' : ''}`} id={`v-pills-${currentId}-tab`} data-bs-toggle="pill" data-bs-target={`#v-pills-${currentId}`} type="button" role="tab" aria-controls={`v-pills-${currentId}`} aria-selected="true">{Str.title(folder)}</button>
              </div>
            })
          }
        </div>
        <form
          action=''
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            handleSubmit(constructMenus());
          }}
          className="w-100"
        >
          <div className='d-flex justify-content-end'>
            <button type="submit" className="btn btn-primary text-white" disabled={saving}>{saving ? 'Saving checked...' : 'Save checked'}</button>
          </div>
         
          <div className={`tab-content overflow-auto`} id="v-pills-tabContent">
            {
              routes.map((child, j) => {

                const folder = child.folder
                const currentId = Str.slug((folder).replace(/^\//, ''));

                return <div key={`${currentId}`} className={`tab-pane fade ${j === 0 ? 'show active' : ''} ${MAIN_CONTAINER_CLASS} main-tree COUNTER0`} id={`v-pills-${currentId}`} role="tabpanel" aria-labelledby={`v-pills-${currentId}-tab`}>
                  <RoutesTree2 child={child} permissions={permissions} allPermissions={allPermissions} indent={0} counter={0} isInitialRender={isInitialRender} />
                </div>
              }
              )
            }
          </div>
        </form>
      </div>
    </div>
  )
}

export default PrepareRoutesTree