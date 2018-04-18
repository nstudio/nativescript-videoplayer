import { Observable } from 'tns-core-modules/data/observable';
export function Prop() {
  return (target: Observable, propertyKey: string) => {
    Object.defineProperty(target, propertyKey, {
      // tslint:disable-next-line:only-arrow-functions
      get: function() {
        // tslint:disable-next-line:object-literal-shorthand
        return this['_' + propertyKey];
      },
      // tslint:disable-next-line:only-arrow-functions
      set: function(value) {
        // tslint:disable-next-line:object-literal-shorthand
        if (this['_' + propertyKey] === value) {
          return;
        }

        this['_' + propertyKey] = value;
        this.notify({
          eventName: Observable.propertyChangeEvent,
          propertyName: propertyKey,
          object: this,
          value
        });
      },
      enumerable: true,
      configurable: true
    });
  };
}
