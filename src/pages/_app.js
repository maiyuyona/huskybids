// Create a custom _app.js file to ensure proper rendering
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
