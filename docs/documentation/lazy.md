<Lazy> is a builtin component that can be used to lazy load any component.

```tsx
import { Aurum, Lazy } from 'aurumjs';

const MyComponent = () => {
    return <Lazy lazyComponentProps={{ myprop: 'test' }} loader={() => import('./my_lazy_loaded_component')} />;
};
```

The `loader` prop is a function that returns a promise that resolves to the component you want to lazy load. The `lazyComponentProps` prop is an object that will be passed as props to the lazy loaded component.
For this to work the component you want to lazy load must be exported as default or you can use the `then` method of the promise to extract the export you want.
