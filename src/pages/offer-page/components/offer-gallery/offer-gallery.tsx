import { memo } from 'react';

type OfferGalleryProps = {
  images: string[];
};

function OfferGalleryComponent({ images }: OfferGalleryProps): JSX.Element {
  return (
    <div className="offer__gallery">
      {images && images.length > 0 && images.slice(0, 6).map((image, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="offer__image-wrapper" key={index}>
          <img className="offer__image" src={image} alt="Photo studio" />
        </div>
      ))}
    </div>
  );
}

export const OfferGallery = memo(OfferGalleryComponent);
