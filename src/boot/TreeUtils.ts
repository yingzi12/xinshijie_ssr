export function findAndModify(props: any[], targetId: number, newChild: any): any[] {
  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    if (prop.id === targetId) {
      if (!prop.children) {
        prop.children = [];
      }
      prop.children.push(newChild);
      return props; // 返回修改后的数组
    } else if (prop.children) {
      // 如果当前节点有子节点，递归查找
      const result = findAndModify(prop.children, targetId, newChild);
      if (result) {
        return result; // 如果递归查找有结果，返回结果
      }
    }
  }
  return props; // 如果没有找到目标ID，返回原始数组
}
// 删除找到的节点
export const deleteFunction = (array: any[], targetId: number) => {
  return array.filter(item => item.id !== targetId);
};
export function findAndModifyLabel(props: any[], targetId: number, newLabel: string): any[] {
  return props.map(prop => {
    if (prop.id === targetId) {
      // 如果找到了目标ID，更新label并返回新的prop对象
      return {
        ...prop, // 复制prop对象的所有属性
        label: newLabel // 更新label属性
      };
    } else if (prop.children) {
      // 如果当前节点有子节点，递归查找并修改
      return {
        ...prop,
        children: findAndModifyLabel(prop.children, targetId, newLabel)
      };
    }
    // 如果没有找到目标ID，返回原始的prop对象
    return prop;
  });
}

// 要添加的新子节点
const newChild = {
  id: 12,
  label: 'Newly added child',
  icon: 'new_icon'
};

// 要删除的节点ID
const targetIdToDelete = 2;
const props= [
  {
    id: 1,
    label: 'Satisfied customers',
    avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
    children: [
      {
        id: 2,
        label: 'Good food',
        icon: 'restaurant_menu',
        children: [
          {
            id: 10,
            label: 'Quality ingredients'
          },

          {
            id: 11,
            label: 'Good recipe'
          }
        ]
      },
      {
        id: 3,
        label: 'Good service',
        icon: 'room_service',
        children: [
          {
            id: 8,
            label: 'Prompt attention' },
          {
            id: 9,
            label: 'Professional waiter'
          }
        ]
      },
      {
        id: 4,
        label: 'Pleasant surroundings',
        icon: 'photo',
        children: [
          {
            id: 5,
            label: 'Happy atmosphere'
          },
          {
            id: 6,
            label: 'Good table presentation'
          },
          {
            id: 7,
            label: 'Pleasing decor'
          }
        ]
      }
    ]
  }
]

// 查找并修改props数组
const modifiedProps = findAndModify(props, targetIdToDelete, newChild);


const finalProps = deleteFunction(modifiedProps, targetIdToDelete);

console.log(finalProps);
// 要修改的目标ID
const targetId = 2;
// 新的label
const newLabel = 'Updated label';

// 调用函数修改label
const propsWithUpdatedLabel = findAndModifyLabel(props, targetId, newLabel);

console.log(propsWithUpdatedLabel);
