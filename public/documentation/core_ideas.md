The core concepts in aurum is to define your data flow using observables and fully automate away the rendering and synchronization of view and model.

##### When you are writing HTML through JSX you can bind datasources straight into your HTML (including tag attributes)

```
import {DataSource, Aurum} from 'aurumjs'
const myDataSource = new DataSource('hello')

Aurum.attach(<div>{myDataSource}</div>, document.body);
```

Result:

```
 <div>hello</div>
```

If at a later point you update your data like so:

```
myDataSource.update('world')
```

Result:

```
 <div>world</div>
```

##### What is the advantage of this?

React isn't that dissimilar you just define your state using useState and call setState to update it so what's the advantage?

In React when the state updates react cannot know what rammifications this will have for the dom downstream from the component.
React will rerun every single component from the setState downwards and it's up to you to use optimization tricks like immutable data with memoize to make this process faster.

Aurum works very differently. It knows exactly what changed since the data sources are bound to the content they affect. The implementation of the components does not rerun and the DOM is updated exactly where it changes. Components run exactly once per instance.

##### What if I'm working with arrays?

```
import {ArrayDataSource, Aurum} from 'aurumjs'
const myList = new ArrayDataSource(['task 1','task 2','task 3'])

Aurum.attach(
  <ul>{myList.map((text) => <li>{text}</li>)}</ul>,
  document.body
);
```

Result:

```
<ul>
  <li>task 1</li>
  <li>task 2</li>
  <li>task 3</li>
</ul>
```

And that too will synchronize with changes done to the array data source.

```
myList.push('task 4')
```

Result:

```
<ul>
  <li>task 1</li>
  <li>task 2</li>
  <li>task 3</li>
  <li>task 4</li>
</ul>
```

As a result in aurum, all variables that are shown to the user and are not static need to be wrapped in data sources. You can read all about it in the Data management section of the guide.

##### What is the advantage of this?

In React when you have arrays you cannot mutate them because setState requires a new object you have to clone and append. This can be a big performance hit and to top it off React again has no idea what changed and needs to rerun all components recursively downstream.
Also while aurum shares many similarities with solidjs, even solidjs does not support mutable arrays

Aurum gives you an observable wrapper for arrays that makes it clear to Aurum what mutations happen and allows diff rendering. Which means only the smallest possible amount of rerendering will occur. This also means that the dreaded key prop is not needed in Aurum and in fact does not exist. The effective difference is that in aurum you spend no time at all doing rendering optimizations and still end up with a much faster page than if it was made with react especially if your page is very data heavy and changes frequently and that's just the tip of the iceberg of the ways aurum makes your life easier.
