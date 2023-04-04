import { useState } from "react";
import { useMutation, useQuery } from "../convex/_generated/react";

export default function App() {
  const messages = useQuery("listMessages") || [];

  const [newMessageText, setNewMessageText] = useState("");
  const sendMessage = useMutation("sendMessage");

  const [name] = useState(() => "User " + Math.floor(Math.random() * 10000));

  async function handleSendMessage(event) {
    event.preventDefault();
    setNewMessageText("");
    // convert string to number
    await sendMessage({ body: Number(newMessageText), author: name });
  }

  // Add a new query to retrieve the bid price
  const bidPrice = useQuery("getBidPrice") || [];

  //const bidPrice = "100";

  return (
    <main>
      <h1>Convex Chat</h1>
      <p className="badge">
        <span>{name}</span>
      </p>

      <div id="artwor_image" align="center">
        <img src="https://www.ss.net.tw/images/product_images/popup_images/VanGogh008.webp"
        alt="image01.jpg" width="300px" title="The Starry Night"></img>
      </div>

      {/* Render the bid price based on the response of the `getBidPrice` query */}
      {/* <div id="bid_price" align="center">Current bid price: {bidPrice || "1,000,000"}$</div> */}

      <div id="bid_price" align="center">

        Current bid price: ${bidPrice[0].body} by {bidPrice[0].author}

      </div>
          
      <ul>
        {messages.map(message => (
          <li key={message._id.toString()}>
            <span>{message.author}:</span>
            <span>${message.body}</span>
            <span>{new Date(message._creationTime).toLocaleTimeString()}</span>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSendMessage}>
        <input
          value={newMessageText}
          onChange={event => setNewMessageText(event.target.value)}
          placeholder="Write a message…"
        />
        <input type="submit" value="Send" disabled={!newMessageText} />
      </form>

    </main>
  );
}
