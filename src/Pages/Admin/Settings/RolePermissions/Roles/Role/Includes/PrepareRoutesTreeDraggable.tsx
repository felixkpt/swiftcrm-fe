import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Str from "@/utils/Str"
import { useEffect, useState } from "react";
import RoutesTree from "./RoutesTree";
import { Icon } from "@iconify/react/dist/iconify.js";

// Define the Props interface for the RoutesTree component
interface Props {
  routes: RoutesSection[];
  permissions: PermissionData[];
  allPermissions: PermissionData[];
  handleSubmit: ({ folders, permissions }: any) => void;
  saving: boolean;
}

// Constants used for managing the component behavior
const PARENT_FOLDER_ID_PREFIX = 'parent-folder-';
const MAIN_CONTAINER_CLASS = 'nested-routes';

function constructMenus() {
  const currentFolder: Element[] = Array.from(document.querySelectorAll(`div.${MAIN_CONTAINER_CLASS}.main-tree.tab-pane.active>div`))
  let currentFolderPosition = null

  let topLevelFolders: Element[] = Array.from(
    document.querySelectorAll(`div.${MAIN_CONTAINER_CLASS}.main-tree.tab-pane > div`)
  );

  const selector = 'div.draggable [id^="v-pills-"][id$="-tab"]';
  const elements = document.querySelectorAll(selector);

  const orderArray: string[] = [];
  elements.forEach((element, i) => {
    const id = element.id
    if (id.match(/^v-pills-/) && id.match(/-tab$/)) {
      const extractedValue = id.replace('v-pills-', '').replace('-tab', '');
      orderArray.push(extractedValue);

      if (`${PARENT_FOLDER_ID_PREFIX}${extractedValue}` == currentFolder[0]?.id) {
        currentFolderPosition = i + 1
      }

    }
  });

  // Create a mapping of IDs to elements
  const idToElementMap = new Map();
  topLevelFolders.forEach(folder => {
    const id = folder.id.replace(PARENT_FOLDER_ID_PREFIX, ''); // Remove the prefix
    idToElementMap.set(id, folder);
  });

  // Sort the topLevelFolders based on the orderArray
  topLevelFolders = orderArray.map(id => idToElementMap.get(id));

console.log(topLevelFolders)

  return { current_folder: constructMenu(currentFolder, true, currentFolderPosition), all_folders: constructMenu(topLevelFolders) }

}

function constructMenu(topLevelFolders: Element[], isCurrent = false, currentFolderPosition = null) {
  const nestedRoutes = [];

  let index = 0; // Initialize the index
  const counter = 0
  for (const container of topLevelFolders) {
    const input = container.querySelector(`input[id$="-parent-checkbox"]`) as HTMLInputElement;
    index++

    if (isCurrent || (input && (input.checked || input.indeterminate))) {

      if (isCurrent === true && currentFolderPosition) index = currentFolderPosition

      const titleElement = container.querySelector('.folder-title') as HTMLInputElement | null;
      const iconElement = container.querySelector('input.folder-icon') as HTMLInputElement | null;
      const hiddenElement = container.querySelector('input.folder-hidden') as HTMLInputElement | null;

      if (titleElement && iconElement && hiddenElement) {
        const title = titleElement.value;
        const icon = iconElement.value;
        const children = constructMenuRecursively(container, isCurrent, counter);
        const hidden = hiddenElement.checked;

        nestedRoutes.push({
          folder: input?.value ?? '',
          title,
          icon,
          hidden,
          children,
          routes: getRoutes(container, isCurrent),
          position: index,
        });
      }

    }
  }

  return nestedRoutes;
}

