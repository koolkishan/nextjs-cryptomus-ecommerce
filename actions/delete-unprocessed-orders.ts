// // Assuming you have access to Prisma client instance `db`
// 'use server';
// import { db } from "@/lib/db";

// export async function deleteUnprocessedOrders(userId: string) {
//   const ordersToDelete = await db.order.findMany({
//     where: {
//       userId,
//       status:'UNPROCESSED',
//     },
//     select: {
//       id: true,
//     },
//   });

//   const orderIds = ordersToDelete.map((order) => order.id);

//   await db.orderProduct.deleteMany({
//     where: {
//       orderId: {
//         in: orderIds,
//       },
//     },
//   });

//   await db.order.deleteMany({
//     where: {
//       id: {
//         in: orderIds,
//       },
//     },
//   });
// }


// [
//   {
//       "id": "clvhrioow0039e5v1l5s4d4ms",
//       "userId": "clvhp7aqa000oe5v1yzsycmov",
//       "createdAt": "2024-04-27T07:10:44.865Z",
//       "totalPrice": 66000,
//       "totalDiscount": 11960,
//       "status": "UNPROCESSED",
//       "products": [
//           {
//               "id": "clvhrioow003ae5v1rt0fuv5d",
//               "orderId": "clvhrioow0039e5v1l5s4d4ms",
//               "productId": "clvav9q8e000vogbdgwo0tf11",
//               "quantity": 1,
//               "product": {
//                   "id": "clvav9q8e000vogbdgwo0tf11",
//                   "productName": "Nothing Phone 2a 5G (8GB RAM, 256GB, White)",
//                   "price": 26000,
//                   "discount": 6,
//                   "description": "Display: 6.7 inches (17.02 cm), AMOLED, 120 Hz Refresh Rate\nMemory: 8GB RAM, 256GB ROM\nProcessor: MediaTek Dimensity 7200 Pro, Octa Core, 2.8 GHz\nCamera: 50 MP + 50 MP Dual Rear & 32 MP Front Camera\nBattery: 5000 mAh with 45W Fast Charging\nUSP: IP54 Water & Dust Resistant, 360 Degree Antenna, Hybrid Co-Existence 2.0",
//                   "images": [
//                       "http://res.cloudinary.com/dmozedfqu/image/upload/v1713784876/jdyyphsumfbxrl5yqohw.png",
//                       "http://res.cloudinary.com/dmozedfqu/image/upload/v1713784876/veb4myv44e9odxzhab7t.png",
//                       "http://res.cloudinary.com/dmozedfqu/image/upload/v1713784876/bi9jac7njczkpac5pj3p.png",
//                       "http://res.cloudinary.com/dmozedfqu/image/upload/v1713784876/aweqxfrc3cxnrravxvvy.png"
//                   ],
//                   "tags": [
//                       "mobile",
//                       "iphone",
//                       "5g phone",
//                       " gaming",
//                       " nothing",
//                       " back  light phone"
//                   ],
//                   "categoryId": "clvauwu5c000kogbdxw1p1t01",
//                   "quantity": 30,
//                   "createdAt": "2024-04-22T11:21:22.190Z",
//                   "updatedAt": "2024-04-22T11:21:22.190Z"
//               }
//           },
//           {
//               "id": "clvhrioow003be5v1oh6sfu7m",
//               "orderId": "clvhrioow0039e5v1l5s4d4ms",
//               "productId": "clvavcw2k000xogbdflgfyndx",
//               "quantity": 1,
//               "product": {
//                   "id": "clvavcw2k000xogbdflgfyndx",
//                   "productName": "Nothing Phone 2 5G (12GB RAM, 256GB, Dark Grey)",
//                   "price": 40000,
//                   "discount": 26,
//                   "description": "Display: 6.7 inches (17.02 cm), AMOLED, 120 Hz Refresh Rate\nMemory: 12GB RAM, 256GB ROM\nProcessor: Snapdragon 8 Plus Gen 1, Octa Core, 3 GHz\nCamera: 50 MP + 50 MP Dual Rear & 32 MP Front Camera\nBattery: 4700 mAh with 45W Fast Charging\nUSP: In-display Fingerprint Sensor, Devised with Glyph Interface",
//                   "images": [
//                       "http://res.cloudinary.com/dmozedfqu/image/upload/v1713785019/io4mvi5yjh4cz383lrww.png",
//                       "http://res.cloudinary.com/dmozedfqu/image/upload/v1713785019/rmehido0czwh05ez0z8j.png",
//                       "http://res.cloudinary.com/dmozedfqu/image/upload/v1713785019/azy21ibuvur4yqsusrzd.png",
//                       "http://res.cloudinary.com/dmozedfqu/image/upload/v1713785019/gzseihf962hpkzqr2l9y.png"
//                   ],
//                   "tags": [
//                       "mobile",
//                       "iphone",
//                       "5g phone",
//                       " gaming",
//                       " nothing",
//                       " back light",
//                       " phone"
//                   ],
//                   "categoryId": "clvauwu5c000kogbdxw1p1t01",
//                   "quantity": 10,
//                   "createdAt": "2024-04-22T11:23:49.724Z",
//                   "updatedAt": "2024-04-22T11:23:49.724Z"
//               }
//           }
//       ]
//   }
// ]