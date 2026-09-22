import { SortingItems } from './sorting-items';
import { SORTING_OPTIONS, SortingOption } from '../../../../const';
import { useState } from 'react';

type SortingFormProps = {
  sortingOption: SortingOption;
  onSortChange: (option: SortingOption) => void;
};

function SortingForm({ sortingOption, onSortChange }: SortingFormProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const activeOption = SORTING_OPTIONS.find((o) => o.value === sortingOption);

  const handleSelect = (option: SortingOption) => {
    onSortChange(option);
    setIsOpen(false);
  };


  return (
    <form className="places__sorting" action="#" method="get" onClick={() => setIsOpen((prev) => !prev)} >
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {activeOption?.label ?? 'Popular'}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      {isOpen && (
        <SortingItems activeSort='popular' onSelect={handleSelect} />)}
    </form>
  );
}

export { SortingForm };
