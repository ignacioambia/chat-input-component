import { FunctionComponent, ReactNode, useState } from "react";
import "./Avatar.scss";

interface AvatarProps {
  picture: string;
  children?: ReactNode
}

const Avatar: FunctionComponent<AvatarProps> = ({ picture, children }) => {
  const [pictureFound, setPictureFound] = useState<boolean>(true);

  const avatarPicture = (
    <img
      className="avatar"
      src={picture}
      onError={() => setPictureFound(false)}
      alt="user avatar in chat"
    ></img>
  );

  const defaultAvagarPicture = <div className="avatar">{children}</div>;

  return pictureFound ? avatarPicture : defaultAvagarPicture;
};

export default Avatar;
