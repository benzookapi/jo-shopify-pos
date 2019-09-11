import { Heading, Page } from "@shopify/polaris";

const Cart = () => (
  <Page>
    <Heading>THIS IS JUNICHI CART!!!!!!!!!!!!!!You created a new page called Cart</Heading>
    <p>You can visit this page by appending "/Cart" to your URL</p>
    <p>You can edit this page in "/pages/cart</p>
    <p>For information on Next.js dynamic routing <a href="https://nextjs.org/learn/basics/navigate-between-pages" target="_blank">check out their documentation</a></p>
    <p>For information about navigation within the admin frame, <a href="https://help.shopify.com/en/api/embedded-apps/app-extensions/navigation/create-navigation-link" target="_blank">see the Shopify documentation.</a></p>
    <Button
              onClick={this.showApp}
              
            >
              Show App
            </Button>
  
  </Page>
)
export default Cart;