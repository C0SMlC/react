export function Stats({ items }) {
  const packedItems = items.filter((item) => item.packed === true).length;
  const percentage = Math.round((packedItems / items.length) * 100);
  // const [packedItems, setPackedItems] = useState(0);
  // items.forEach((item) => {
  //   if (item.packed) setPackedItems((packedItems) => packedItems + 1);
  // });
  return (
    <>
      {items.length ? (
        <footer className="stats">
          <em>
            {percentage === 100
              ? 'You have packed all the items!'
              : `You have ${
                  items.length
                } items on your list! and you already packed
        ${packedItems}(${packedItems > 0 ? percentage : 0}
        %)`}
          </em>
        </footer>
      ) : (
        <p className="stats">
          <em>What are you waiting for? Start adding items...</em>
        </p>
      )}
    </>
  );
}
