Aurum supports async components. They are just regular functional components that happen to return a promise instead of JSX. Aurum will wait for the promise to resolve and then render the result. If the promise is rejected nothing is rendered.

Example

```tsx
function Documentation() {
    return fetch('/documentation').then((res) => res.text());
}

Aurum.attach(<Documentation></Documentation>, document.body);
```

This will render the documentation once it is fetched from the server. If the promise is rejected nothing is rendered. If you want to render something while the promise is pending you can use [suspense](#/getting_started/suspense)
If you wish to render something in case the promise is rejected you can use [error boundaries](#/getting_started/error_boundary)

The support of async components makes fetching data as part of your component trivial:

```tsx
async function UserProfile(props) {
    const data = await fetch('/user/get' + props.userId).then((res) => res.json());
    return <div>{data.name}</div>;
}

Aurum.attach(
    <Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
        <UserProfile userId="123"></UserProfile>
    </Suspense>,
    document.body
);
```
