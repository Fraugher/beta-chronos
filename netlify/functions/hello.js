// export const handler = async () => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: 'Hello World!',
//     }),
//   }
// }
    exports.handler = async function (event, context) {
      const data = {
        message: "Hello from Netlify Function!",
        items: ["item1", "item2", "item3"],
      };

      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    };