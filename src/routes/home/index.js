import { Component } from "preact";
import Item from "../../components/item";
import style from "./style.styl";
import fish1 from "../../assets/images/fish-1.png";
import fish2 from "../../assets/images/fish-2.png";
import head from "../../assets/images/head.png";
import mary from "../../assets/images/mary.png";
import moth1 from "../../assets/images/moth-1.png";
import pig from "../../assets/images/pig.png";
import xRayHead from "../../assets/images/x-ray-head.png";

const ITEMS = [
  { src: fish1 },
  { src: fish2 },
  { src: head },
  { src: mary },
  { src: moth1 },
  { src: pig },
  { src: xRayHead }
];

class Home extends Component {
  state = {
    items: {},
    draggedItem: null,
    dragCount: 0
  };

  clearItems = () => {
    this.setState({
      items: {},
      dragCount: 0
    });
  };

  addItem = index => {
    this.setState(({ items, dragCount }) => ({
      items: {
        ...items,
        [Object.keys(items).length + 1]: {
          ...ITEMS[index],
          x: 0,
          y: 0,
          zIndex: dragCount + 1
        }
      },
      dragCount: dragCount + 1
    }));
  };

  handleDragStart = (id, e) => {
    const {
      pageX,
      pageY,
      target: { offsetLeft, offsetTop }
    } = e;

    this.setState(({ dragCount, items }) => ({
      draggedItem: {
        id,
        shift: { x: pageX - offsetLeft, y: pageY - offsetTop }
      },
      items: {
        ...items,
        [id]: {
          ...items[id],
          zIndex: dragCount + 1
        }
      },
      dragCount: dragCount + 1
    }));
  };

  handleDragEnd = () => {
    this.setState({
      draggedItem: null
    });
  };

  handleDrag = e => {
    const { items, draggedItem } = this.state;
    if (draggedItem) {
      this.setState({
        items: {
          ...items,
          [draggedItem.id]: {
            ...items[draggedItem.id],
            x: e.clientX - draggedItem.shift.x,
            y: e.clientY - draggedItem.shift.y
          }
        }
      });
    }
  };
  render() {
    const { items, draggedItem } = this.state;
    return (
      <div className={style.home}>
        <div className={style.homeBox} onMouseMove={this.handleDrag} onMouseUp={this.handleDragEnd}>
          {Object.keys(items).map(itemKey => (
            <Item
              key={itemKey}
              {...items[itemKey]}
              isDragged={draggedItem && itemKey === draggedItem.id}
              onMouseDown={e => this.handleDragStart(itemKey, e)}
            />
          ))}
          <div className={style.menu}>
            {ITEMS.map((item, itemIndex) => (
              <div
                className={style.menuItem}
                style={{ backgroundImage: `url(${item.src})` }}
                onClick={() => this.addItem(itemIndex)}
              />
            ))}
            <div className={style.menuItem}>clear</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
