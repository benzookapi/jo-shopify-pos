import "@babel/polyfill";
import dotenv from "dotenv";
import "isomorphic-fetch";
import createShopifyAuth, { verifyRequest } from "@shopify/koa-shopify-auth";
import graphQLProxy, { ApiVersion } from "@shopify/koa-shopify-graphql-proxy";
import Koa from "koa";
import next from "next";
import Router from "koa-router";
import session from "koa-session";
import * as handlers from "./handlers/index";

const fs = require('fs');

dotenv.config();
const port = parseInt(process.env.PORT, 10) || 8081;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev
});
const handle = app.getRequestHandler();
const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY, SCOPES } = process.env;
console.log(`SHOPIFY_API_SECRET_KEY: ${SHOPIFY_API_SECRET_KEY}`);
console.log(`SHOPIFY_API_KEY: ${SHOPIFY_API_KEY}`);
console.log(`SCOPES: ${SCOPES}`);
app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  server.use(session(server));
  server.keys = [SHOPIFY_API_SECRET_KEY];

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: [SCOPES],
      async afterAuth(ctx) {
        //Auth token and shop available in session
        //Redirect to shop upon auth
        const { shop, accessToken } = ctx.session;
        ctx.cookies.set("shopOrigin", shop, { httpOnly: false });
        ctx.redirect("/");
      }
    })
  );

  server.use(graphQLProxy({ version: ApiVersion.July19 }));

  router.get("/", verifyRequest(), async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });

  router.get('/cart', (ctx, next) => {
    console.log("****cart******");
    console.log(ctx.request.body);
    /* Check the signature */
    /*if (!checkSignature(ctx.request.body)) {
      ctx.status = 400;
      return;
    }*/
    //ctx.set('Content-Type', 'text/html');
    //ctx.body = `<p>CART!!</p>`;
    //ctx.status = 200;
    ctx.set('Content-Type', 'text/html');  
    ctx.body = fs.createReadStream('./html/cart.html');
  });

  router.get('/complete', (ctx, next) => {
    console.log("****complete******");
    console.log(ctx.request.body);
    /* Check the signature */
    /*if (!checkSignature(ctx.request.body)) {
      ctx.status = 400;
      return;
    }*/
    //ctx.set('Content-Type', 'text/html');
    //ctx.body = `<p>CART!!</p>`;
    //ctx.status = 200;
    ctx.set('Content-Type', 'text/html');  
    ctx.body = fs.createReadStream('./html/complete.html');
  });

  router.get("cart", async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });

  router.get("*", async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });

  router.post('/mypos/promotions', (ctx) => {
    console.log(ctx.request.body);
    ctx.body = {
      type: "simple_action_list",
      points_label: "??????????????????",
      points_balance: 23867,
      actions: [
        {
          type: "flat_discount",
          title: "5.00?????????????????????????????????????????????",
          description: "-1000????????????",
          action_id: "123ABC",
          value: "5"
        },
        {
          type: "percent_discount",
          title: "20%????????????????????????",
          description: "-1000????????????",
          action_id: "456DEF",
          value: "0.2"
        }
      ]
    };
    ctx.type = "application/json";
    ctx.status = 200;
  });  

  router.post('/mypos/perform_action', (ctx) => {
    console.log(ctx.request.body);
    ctx.body = {
      type: "simple_action_list",
      points_label: "??????????????????",
      points_balance: 23867,
      actions: [
        {
          type: "flat_discount",
          title: "5.00?????????????????????????????????????????????",
          description: "-1000????????????",
          action_id: "123ABC",
          value: "5"
        },
        {
          type: "percent_discount",
          title: "20%????????????????????????",
          description: "-1000????????????",
          action_id: "456DEF",
          value: "0.2"
        }
      ]
    };
    ctx.type = "application/json";
    ctx.status = 200;
  });  

  router.post('/mypos/revert_action', (ctx) => {
    console.log(ctx.request.body);
    ctx.body = {
      type: "simple_action_list",
      points_label: "??????????????????",
      points_balance: 23867,
      actions: [
        {
          type: "flat_discount",
          title: "5.00?????????????????????????????????????????????",
          description: "-1000????????????",
          action_id: "123ABC",
          value: "5"
        },
        {
          type: "percent_discount",
          title: "20%????????????????????????",
          description: "-1000????????????",
          action_id: "456DEF",
          value: "0.2"
        }
      ]
    };
    ctx.type = "application/json";
    ctx.status = 200;
  });  

  server.use(router.allowedMethods());
  server.use(router.routes());

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
