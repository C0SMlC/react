import { useState } from 'react';

import Logo from './Logo';
import Form from './Form';
import { PackingList } from './PackingList';
import { Stats } from './Stats';

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 3, description: 'Brush', quantity: 2, packed: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItem(newItem) {
    setItems((items) => [...items, newItem]);
  }

  function handleRemoveItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleItemToggle(id) {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, packed: !item.packed };
        }
        return item;
      })
    );
  }

  function handleClearList() {
    const confirmClear = window.confirm(
      'This action will clear all the items, Are you sure?'
    );
    confirmClear && setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onRemoveItem={handleRemoveItem}
        onToggleItem={handleItemToggle}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
