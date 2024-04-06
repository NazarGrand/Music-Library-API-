import "./Album.scss";
import AlbumList from "../AlbumList/AlbumList";

const Album = ({ tracks }) => {
  return (
    <div className="album">
      <AlbumList tracks={tracks ?? []} />
    </div>
  );
};

export default Album;
