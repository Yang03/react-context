export default class Repository {
  constructor() {
    this.factory = Object.create(null);
  }

  register(type, component) {
    if (typeof type === 'string') {
      this.factory[type] = {
        Component: component,
      };
    } else if (typeof type === 'object') {
      Object.keys(type).forEach(componentType => {
        this.register(componentType, type[componentType]);
      });
    }
  }

  getComponent(type) {
    return this.factory[type] && this.factory[type].Component;
  }
}
