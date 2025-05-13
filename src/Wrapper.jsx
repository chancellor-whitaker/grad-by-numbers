import { RemoteComponent } from "./RemoteComponent";

// What is a Remote Component?
// A Remote Components is loaded at runtime from a URL. It is used in the same way any other React Component is used

// Install
// npm install @paciolan/remote-component

// Documentation
// https://github.com/Paciolan/remote-component

// Vite Usage
// https://stackblitz.com/edit/vitejs-vite-myxwzz?file=src%2FApp.jsx&terminal=dev

export const Wrapper = ({
  url = "https://irserver2.eku.edu/libraries/remote/wrapper.cjs",
  ...rest
}) => <RemoteComponent url={url} {...rest} />;
