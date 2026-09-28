# Пара 2 · Теория. Компоненты и JSX

<div align="center">

![JSX и компоненты](./images/doodle-jsx.png)

**Экран в React Native — это дерево компонентов.**  
JSX описывает, *что* нарисовать; JS считает, *как*.

</div>

---

## Зачем этот блок

До Bottom Tabs нужно одинаково понимать:

- что такое компонент
- чем JSX отличается от HTML
- как жить со стилями без CSS-файла

Иначе копипаста из веба сразу даёт красный экран.

---

## Компонент

Компонент — функция, которая возвращает UI:

```tsx
import { View, Text } from 'react-native';

export default function Hello() {
  return (
    <View>
      <Text>Привет</Text>
    </View>
  );
}
```

- Имя с **БольшойБуквы**
- Один экран = обычно один файл в `screens/`
- Повторяющиеся куски UI → маленькие компоненты рядом

---

## JSX — правила на пальцах

| Правило | Пример |
|---|---|
| Похож на HTML, это JS | `{name}` внутри текста |
| Нужен корень | оберни в `View` или `<>...</>` |
| Текст только в `Text` | `<Text>hi</Text>` |
| Стили — объекты | `style={styles.title}` |
| Нет `className`, `div`, `span` | только RN-компоненты |

```tsx
const name = 'Гоша';

<Text>Привет, {name}!</Text>
```

---

## Базовые кирпичи на пару 2

| Компонент | Как думать |
|---|---|
| `View` | коробка / `div` |
| `Text` | любой текст |
| `Pressable` / `Button` | нажатие |
| `StyleSheet` | словарь стилей |

Позже: `Image`, `ScrollView`, `TextInput`, `FlatList`.

---

## StyleSheet

```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
});
```

Частые свойства: `flex`, `padding`, `margin`, `backgroundColor`, `fontSize`, `color`, `borderRadius`.

---

## Props — коротко

Данные сверху вниз:

```tsx
function Title({ text }: { text: string }) {
  return <Text style={styles.title}>{text}</Text>;
}

// использование
<Title text="Добро пожаловать" />
```

На паре 2 props хватит на уровне «передать строку в дочерний компонент».

---

## Частые ошибки новичка

1. Текст вне `<Text>`  
2. Стили строкой `"color: red"` как в CSS  
3. `div` / `span` / `h1` из веба  
4. Забыли импорт компонента  
5. Два соседних корня без обёртки  

---

## Мини-проверка себя

Объясни соседу за 30 секунд:

1. Чем `View` отличается от `Text`  
2. Почему в RN нельзя просто написать текст в `View`  
3. Зачем `StyleSheet.create`  

Если ок — переходи к практике: `welcome-tabs/`.

---

## Ссылки

- [Components and APIs](https://reactnative.dev/docs/components-and-apis)
- [Style](https://reactnative.dev/docs/style)
