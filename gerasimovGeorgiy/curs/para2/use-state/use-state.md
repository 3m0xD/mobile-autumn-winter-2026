# Пара 2 · useState — состояние на экране

<div align="center">

![useState](./images/doodle-usestate.png)

**`useState` — память экрана.**  
Нажал кнопку → значение изменилось → React Native перерисовал UI.

</div>

---

## Зачем

Без состояния экран «мёртвый»: текст всегда один и тот же.  
С `useState` экран реагирует на действия: счётчик, переключатель, поле ввода.

На курсе это первая хук-лаба: отдельная вкладка со **счётчиком**.

---

## Идея за 30 секунд

```tsx
import { useState } from 'react';

const [count, setCount] = useState(0);
//      ^       ^              ^
//   значение  функция       начальное
//             обновления    значение
```

| Часть | Роль |
|---|---|
| `count` | текущее значение (читать) |
| `setCount` | поставить новое значение |
| `useState(0)` | старт с нуля |

После `setCount(...)` компонент **рендерится снова** с новым `count`.

---

## Минимальный счётчик

```tsx
import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function CounterScreen() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.value}>{count}</Text>

      <View style={styles.row}>
        <Pressable style={styles.btn} onPress={() => setCount(c => Math.max(0, c - 1))}>
          <Text style={styles.btnText}>−</Text>
        </Pressable>

        <Pressable style={styles.btn} onPress={() => setCount(0)}>
          <Text style={styles.btnText}>Reset</Text>
        </Pressable>

        <Pressable style={styles.btn} onPress={() => setCount(c => c + 1)}>
          <Text style={styles.btnText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  value: { fontSize: 64, fontWeight: '700', marginBottom: 24 },
  row: { flexDirection: 'row', gap: 12 },
  btn: {
    backgroundColor: '#111',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  btnText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
```

---

## Важные правила

1. **Не мутируй** напрямую: `count++` / `count = 5` — нельзя
2. Только через сеттер: `setCount(count + 1)` или `setCount(c => c + 1)`
3. Хуки только **на верхнем уровне** компонента (не внутри `if` / цикла)
4. Импорт: `import { useState } from 'react'`

### Функциональное обновление

Если новое значение зависит от старого — безопаснее так:

```tsx
setCount(c => c + 1);
setCount(c => Math.max(0, c - 1)); // не уходить ниже 0
```

---

## Несколько состояний

```tsx
const [count, setCount] = useState(0);
const [isOn, setIsOn] = useState(false);
const [name, setName] = useState('');
```

Для лабы хватит **одного** числа.

---

## Спека лабы (SDD)

`SPECS/lab-usestate.md`:

```text
Цель: экран-счётчик на useState.

Стек: Expo + TypeScript.
Экран CounterScreen на отдельной вкладке (Labs / Counter).
UI: число по центру; кнопки +, −, Reset.
Поведение: старт 0; − не ниже 0; Reset → 0.
Ограничения: только useState + StyleSheet; без библиотек.
Готово, если: три кнопки работают, экран в Tabs, код объясним.
Не делаем: AsyncStorage, сервер, анимации, Redux/Zustand.
```

---

## Куда встроить

```tsx
<Tab.Screen name="Counter" component={CounterScreen} />
```

Заглушку «Скоро: useState» заменить на живой экран.

---

## Acceptance criteria

- [ ] Файл `screens/CounterScreen.tsx`
- [ ] Есть `useState`
- [ ] `+` / `−` / `Reset` работают
- [ ] Число не уходит ниже 0
- [ ] Экран в Bottom Tabs
- [ ] В PR видно изменения

---

## Частые ошибки

| Ошибка | Почему плохо |
|---|---|
| `count++` вместо `setCount` | UI не обновится как надо |
| `useState` внутри `if` | Нарушение правил хуков |
| Забыли импорт из `react` | Красный экран |
| Всё в `App.tsx` | Потом не разнести по лабам |

---

## ИИ-промпт

```text
Expo + TypeScript.
Сделай CounterScreen строго по спеке ниже.
Только useState и StyleSheet. Экран для Bottom Tabs.
[вставь спеку]
```

---

## Ссылки

- [useState](https://react.dev/reference/react/useState)
- Табы: `../welcome-tabs/welcome-tabs.md`
