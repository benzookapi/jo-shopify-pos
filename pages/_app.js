import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import App, { Container } from "next/app";
import { AppProvider } from "@shopify/polaris";
import { Provider } from "@shopify/app-bridge-react";
import Cookies from "js-cookie";
import "@shopify/polaris/styles.css";

const client = new ApolloClient({
  fetchOptions: {
    credentials: "include"
  }
});
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    const shopOrigin = Cookies.get("shopOrigin");
    return (
      <Container>
        <AppProvider>
          <Provider
            config={{
              apiKey: API_KEY,
              shopOrigin: shopOrigin,
              forceRedirect: true
            }}
          >
            <ApolloProvider client={client}>
              <Component {...pageProps} />
            </ApolloProvider>
          </Provider>
        </AppProvider>
      </Container>
    );
  }

  showApp = () => {
    var iframe = document.createElement('iframe');
var start = new Date().getTime();
iframe.style.border = 'none';
iframe.style.width = '1px';
iframe.style.height = '1px';

iframe.src = 'twitter://post?message=' + encodeURIComponent('ほげほげ #ふがふが');
document.body.appendChild(iframe);

setTimeout(function() {
  var diff = new Date().getTime() - start;

  if (diff < 510) {
    window.location.href = 'http://itunes.com/apps/twitter';
    iframe.parentNode.removeChild(iframe);
  }
}, 500);
  };
}

export default MyApp;
