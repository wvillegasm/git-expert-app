export const GifItem = ({ title, url }) => {
  console.log({ title, url });
  return (
    <div className="gif-item">
      <img src={url} alt={title} />
      <p>{title}</p>
    </div>
  );
};
