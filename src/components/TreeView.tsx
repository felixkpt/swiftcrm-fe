import React from 'react';

type MenuItem = {
  uri: string;
  uri_methods: string;
  slug: string;
  title: string;
  folder: string;
  hidden: boolean;
  children?: MenuItem[]; // Add 'children' property to handle nested children
};

type Route = {
  [key: string]: MenuItem;
};

type TreeViewProps = {
  data: Route;
};

const TreeView: React.FC<TreeViewProps> = ({ data }) => {
  const renderMenu = (menuData: MenuItem) => {
    const { title, children, uri_methods } = menuData;

    return (
      <React.Fragment key={title}>
        <li>
          <span>{uri_methods}</span>
        </li>
        {children && (
          <ul className="nested-list ml-4">
            {Object.values(children).map((child) => renderMenu(child))}
          </ul>
        )}
      </React.Fragment>
    );
  };

  return (
    <div>
      <ul className="tree-container list-none ml-4">
        {Object.values(data).map((menuItem) => renderMenu(menuItem))}
      </ul>
    </div>
  );
};

export default TreeView;
