// 定义一个接口，描述了对象的结构
export interface MyObject {
  id: number;
  title: string;
  info: string;
  bh: number;
}

// 初始的 MyObject 类型的对象数组
export const myObjectArray: MyObject[] = [
  { id: 1, title: 'Title 1', info: 'Info 1', bh: 1001 },
  { id: 2, title: 'Title 2', info: 'Info 2', bh: 1002 },
  { id: 3, title: 'Title 3', info: 'Info 3', bh: 1003 }
];

// 1. 添加对象到数组末尾
export function addObject(array: MyObject[], newObject: MyObject): MyObject[] {
  return [...array, newObject];
}

// 2. 在指定id后面插入一个对象
export function insertObjectAfterId(array: MyObject[], id: number, newObject: MyObject): MyObject[] {
  const index = array.findIndex(obj => obj.id === id);
  if (index === -1) {
    // 如果没找到指定id，则添加到数组末尾
    return [...array, newObject];
  } else {
    // 在找到的位置后面插入新对象
    return [
      ...array.slice(0, index + 1),
      newObject,
      ...array.slice(index + 1)
    ];
  }
}

// 3. 删除指定id的对象
export function removeObjectById(array: MyObject[], id: number): MyObject[] {
  return array.filter(obj => obj.id !== id);
}

// 示例用法
const newObjectToAdd: MyObject = { id: 4, title: 'Title 4', info: 'Info 4', bh: 1004 };
const updatedArrayAfterAdd = addObject(myObjectArray, newObjectToAdd);
console.log(updatedArrayAfterAdd);

const newObjectToInsert: MyObject = { id: 5, title: 'Title 5', info: 'Info 5', bh: 1005 };
const updatedArrayAfterInsert = insertObjectAfterId(myObjectArray, 1, newObjectToInsert);
console.log(updatedArrayAfterInsert);

const idToRemove = 2;
const updatedArrayAfterRemove = removeObjectById(myObjectArray, idToRemove);
console.log(updatedArrayAfterRemove);
