# Спецификация: учебное мобильное приложение

**Status**: Draft  
**Course**: Разработка мобильных приложений, осень–зима 2026  
**Стек**: Expo + TypeScript + React Native

Документ объединяет общую спеку семестра и лабы Welcome/Tabs и useState.

## Overview

Кроссплатформенное учебное приложение на React Native (Expo). Оно закрывает лабораторные работы курса и даёт клиент к учебному API: регистрация и вход, список пользователей, CRUD постов, настройки профиля и темы.

Запуск: iOS, Android, Expo Go, web. Тёмная тема — основная.

Цвета: фон `#0D0F14`, карточки `#1C2230`, текст `#E6E9EF` / `#9AA4B2`, акцент `#5EEAD4`.

## Сейчас в приложении

Вкладки Bottom Tabs:

| Вкладка | Экран | Статус |
| --- | --- | --- |
| Counter | `CounterScreen` | сдано: useState-счётчик |
| Labs | `HelloWorldScreen` | сдано: Lab 0 Hello World |
| About | `AboutScreen` | сдано: коротко о курсе |

Welcome-экран (`WelcomeScreen`) собран по лабе, но вкладка Home снята: стартовый экран — Counter.

Экраны лежат в `src/screens/`, навигация в `App.tsx`, цвета в `src/theme/colors.ts`.

### Lab 0 — Hello World

Цель: скелет Expo + TypeScript, запуск без правок native-кода.

Готово, если: `npm start` / iOS / Android / web открывают экран Hello World.

### Lab — Welcome + Bottom Tabs

Цель: каркас нижних вкладок.

- Экран Welcome: заголовок, подзаголовок, кнопка «Начать» → Alert
- Минимум 2–3 вкладки, между ними можно ходить
- Ограничения: View, Text, Pressable/Button, StyleSheet
- Не делаем: сложную навигацию из кнопки, анимации, UI-kit

Текущее состояние: табы есть (Counter / Labs / About), Welcome без отдельной вкладки.

### Lab — useState, счётчик

Цель: экран-счётчик на `useState`.

- UI: число по центру; кнопки `+`, `−`, Reset
- Старт с 0; `−` не ниже 0; Reset → 0
- Только `useState` + StyleSheet; без библиотек, AsyncStorage, сервера, Redux/Zustand
- Готово, если: три кнопки работают, экран в Tabs, код объясним

## Цели семестра

- Хуки React (`useState`, `useEffect`, `useMemo`) и Zustand на отдельных экранах
- Навигация: стек авторизации и нижние вкладки
- Учебный backend `https://cloud.kit-imi.info`: JWT, refresh, профили, пользователи, посты
- Единый UI и разделение стилей и логики

## Non-goals (v1)

- Собственный backend
- Публикация в сторы
- Push, офлайн-синхронизация
- WebRTC — опциональный P3

## Дальше по курсу

### useEffect / useMemo

Отдельные вкладки: загрузка поста с JSONPlaceholder с отменой запроса; Fibonacci через `useMemo` и фильтрация списка.

### Auth

Регистрация (`name`, `email`, `password`), вход, JWT в AsyncStorage, refresh на 401, восстановление сессии.

### Users / Posts / Settings

Список пользователей (поиск, роль, пагинация), CRUD постов, тема и выход.

### API

Base URL: `https://cloud.kit-imi.info`

| Method | Path | Auth | Назначение |
| --- | --- | --- | --- |
| GET | `/api/health` | no | Проверка доступности |
| POST | `/api/auth/register` | no | Регистрация |
| POST | `/api/auth/login` | no | Вход |
| GET | `/api/auth/profile` | yes | Профиль |
| POST | `/api/auth/refresh` | refresh | Обновление токенов |
| POST | `/api/auth/logout` | yes | Выход |
| GET | `/api/auth/users` | yes | Список пользователей |
| GET/POST/PUT/DELETE | `/api/posts` | yes | CRUD постов |
| GET | `/api/posts/my` | yes | Мои посты |
| GET | `/api/webrtc/ice-servers` | yes | ICE (P3) |

## Constraints

| Слой | Выбор |
| --- | --- |
| Runtime | Expo, React Native |
| Language | TypeScript |
| Navigation | React Navigation: bottom tabs (+ stack позже) |
| State | сейчас `useState`; дальше Zustand |
| HTTP | axios + interceptors |
| Storage | AsyncStorage |
| Package manager | npm |

## Delivery plan

1. Lab 0 — Expo skeleton, Hello World
2. Welcome + Bottom Tabs
3. useState — счётчик
4. useEffect + JSONPlaceholder
5. useMemo
6. axios + auth + Zustand
7. Users list
8. Posts CRUD
9. Settings, тема, lint
10. Optional — WebRTC

Каждый этап проверяется независимо и не ломает уже сданные экраны.
