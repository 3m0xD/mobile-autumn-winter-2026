# Lab 0 — Hello World

Мобильное приложение курса (React Native + Expo + TypeScript).

## Запуск

1. Установите Node.js LTS (если не установлен)
2. Установите зависимости:

```bash
cd mobile-app
npm install
```

3. Запустите приложение:

```bash
npm run ios     # iOS Simulator (macOS + Xcode)
npm run android # Android Emulator (Android Studio)
npm run web     # браузер
npm start       # Expo Dev Tools, можно открыть в Expo Go
```

## Структура

- `mobile-app` — Expo-проект
- `mobile-app/App.tsx` — корневой компонент
- `mobile-app/src/screens/HelloWorld` — стартовый экран Hello World
- `specs/001-mobile-app/spec.md` — спецификация проекта

## Заметки

- Для iOS нужен Xcode, для Android — Android Studio и эмулятор/устройство.
- Можно отсканировать QR-код Expo Go на телефоне и запустить без эмулятора.
