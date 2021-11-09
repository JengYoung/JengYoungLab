import React from 'react';

const AvatarGroup = ({ 
  children,
  shape = 'circle',
  size = 70, 
  ...props
}) => {
  const avatars = React.Children.toArray(children)
    .filter(elem => {
      if (React.isValidElement(elem) && elem.props.__TYPE === "Avatar") return true;
      else {
        console.warn(`Only accepts Avatar as it's children`);
        return false;
      }
    })
    .map((avatar, idx, avatars) => {
      return React.cloneElement(avatar, {
        ...avatar.props,
        size,
        shape,
        style: {
          ...avatar.props.style,
          marginLeft: -size / 5,
          zIndex: avatars.length - idx,
        }
      })
    })
  return <div style={{ paddingLeft: size / 5 }}>{avatars}</div>
}

export default AvatarGroup;

// {
//   <Avatar.Group>
//     <Avatar></Avatar>
//     <Avatar></Avatar>
//     <Avatar></Avatar>
//   </Avatar.Group>
// }