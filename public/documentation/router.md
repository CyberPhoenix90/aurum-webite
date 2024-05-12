AurumRouter comes with 3 parts:

\<AurumRouter></AurumRouter>

\<Route></Route>

\<DefaultRoute></DefaultRoute>

You can simply import those from aurum and their purpose is to make single page applications where you render a different page based on your URL. AurumRouter works either with the url pathname or with the hash part of the URL (configurable through props).

Simple usage example from the source code of this website:

```tsx
<AurumRouter hashRouting>
	<Route href="/documentation">
		<DocumentationPage></DocumentationPage>
	</Route>
	<Route href="/getting_started">
		<GettingStarted></GettingStarted>>
	</Route>
	<DefaultRoute>
		<div>
			<MainTitle></MainTitle>
			<Advantages></Advantages>
			<div class="container">
				<Examples></Examples>
			</div>
		</div>
	</DefaultRoute>
</AurumRouter>

```

The router will only check the part of the URL after the # sign, you can route inside the page with anchor tags like: \<a href="#/myPath"></a>
The router will also match a page if the url does not end there.

Meaning #/getting_started/router will render the page \<Route href="/getting_started"></Route>

This makes it possible to use the router in a nested way to render sub pages within pages as is done in this very documentation where the sidebar is part of /getting_started but the page you are reading is part of /getting_started/router

### Navigation Events

You can set a callback function to be called when the router navigates to or from a page.

```tsx
<AurumRouter hashRouting>
	<Route href="/documentation">
		<DocumentationPage></DocumentationPage>
	</Route>
	<Route href="/getting_started">
		<GettingStarted></GettingStarted>>
	</Route>
	<DefaultRoute onNavigateTo={() => {
		location.href = '#/getting_started';
	}}>
	</DefaultRoute>
</AurumRouter>
```
