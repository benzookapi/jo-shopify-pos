import { Heading, Page } from "@shopify/polaris";

const Cart = () => (
  <Page>
    <Heading>THIS IS JUNICHI CART!!!!!!!!!!!!!!You created a new page called Cart</Heading>
    <p>You can visit this page by appending "/Cart" to your URL</p>
    <p>You can edit this page in "/pages/cart</p>
    <p>For information on Next.js dynamic routing <a href="https://nextjs.org/learn/basics/navigate-between-pages" target="_blank">check out their documentation</a></p>
    <p>For information about navigation within the admin frame, <a href="https://help.shopify.com/en/api/embedded-apps/app-extensions/navigation/create-navigation-link" target="_blank">see the Shopify documentation.</a></p>
  <script>
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
  </script>
  
  </Page>
)
export default Cart;