import React, {Component} from 'react';
import {Image} from 'react-native'

export class ImageIcon extends Component {

  static images = {
    plus: <Image source={{uri: 'https://cdn3.iconfinder.com/data/icons/brain-games/1042/Puzzle.png'}}/>,
    heart: <Image source={{uri: 'https://cdn3.iconfinder.com/data/icons/brain-games/1042/Puzzle.png'}}/>,
    phone: <Image source={{uri: 'https://cdn3.iconfinder.com/data/icons/brain-games/1042/Puzzle.png'}}/>,
    user: <Image source={{uri: 'https://cdn3.iconfinder.com/data/icons/brain-games/1042/Puzzle.png'}}/>,
  };

  render() {
    let name = this.props.name;
    return React.cloneElement(ImageIcon.images[name]);
  }
}