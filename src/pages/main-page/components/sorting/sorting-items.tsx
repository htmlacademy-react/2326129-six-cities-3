type SortingProps = {
  activeSort: string;
}


function SortingItems({activeSort}: SortingProps): JSX.Element {
  const sortingOptions = [
    {label: 'Popular', value: 'popular'},
    {label: 'Price: low to high', value: 'price-low'},
    {label: 'Price: high to low', value: 'price-high'},
    {label: 'Top rated first', value: 'top-rated'},
  ];
  return (
    <ul className="places__options places__options--custom places__options--opened">
      {sortingOptions.map((option) => (
        <li
          className={`places__option${activeSort === option.value ? ' places__option--active' : ''}`}
          tabIndex={0}
          key={option.value}
        >
          {option.label}
        </li>
      ))}
    </ul>
  );
}

export { SortingItems };
