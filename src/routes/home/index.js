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

function intersectRect(r1, r2) {
  return !(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top);
}

const ITEMS = [
  { name: "fish1", src: fish1 },
  { name: "fish2", src: fish2 },
  { name: "head", src: head },
  { name: "mary", src: mary },
  { name: "moth1", src: moth1 },
  { name: "pig", src: pig },
  { name: "xRayHead", src: xRayHead }
];

const TRANSFORMS = {
  "fish1+fish2": "head",
  "fish1+head": "moth1",
  "fish1+mary": "pig",
  "fish1+moth1": "xRayHead",
  "fish1+pig": "fish2",
  "fish1+xRayHead": "mary",
  "fish2+head": "xRayHead",
  "fish2+mary": "moth1",
  "fish2+moth1": "moth1",
  "fish2+pig": "fish2",
  "fish2+xRayHead": "head",
  "head+mary": "xRayHead",
  "head+moth1": "fish1",
  "head+pig": "fish2",
  "head+xRayHead": "mary",
  "mary+moth1": "fish2",
  "mary+pig": "mary",
  "mary+xRayHead": "head",
  "moth1+pig": "head",
  "moth1+xRayHead": "fish1",
  "pig+xRayHead": "head",
  "fish1+fish1": "fish2",
  "fish2+fish2": "fish1",
  "head+head": "pig",
  "mary+mary": "moth1",
  "moth1+moth1": "xRayHead",
  "pig+pig": "head",
  "xRayHead+xRayHead": "mary"
};

class Home extends Component {
  state = {
    items: {},
    draggedItem: null,
    dragCount: 0,
    lastId: 0
  };

  clearItems = () => {
    this.setState({
      items: {},
      dragCount: 0
    });
  };

  addItem = index => {
    this.setState(({ items, dragCount, lastId }) => ({
      items: {
        ...items,
        [lastId]: {
          ...ITEMS[index],
          x: 0,
          y: 0,
          zIndex: dragCount + 1
        }
      },
      dragCount: dragCount + 1,
      lastId: lastId + 1
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

  handleDragEnd = e => {
    const { draggedItem, items, lastId, dragCount } = this.state;
    if (draggedItem) {
      const rect = e.target.getBoundingClientRect();
      const itemsWithRects = Object.keys(items)
        .filter(itemKey => itemKey !== draggedItem.id)
        .map(itemKey => {
          const itemEl = document.getElementById(itemKey);
          return {
            id: itemKey,
            rect: itemEl.getBoundingClientRect()
          };
        });
      const intersectedItems = itemsWithRects.filter(itemRect =>
        intersectRect(itemRect.rect, rect)
      );
      if (intersectedItems.length > 0) {
        const intersectedItem = intersectedItems[0];
        const merged = `${items[intersectedItem.id].name}+${items[draggedItem.id].name}`;
        const mergedAlt = `${items[draggedItem.id].name}+${items[intersectedItem.id].name}`;
        const mergedItemName = TRANSFORMS[merged] || TRANSFORMS[mergedAlt];
        const mergedItems = ITEMS.filter(i => i.name === mergedItemName);
        if (mergedItems.length > 0) {
          const newItems = Object.keys(items).reduce(
            (currentItems, itemKey) =>
              itemKey === intersectedItem.id || itemKey === draggedItem.id
                ? currentItems
                : { ...currentItems, [itemKey]: items[itemKey] },
            {}
          );

          const newItem = {
            ...mergedItems[0],
            x: items[draggedItem.id].x,
            y: items[draggedItem.id].y,
            zIndex: dragCount + 1
          };

          this.setState({
            items: {
              ...newItems,
              [lastId]: newItem
            },
            dragCount: dragCount + 1,
            lastId: lastId + 1
          });
        }
      }
      this.setState({
        draggedItem: null
      });
    }
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
              id={itemKey}
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
            <div className={style.menuItem} onClick={this.clearItems}>
              clear
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
