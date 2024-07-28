import { useState } from "react";

export default function App() {
  return (
    <div>
      <FarAway />
    </div>
  );
}

function FarAway() {
  const [items, setItems] = useState([]);

  function handlerAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handlerDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handlerPacked(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handlerClaerList() {
    setItems([]);
  }

  return (
    <div className="app">
      <Header />
      <Form onAddItem={handlerAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handlerDeleteItem}
        onPacked={handlerPacked}
        onClearList={handlerClaerList}
      />
      <Stats items={items} />
    </div>
  );
}

function Header() {
  return <h1>🏝️Far Away🧳</h1>;
}

function Form({ onAddItem }) {
  const [describtion, setDescribtion] = useState("");
  const [qountity, setQountity] = useState(1);

  function handlerSubmit(e) {
    e.preventDefault();

    if (!describtion) return;

    const newItem = { id: Date.now(), describtion, qountity, packed: false };
    onAddItem(newItem);

    setDescribtion("");
    setQountity(1);
  }

  return (
    <form className="add-form" onSubmit={handlerSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={qountity} onChange={(e) => setQountity(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num}>{num}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={describtion}
        onChange={(e) => setDescribtion(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onPacked, onClearList }) {
  const [sortItem, setSortItem] = useState("input");

  let sortItems;

  if (sortItem === "input") sortItems = items;

  if (sortItem === "describtion")
    sortItems = items
      .slice()
      .sort((a, b) => a.describtion.localeCompare(b.describtion));

  if (sortItem === "packed")
    sortItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onPacked={onPacked}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortItem} onChange={(e) => setSortItem(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="describtion">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onPacked }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onPacked(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.qountity} {item.describtion}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const numItem = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const perentage = Math.round((numPacked / numItem) * 100);
  if (!numItem)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );
  return (
    <footer className="stats">
      <em>
        {perentage === 100
          ? `You got everything! Ready to go ✈️`
          : `💼 You have ${numItem} items list, and you already packed ${numPacked} (
        ${perentage}%)`}
      </em>
    </footer>
  );
}

// What do you need for your 😍 trip?

// You got everything! Ready to go ✈️
// 💼 You have X items list, and you already packed X (X%)
// Start adding some items to your packing list 🚀

// Sort
// Sort by input order
// Sort by description
// Sort by packed status
