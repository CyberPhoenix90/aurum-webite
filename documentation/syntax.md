Aurum is powered by the JSX syntax, almost all JSX knowledge from react, preact and friends applies directly to Aurum.

> Even though Aurum's JSX is not exactly like other libraries it does not require special plugins for babel or typescript. Any JSX to JS compilers will work just fine

### Aurum's JSX syntax for people who used React JSX before

There are 2 major differences between React's syntax and Aurums

##### 1. Aurums jsx calls class 'class' and uses strings for native attribute values (like in the HTML spec):

Aurum:

> \<div class="hello" style="background-color:red; width:100%"> </div>

Equivalent in React

> \<div className="hello" style={{backgroundColor:red, width:'100%'}}></div>

#### 2. Aurum can bind promises and data sources directly to the HTML in JSX

Aurum:

```
//Promises that aren't resolved will appear in the dom as soon as (and if) they resolve successfully
const promise = Promise.resolve('hello world');
<div>{promise}</div>

const promise2 = Promise.resolve(<div>hello world</div>);
<div>{promise2}</div>

const data = new DataSource('hello')
// Bind data to this div. It the markup will automatically be updated whenever data changes
<div>{data}</div>
data.update('hello world')

const data2 = new DataSource(<div>markup</div>)
// Data sources can also hold HTML and trees of HTML and components
<div>{data2}</div>
data2.update(<HelloWorld></HelloWorld>)
```

See [Examples](#/getting_started/examples) for more information

No equivalent in React:

:(
