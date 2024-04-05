import "./Album.scss";

import HeaderAlbum from "../HeaderAlbum/HeaderAlbum";
import AlbumList from "../AlbumList/AlbumList";

const Album = ({ tracks }) => {
  return (
    <div className="album">
      <HeaderAlbum tracks={tracks} />

      <AlbumList tracks={tracks ?? []} />
    </div>
  );
};

export default Album;
