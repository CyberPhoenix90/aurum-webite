The error boundary component is a component that can be used to catch errors that occur in the children of the component. It is a regular component that can be used like any other component. If an error occurs in the children of the component the error boundary will catch the error and render the fallback component instead.

Example:

```tsx
import { ErrorBoundary } from 'aurumjs';

function MyComponent(props) {

    if(!props.data) {
        throw new Error('Something went wrong');
    }

    return <div>Hello World {data}</div>
}


<div>
    <ErrorBoundary errorFallback={<div>Something went wrong</div>}>
        <MyComponent></MyComponent>
    </MyErrorBoundary>
</div>
```
