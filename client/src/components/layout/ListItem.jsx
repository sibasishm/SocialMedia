import React from 'react';
import { List, Image } from 'semantic-ui-react';

export default ({ iconName, imgSrc, title, description }) => (
  <List.Item>
    {iconName && <List.Icon name={iconName} />}
    {imgSrc && <Image avatar src={imgSrc} />}
    <List.Content>
      {title && <List.Header>{title}</List.Header>}
      <List.Description>{description}</List.Description>
    </List.Content>
  </List.Item>
);
