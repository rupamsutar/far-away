import { useState } from "react";

const initialItems = [
  {
    id: 1,
    description: "Passports",
    quantity: 2,
    packed: false
  },
  {
    id: 2,
    description: "Socks",
    quantity: 12,
    packed: true
  },
  {
    id: 3,
    description: "Charger",
    quantity: 1,
    packed: false
  }
]

function App() {
  const [ items, setItems ] = useState(initialItems);
  function addItems (item) {
    setItems((prevState) => {
      return [...prevState, item]
    });
  }

  return (
    <>
      <div className="app">
        <Logo />
        <Form onAdd={addItems} />
        <PackingList items={items} />
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

function PackingList({items}) {
  return (
    <div className="list">
      <ul>
        {
          items.map((item) => {
            return <Item item={item} key={item.id} />
          })
        }
      </ul>
    </div>
  )
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  )
}

function Stats() {
  return (
    <footer>
      <em>👜 You have X items on your list, and you already packed X.</em>
    </footer>
  )
}

export default App
