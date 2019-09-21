import { Component } from "preact";
import style from "./style.styl";

class Item extends Component {
  render() {
    const { x, y, color, src, isDragged, zIndex, ...rest } = this.props;
    return (
      <div
        {...rest}
        className={isDragged ? style.itemDragged : style.item}
        style={{ left: x, top: y, zIndex }}
      >
        <img src={src} />
      </div>
    );
  }
}

export default Item;
