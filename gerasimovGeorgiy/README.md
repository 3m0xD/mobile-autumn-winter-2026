# gerasimovGeorgiy

Учебное мобильное приложение курса (React Native + Expo + TypeScript).

## Папки

```
gerasimovGeorgiy/
├── README.md
├── curs/                 # конспекты пар
│   ├── para1/
│   └── para2/
└── mobile-app/           # Expo-проект
    ├── .cursor/          # правила для Cursor
    ├── SPECS.md          # объединённая спецификация
    ├── App.tsx           # Bottom Tabs
    └── src/screens/      # Counter, Labs (Hello World), About, Welcome
```

## Запуск

```bash
cd mobile-app
npm install
npm run ios      # iOS Simulator
npm run android  # Android Emulator
npm run web      # браузер
npm start        # Expo Go
```

Для iOS нужен Xcode, для Android — Android Studio. Можно открыть проект в Expo Go по QR-коду.
