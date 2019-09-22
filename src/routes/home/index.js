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
import arrow from "../../assets/images/arrow.png";
import blueBall from "../../assets/images/blue-ball.png";
import body from "../../assets/images/body.png";
import bug from "../../assets/images/bug.png";
import bug2 from "../../assets/images/bug2.png";
import bug3 from "../../assets/images/bug3.png";
import buton from "../../assets/images/button.png";
import chestnut from "../../assets/images/chestnut.png";
import eagle from "../../assets/images/eagle.png";
import earring from "../../assets/images/earring.png";
import fish3 from "../../assets/images/fish3.png";
import fish4 from "../../assets/images/fish4.png";
import fishSeller from "../../assets/images/fish-seller.png";
import garbage from "../../assets/images/garbage.png";
import hat from "../../assets/images/hat.png";
import hook from "../../assets/images/hook.png";
import jackfruit from "../../assets/images/jackfruit.png";
import lady from "../../assets/images/lady.png";
import lock from "../../assets/images/lock.png";
import neri from "../../assets/images/neri-karra.png";
import plateGuy from "../../assets/images/plate-guy.png";
import rockets from "../../assets/images/rockets.png";
import snail from "../../assets/images/snail.png";
import thing from "../../assets/images/thing.png";
import threader from "../../assets/images/threader.png";
import dyrbul from "../../assets/images/dyrbul.png";
import alex from "../../assets/images/alex.png";
import death from "../../assets/images/death.png";
import gril from "../../assets/images/gril.png";
import egg from "../../assets/images/egg.png";
import device2 from "../../assets/images/device2.png";
import me from "../../assets/images/me.png";
import rock from "../../assets/images/rock.png";

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
  { name: "xRayHead", src: xRayHead },
  { name: "arrow", src: arrow },
  { name: "blueBall", src: blueBall },
  { name: "body", src: body },
  { name: "bug", src: bug },
  { name: "buton", src: buton },
  { name: "chestnut", src: chestnut },
  { name: "eagle", src: eagle },
  { name: "earring", src: earring },
  { name: "fish3", src: fish3 },
  { name: "fish4", src: fish4 },
  { name: "fishSeller", src: fishSeller },
  { name: "garbage", src: garbage },
  { name: "hat", src: hat },
  { name: "hook", src: hook },
  { name: "jackfruit", src: jackfruit },
  { name: "lady", src: lady },
  { name: "lock", src: lock },
  { name: "neri", src: neri },
  { name: "plateGuy", src: plateGuy },
  { name: "rockets", src: rockets },
  { name: "snail", src: snail },
  { name: "thing", src: thing },
  { name: "threader", src: threader },
  { name: "bug2", src: bug2 },
  { name: "bug3", src: bug3 },
  { name: "dyrbul", src: dyrbul },
  { name: "alex", src: alex },
  { name: "death", src: death },
  { name: "gril", src: gril },
  { name: "egg", src: egg },
  { name: "device2", src: device2 },
  { name: "me", src: me },
  { name: "rock", src: rock }
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
    lastId: 0,
    isMenuOpen: true,
    isInfoOpen: true,
    sceneId: "",
    scenes: {}
  };

  handleSceneIdInput = e => {
    this.setState({ sceneId: e.target.value });
  };

  toggleInfo = () => {
    this.setState(({ isInfoOpen }) => ({
      isInfoOpen: !isInfoOpen
    }));
  };

  toggleMenu = () => {
    this.setState(({ isMenuOpen }) => ({
      isMenuOpen: !isMenuOpen
    }));
  };

  clearItems = () => {
    this.setState({
      items: {},
      dragCount: 0
    });
  };

  loadScenes = () => {
    const scenes = JSON.parse(window.localStorage.getItem("scenes") || "{}");
    this.setState({ scenes });
  };

  openScene = sceneId => {
    const { scenes } = this.state;
    if (scenes[sceneId]) {
      this.setState({
        items: scenes[sceneId],
        dragCount: scenes[sceneId].length,
        lastId: scenes[sceneId].length,
        draggedItem: null
      });
    }
  };

  deleteScene = sceneId => {
    const { scenes, items } = this.state;
    const newScenes = Object.keys(scenes).reduce(
      (ns, s) => (s === sceneId ? ns : { ...ns, [s]: scenes[s] }),
      {}
    );
    if (sceneId.length > 0 && Object.keys(items).length > 0) {
      window.localStorage.setItem("scenes", JSON.stringify(newScenes));
      this.loadScenes();
    }
  };

  saveScene = () => {
    const { scenes, sceneId, items } = this.state;
    if (sceneId.length > 0 && Object.keys(items).length > 0) {
      window.localStorage.setItem(
        "scenes",
        JSON.stringify({
          ...scenes,
          [sceneId]: items
        })
      );
      this.setState({ sceneId: "" });
      this.loadScenes();
    }
  };

  addItem = item => {
    this.setState(({ items, dragCount, lastId }) => ({
      items: {
        ...items,
        [lastId]: {
          ...item,
          x: item.x + 10 || window.innerWidth / 2 - 75,
          y: item.y + 10 || window.innerHeight / 2 - 75,
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
      const trashRect = document.getElementById("trash").getBoundingClientRect();
      if (intersectRect(rect, trashRect)) {
        const newItems = Object.keys(items).reduce(
          (currentItems, itemKey) =>
            itemKey === draggedItem.id
              ? currentItems
              : { ...currentItems, [itemKey]: items[itemKey] },
          {}
        );
        this.setState({
          items: newItems
        });
      } else {
        const intersectedItems = Object.keys(items)
          .filter(itemKey => itemKey !== draggedItem.id)
          .map(itemKey => {
            const itemEl = document.getElementById(itemKey);
            return {
              id: itemKey,
              rect: itemEl.getBoundingClientRect()
            };
          })
          .filter(item => intersectRect(item.rect, rect))
          .map(item => {
            const merged = `${items[item.id].name}+${items[draggedItem.id].name}`;
            const mergedAlt = `${items[draggedItem.id].name}+${items[item.id].name}`;
            const mergedItemName = TRANSFORMS[merged] || TRANSFORMS[mergedAlt];
            const mergedItems = ITEMS.filter(i => i.name === mergedItemName);
            return {
              ...item,
              mergedItem: mergedItems.length > 0 ? mergedItems[0] : null
            };
          })
          .filter(item => item.mergedItem);
        if (intersectedItems.length > 0) {
          const intersectedItem = intersectedItems[0];
          const newItems = Object.keys(items).reduce(
            (currentItems, itemKey) =>
              itemKey === intersectedItem.id || itemKey === draggedItem.id
                ? currentItems
                : { ...currentItems, [itemKey]: items[itemKey] },
            {}
          );

          const newItem = {
            ...intersectedItem.mergedItem,
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
      const rect = document.getElementById(draggedItem.id).getBoundingClientRect();
      const trashRect = document.getElementById("trash").getBoundingClientRect();
      this.setState({
        items: {
          ...items,
          [draggedItem.id]: {
            ...items[draggedItem.id],
            x: e.clientX - draggedItem.shift.x,
            y: e.clientY - draggedItem.shift.y,
            isOverTrash: intersectRect(rect, trashRect)
          }
        }
      });
    }
  };

  componentDidMount() {
    this.loadScenes();
  }

  render() {
    const { items, draggedItem, isMenuOpen, isInfoOpen, scenes, sceneId } = this.state;
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
              onDblClick={() => this.addItem(items[itemKey])}
            />
          ))}

          <div className={isMenuOpen ? style.menuOpen : style.menu}>
            <button className={style.menuButton} onClick={this.toggleMenu}>
              {isMenuOpen ? "➡️" : "⬅️"}
            </button>
            {ITEMS.map((item, itemIndex) => (
              <div
                className={style.menuItem}
                style={{ backgroundImage: `url(${item.src})` }}
                onClick={() => this.addItem(item)}
              />
            ))}
          </div>
          <div id="trash" className={style.trash} onClick={this.clearItems}>
            🗑
          </div>
          {isInfoOpen ? (
            <div className={style.info}>
              <button className={style.infoClose} onClick={this.toggleInfo}>
                ❌
              </button>
              ❓❓❓
              <br />
              <br />
              click on any item in the menu to add it to the canvas
              <br />
              items are draggable
              <br />
              double click on an item to clone it
              <br />
              drag one item over another to see if they merge into smth else
              <br />
              drag an item over trash bin and release to delete it
              <br />
              click the trash bin to clear the canvas
              <br />
              <br />
              нажимайте на объекты в правом меню
              <br />
              объекты можно перетаскивать
              <br />
              двойной клик по объекту клонирует его
              <br />
              перетащите один объект на другой <br />
              (возможно, они превратятся во что-то другое)
              <br />
              перетащите объект на мусорку, чтобы удалить его
              <br />
              нажмите на мусорку, чтобы удалить все объекты
            </div>
          ) : (
            <button className={style.info} onClick={this.toggleInfo}>
              ❓❓❓
            </button>
          )}
          <div className={style.scenes}>
            <input onInput={this.handleSceneIdInput} value={sceneId} />
            <button className={style.scenesSave} onClick={this.saveScene}>
              save
            </button>
            <div className={style.scenesItems}>
              {Object.keys(scenes).map(sceneId => (
                <div className={style.scenesItem} onClick={() => this.openScene(sceneId)}>
                  {sceneId} <button onClick={() => this.deleteScene(sceneId)}>❌</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
