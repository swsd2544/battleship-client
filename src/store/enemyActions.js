export const fetchEnemyData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://reactletsgo-65a5c-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
      );

      if (!response.ok) {
        throw new Error("fetching failed");
      }

      const data = await response.json();

      return data;
    };
    try {
      const enemyData = await fetchData();
      dispatch();
      //function from enemySlice
    } catch (error) {
      dispatch();
    }
  };
};

// export const sendCartData = (cart) => {
//   return async (dispatch) => {
//     dispatch(
//       notiActions.showNotification({
//         status: "pending...",
//         title: "sending...",
//         message: "sending cart data!",
//       })
//     );

//     const sendRequest = async () => {
//       const response = await fetch(
//         "https://reactletsgo-65a5c-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
//         {
//           method: "PUT",
//           body: JSON.stringify({
//             items: cart.items,
//             totalAmount: cart.totalAmount,
//           }),
//         }
//       );
//       if (!response.ok) {
//         throw new Error("sending cart failed");
//       }
//       dispatch(
//         notiActions.showNotification({
//           status: "success",
//           title: "Success",
//           message: "Sent cart data successfully!",
//         })
//       );
//     };
//     try {
//       sendRequest();
//     } catch (error) {
//       dispatch(
//         notiActions.showNotification({
//           status: "error",
//           title: "Error",
//           message: "Sending cart data failed!",
//         })
//       );
//     }
//   };
// };