function constructMenuRecursively(folderElement: Element | null, isCurrent: boolean, counter: number): any[] {
  counter += 1;

  const childrenContainers = folderElement?.querySelectorAll(`.COUNTER${counter}>div[id^="${PARENT_FOLDER_ID_PREFIX}"]`);

  const nestedRoutes = [];

  if (childrenContainers) {
    for (const container of childrenContainers) {
      const input = container.querySelector(`input[id$="-parent-checkbox"]`) as HTMLInputElement | null;

      if (input && (input.checked || input.indeterminate)) {
        const children = constructMenuRecursively(container, isCurrent, counter);

        const titleElement = container.querySelector('.folder-title') as HTMLInputElement | null;
        const iconElement = container.querySelector('input.folder-icon') as HTMLInputElement | null;
        const hiddenElement = container.querySelector('input.folder-hidden') as HTMLInputElement | null;

        if (titleElement && iconElement && hiddenElement) {
          const title = titleElement.value;
          const icon = iconElement.value;
          const hidden = hiddenElement.checked;

          nestedRoutes.push({
            folder: input.value,
            title,
            icon,
            hidden,
            children,
            routes: getRoutes(container, isCurrent),
          });
        }
      }
    }
  }

  return nestedRoutes;
}


// Function to get the selected routes for a given parent container
function getRoutes(container: any, isCurrent = false) {
  const id = container.id
  const routes = container.querySelectorAll(`#chld-${id}-parent-children>.routes-table .route-section`)

  const items = []
  for (const route of routes) {

    const input = route.querySelector('input[type="checkbox"]')

    if (input.checked) {
      const uri = input.value
      const title = route.querySelector('input.route-title').value
      const icon = route.querySelector('input.folder-icon').value
      const hidden = route.querySelector('input.folder-hidden').checked

      if (isCurrent === true || hidden === false && isResolvableURI(uri))
        items.push({ uri, title, icon })
    }
  }

  return items
}

const isResolvableURI = (uri: string) => {
  const urisWithParams = uri.split('|').filter(uri => uri.includes('{'));
  const hasGetOrHead = uri.includes('@GET') || uri.includes('@HEAD');
  return urisWithParams.length === 0 && hasGetOrHead;
}

// The main RoutesTree component
const PrepareRoutesTreeDraggable: React.FC<Props> = ({ routes, permissions, allPermissions, handleSubmit, saving }) => {

  const [isInitialRender, setIsInitialRender] = useState(true);

  // Run checkbox checking logic once on component render
  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false); // Set isInitialRender to false after the initial render
    }
  }, []);


  const defaultList = routes;
  // React state to track order of items
  const [itemList, setItemList] = useState(defaultList);

  // Function to update list on drop
  const handleDrop = (droppedItem: any) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    var updatedList = [...itemList];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    setItemList(updatedList);
  };

  return (
    <div>
      <div className="d-flex align-items-start mt-1">
        <div className="nav flex-column nav-pills me-3 position-relative" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <DragDropContext onDragEnd={handleDrop}>
            <Droppable droppableId="list-container">
              {(provided: any) => (
                <div
                  className="list-container"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {
                    itemList.map((child, i) => {

                      const folder = child.folder
                      const currentId = Str.slug((folder).replace(/^\//, ''));

                      return <Draggable key={currentId} draggableId={currentId} index={i}>
                        {(provided: any) => (
                          <div
                            className="item-container ps-1 my-1 rounded text-dark d-flex gap-2 align-items-center border draggable"
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                          >
                            <Icon icon="carbon:drag-vertical"></Icon>
                            <button className={`nav-link text-start border w-100 ${i === 0 ? 'show active' : ''}`} id={`v-pills-${currentId}-tab`} data-bs-toggle="pill" data-bs-target={`#v-pills-${currentId}`} type="button" role="tab" aria-controls={`v-pills-${currentId}`} aria-selected="true">{Str.title(folder)}</button>
                          </div>
                        )}
                      </Draggable>

                    })
                  }
                </div>
              )}
            </Droppable>
          </DragDropContext>
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
                  <RoutesTree child={child} permissions={permissions} allPermissions={allPermissions} indent={0} counter={0} isInitialRender={isInitialRender} />
                </div>
              }
              )
            }
          </div>
        </form>
      </div>
    </div>
  );
}

export default PrepareRoutesTreeDraggable