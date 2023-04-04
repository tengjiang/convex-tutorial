import { useState } from "react";
import { useMutation, useQuery } from "../convex/_generated/react";

export default function App() {
  const messages = useQuery("listMessages") || [];

  const [newMessageText, setNewMessageText] = useState("");
  const sendMessage = useMutation("sendMessage");

  const [name] = useState(() => "User " + Math.floor(Math.random() * 10000));
// Add a new query to retrieve the bid price
  const bidPrice = useQuery("getBidPrice") || [];

  const [errorMessage, setErrorMessage] = useState(null);
  async function handleSendMessage(event) {
    event.preventDefault();
    setNewMessageText("");
    const result = await sendMessage({ body: Number(newMessageText), author: name , curr_max: bidPrice[0].body});
    if (result === "ok") {
      setError(undefined);
    } else {
      setError({ type: 'custom', message: result });
    }
  }

  

  //const bidPrice = "100";

  return (
    <main>
      <h1>Convex Art Auction</h1>
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
        {bidPrice.map(bidPrice => (
          <li key={bidPrice._id.toString()}>
            Current bid price:
            ${bidPrice.body} by {bidPrice.author} at {new Date(bidPrice._creationTime).toLocaleTimeString()}
          </li>
        ))}
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
          placeholder="Enter your bid price..."
        />
        <input type="submit" value="Bid" disabled={!newMessageText} />
      </form>

    </main>
  );
}
