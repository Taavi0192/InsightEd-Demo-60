// import { httpRouter } from "convex/server";
// import { httpAction } from "./_generated/server";
// import { internal } from "./_generated/api";
// import { WebhookEvent } from "@clerk/nextjs/server";

// const http = httpRouter();

// http.route({
//   path: "/clerk",
//   method: "POST",
//   handler: httpAction(async (ctx, request) => {
//     const payloadString = await request.text();
//     const headerPayload = request.headers;

//     try {
//       const result: WebhookEvent = await ctx.runAction(internal.clerk.fulfill, {
//         payload: payloadString,
//         headers: {
//           "svix-id": headerPayload.get("svix-id")!,
//           "svix-timestamp": headerPayload.get("svix-timestamp")!,
//           "svix-signature": headerPayload.get("svix-signature")!,
//         },
//       });

//       switch (result.type) {
//         case "organizationMembership.updated":
//         case "organizationMembership.created":
//           await ctx.runMutation(internal.memberships.addUserIdToOrg, {
//             userId: `https://${process.env.CLERK_HOSTNAME}|${result.data.public_user_data.user_id}`,
//             orgId: result.data.organization.id,
//           });
//           break;
//         case "organizationMembership.deleted":
//           await ctx.runMutation(internal.memberships.removeUserIdFromOrg, {
//             userId: `https://${process.env.CLERK_HOSTNAME}|${result.data.public_user_data.user_id}`,
//             orgId: result.data.organization.id,
//           });
//           break;
//       }

//       return new Response(null, {
//         status: 200,
//       });
//     } catch (err) {
//       return new Response("Webhook Error", {
//         status: 400,
//       });
//     }
//   }),
// });

// export default http;




// import { httpRouter } from "convex/server";
// import { httpAction } from "./_generated/server";
// import { internal } from "./_generated/api";
// import { WebhookEvent } from "@clerk/nextjs/server";

// const http = httpRouter();

// http.route({
//   path: "/clerk",
//   method: "POST",
//   handler: httpAction(async (ctx, request) => {
//     const payloadString = await request.text();
//     const headerPayload = request.headers;

//     try {
//       const result: WebhookEvent = await ctx.runAction(internal.clerk.fulfill, {
//         payload: payloadString,
//         headers: {
//           "svix-id": headerPayload.get("svix-id")!,
//           "svix-timestamp": headerPayload.get("svix-timestamp")!,
//           "svix-signature": headerPayload.get("svix-signature")!,
//         },
//       });

//       // Access `user_id` directly in both cases
//       const userId = `https://${process.env.CLERK_HOSTNAME}|${result.data.id}`;

//       switch (result.type) {
//         case "user.created":
//           await ctx.runMutation(internal.memberships.addUser, { userId });
//           break;
//         case "user.deleted":
//           await ctx.runMutation(internal.memberships.removeUser, { userId });
//           break;
//       }

//       return new Response(null, {
//         status: 200,
//       });
//     } catch (err) {
//       return new Response("Webhook Error", {
//         status: 400,
//       });
//     }
//   }),
// });

// export default http;


import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
  path: "/custom-endpoint",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const payloadString = await request.text();

      // Add your custom logic here for handling the request data as needed
      console.log("Received payload:", payloadString);

      return new Response("Success", {
        status: 200,
      });
    } catch (err) {
      console.error("Error handling request:", err);
      return new Response("Error handling request", {
        status: 400,
      });
    }
  }),
});

export default http;
