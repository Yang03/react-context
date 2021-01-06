
import * as React from "react";
import Repository from './reposotory';

export function createRender(componentConfig) {
  const repo = new Repository();
  repo.register(componentConfig);

  return function Render(props) {
    const {
      modules = [],
      data,
    } = props;

    const renderList = modules.map(item => {
      const Component = repo.getComponent(item.componentType);
      if (!Component) {
        return null;
      }
      return (
        <div
          className={`${item.componentType} module`}
          id={item.componentType}
        >
          <Component
            config={item.content || {}}
            // dispatch={$dispatch}
            data={data}
            // state={state}
          />
        </div>
      );
    });
    return (
      <div>
        {renderList}
      </div>
    );
  };
}