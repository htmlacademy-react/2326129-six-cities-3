const offerItems = [ 'Wi-Fi', 'Washing machine', 'Towels', 'Heating', 'Coffee machine', 'Baby seat', 'Kitchen', 'Dishwasher', 'Cabel TV', 'Fridge' ];

function OfferItems(): JSX.Element {
  return (
    <ul className="offer__inside-list">
      {offerItems.map((item) => (
        <li key={item} className="offer__inside-item">
          {item}
        </li>
      ))}
    </ul>
  );
}

export { OfferItems };
