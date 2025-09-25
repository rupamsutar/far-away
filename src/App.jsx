import { useState } from "react";

function App() {
  const [ items, setItems ] = useState([]);

  function addItems (item) {
    setItems((prevState) => {
      return [...prevState, item]
    });
  }

  function deleteItems(itemId) {
    setItems((prevState) => {
      return prevState.filter((item) => item.id !== itemId);
    })
  }

  function markAsPacked(itemId, isPacked) {
    setItems((prevState) => {
      return prevState.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            packed : isPacked
          }
        } else {
          return item;
        }
      });
    });
  }

  return (
    <>
      <div className="app">
        <Logo />
        <Form onAdd={addItems} />
        <PackingList items={items} deleteItems={deleteItems} markAsPacked={markAsPacked} />
        <Stats />
      </div>
    </>
  )
}

function Logo() {
  return <h1>🎄 Far Away 👜</h1>
}

function Form({ onAdd }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description.trim()) return;

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false
    }

    onAdd(newItem);

    setDescription('');
    setQuantity('');
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip? </h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {
          Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
            return (
              <option value={num} key={num}>
                {num}
              </option>
            )
          })
        }
      </select>
      <input type='text' placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)} ></input>
      <button>Add</button>
    </form>
  )
}

function PackingList({items, deleteItems, markAsPacked}) {
  return (
    <div className="list">
      <ul>
        {
          items.map((item) => {
            return <Item item={item} key={item.id} deleteItems={deleteItems} markAsPacked={markAsPacked} />
          })
        }
      </ul>
    </div>
  )
}

function Item({ item, deleteItems, markAsPacked }) {
  return (
    <li>
      <input type="checkbox" id="isPacked" onChange={(e) => markAsPacked(item.id, e.target.checked)} />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => deleteItems(item.id)}>❌</button>
    </li>
  )
}

function Stats() {
  return (
    <footer className="stats">
      <em>👜 You have X items on your list, and you already packed X.</em>
    </footer>
  )
}

export default App
