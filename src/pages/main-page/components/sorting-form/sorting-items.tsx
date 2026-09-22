import { SortingOption, SORTING_OPTIONS } from '../../../../const';

type SortingProps = {
  activeSort: SortingOption;
  onSelect: (option: SortingOption) => void;
}


function SortingItems({activeSort, onSelect }: SortingProps): JSX.Element {

  return (
    <ul className="places__options places__options--custom places__options--opened" onClick={(e) => e.stopPropagation()}>
      {SORTING_OPTIONS && SORTING_OPTIONS.length > 0 && SORTING_OPTIONS.map((option) => (
        <li
          className={`places__option${activeSort === option.value ? ' places__option--active' : ''}`}
          tabIndex={0}
          key={option.value}
          onClick={() => onSelect(option.value)}
        >
          {option.label}
        </li>
      ))}
    </ul>
  );
}

export { SortingItems };
