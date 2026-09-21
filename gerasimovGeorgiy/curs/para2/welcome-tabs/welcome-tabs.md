# Пара 2 · Практика. Welcome + Bottom Tabs

<div align="center">

![Welcome и Tabs](./images/doodle-para2-tabs.png)

**Собрать каркас приложения курса:**  
стартовый экран и нижние вкладки, куда потом лягут лабы.

</div>

---

## Цель практики

К концу блока у тебя:

- [ ] Есть `WelcomeScreen`
- [ ] Подключён **Bottom Tabs**
- [ ] Минимум 2–3 вкладки, между ними можно ходить
- [ ] Экраны лежат в `screens/`, не всё в `App.tsx`
- [ ] Изменения в PR

---

## Спека Welcome (SDD)

Запиши в `SPECS/lab-welcome.md`:

```text
Цель: стартовый экран приложения курса.

Стек: Expo + TypeScript.
Экран WelcomeScreen:
- заголовок («Добро пожаловать» / своё имя)
- подзаголовок (группа или «мобильная разработка»)
- кнопка «Начать» → пока Alert или console.log

Ограничения: View, Text, Pressable/Button, StyleSheet.
Готово, если: по центру, читаемые отступы, без красного экрана.
Не делаем: сложную навигацию из кнопки, анимации, UI-kit.
```

### Каркас экрана

```tsx
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добро пожаловать</Text>
      <Text style={styles.subtitle}>Мобильная разработка · СВФУ</Text>
      <Pressable style={styles.button} onPress={() => Alert.alert('Поехали')}>
        <Text style={styles.buttonText}>Начать</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 24 },
  button: {
    backgroundColor: '#111',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});
```

---

## Bottom Tabs

Лабы копятся **в одном приложении** вкладками:

```text
Home (Welcome) → Labs → About
```

### Установка

```bash
npx expo install @react-navigation/native @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context
```

### Каркас `App.tsx`

```tsx
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from './screens/WelcomeScreen';
import PlaceholderScreen from './screens/PlaceholderScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={WelcomeScreen} />
        <Tab.Screen name="Labs" component={PlaceholderScreen} />
        <Tab.Screen name="About" component={PlaceholderScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

`PlaceholderScreen` — временный текст: «Скоро: useState».

---

## Порядок работы на паре

1. Спека Welcome (5 мин)  
2. Файл `screens/WelcomeScreen.tsx`  
3. Показать Welcome без табов  
4. Поставить зависимости навигации  
5. Включить `Tab.Navigator`  
6. Заглушка на второй вкладке  
7. Коммит + пуш + обновить PR  

---

## Acceptance criteria

- [ ] `expo start` без ошибок
- [ ] Табы переключаются
- [ ] Home = ваш Welcome
- [ ] Код разложен по файлам
- [ ] В PR видны изменения

---

## Частые грабли

| Симптом | Что проверить |
|---|---|
| Табы не появляются | есть ли `NavigationContainer` |
| Красный экран на тексте | обёрнут ли текст в `Text` |
| «Module not found» | доставили ли пакеты через `npx expo install` |
| Всё в одном файле | вынести экраны в `screens/` |

---

## ИИ — только со спекой

```text
Expo + TypeScript.
Сделай WelcomeScreen и Bottom Tabs (3 вкладки) строго по спеке.
Экраны в screens/. Без лишних библиотек.
[вставь спеку]
```

Код на защите объясняешь **ты**.

---

## Ссылки

- [Bottom Tabs](https://reactnavigation.org/docs/bottom-tab-navigator/)
- Репо: https://github.com/arri1/mobile-autumn-winter-2026
