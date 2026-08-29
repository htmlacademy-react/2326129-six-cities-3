type OfferGalleryProps = {
  images: string[];
};

function OfferGallery({ images }: OfferGalleryProps): JSX.Element {
  return (
    <div className="offer__gallery">
      {images.map((image, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="offer__image-wrapper" key={index}>
          <img className="offer__image" src={image} alt="Photo studio" />
        </div>
      ))}
    </div>
  );
}

export { OfferGallery };
