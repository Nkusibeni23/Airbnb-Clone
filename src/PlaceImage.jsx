/* eslint-disable react/prop-types */
export default function PlaceImage({ place, index = 0, className = null }) {
  if (!place.photos?.length) {
    return <div>No photos</div>;
  }

  if (!className) {
    className = "object-cover rounded-2xl mb-2";
  }
  return (
    <img
      className={className}
      src={"http://localhost:4000/uploads/" + place.photos[index]}
      alt="place"
    />
  );
}
