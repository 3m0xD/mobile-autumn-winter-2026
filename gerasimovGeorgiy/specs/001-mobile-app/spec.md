# Feature Specification: Учебное мобильное приложение

**Feature Branch**: `001-mobile-app`  
**Created**: 2026-09-14  
**Status**: Draft  
**Course**: Разработка мобильных приложений, осень–зима 2026  
**Input**: Спецификация React Native проекта для папки `gerasimovGeorgiy`

## Overview

Кроссплатформенное учебное приложение на React Native (Expo). Оно закрывает лабораторные работы курса и даёт полноценный клиент к учебному API: регистрация и вход, список пользователей, CRUD постов, настройки профиля и темы.

Приложение должно запускаться на iOS, Android и в Expo Go. Тёмная тема — основная.

## Goals

- Освоить хуки React (`useState`, `useEffect`, `useMemo`) и глобальное состояние (Zustand) на отдельных лабораторных экранах.
- Собрать навигацию: стек авторизации и нижние вкладки основного приложения.
- Подключить учебный backend (`https://cloud.kit-imi.info`) через axios: JWT, refresh, профили, пользователи, посты.
- Выдержать единый UI (тёмная тема, teal-акцент) и разделение стилей и логики.

## Non-goals (v1)

- Собственный backend: используется существующий API.
- Публикация в App Store / Google Play.
- Push-уведомления, офлайн-синхронизация, социальные графы.
- Видеозвонки WebRTC — опциональный P3, не блокер сдачи.

## User Scenarios & Testing

### User Story 1 — Лаборатории хуков (Priority: P1)

Студент открывает приложение без обязательного усложнения API и на отдельных вкладках видит рабочие примеры `useState`, `useEffect` и `useMemo`.

**Why this priority**: это базовые лабораторные курса, их можно сдавать независимо от авторизации.

**Independent Test**: запустить приложение, пройти три вкладки, убедиться, что счётчик, загрузка данных и мемоизация работают.

**Acceptance Scenarios**:

1. **Given** открыта вкладка `useState`, **When** пользователь жмёт `+1` / `-1` / `Reset`, **Then** счётчик обновляется, для отрицательных значений показывается статус `negative`.
2. **Given** открыта вкладка `useState`, **When** пользователь вводит имя, **Then** приветствие сразу отражает ввод; переключатель меняет статус `включено` / `выключено`.
3. **Given** открыта вкладка `useEffect`, **When** меняется id поста, **Then** загружается пост с JSONPlaceholder, предыдущий запрос отменяется, есть индикатор загрузки.
4. **Given** открыта вкладка `useEffect`, **When** таймер включён, **Then** секунды тикают каждую секунду; выключение останавливает интервал без утечки.
5. **Given** открыта вкладка `useMemo`, **When** пользователь задаёт `n` для Fibonacci (0–35), **Then** результат считается через `useMemo` и не пересчитывается при несвязанных изменениях UI.
6. **Given** список из 500 элементов на вкладке `useMemo`, **When** пользователь вводит поисковый запрос, **Then** список фильтруется мемоизированно и показывается `Показано X из 500`.

---

### User Story 2 — Регистрация и вход (Priority: P1)

Новый пользователь создаёт аккаунт, существующий входит по email и паролю. После успеха открывается основное приложение; сессия переживает перезапуск.

**Why this priority**: без авторизации недоступны пользователи, посты и профиль.

**Independent Test**: зарегистрироваться, выйти, войти снова, убить процесс приложения и убедиться, что сессия восстановлена.

**Acceptance Scenarios**:

1. **Given** пользователь на экране регистрации, **When** заполнены имя, валидный email, пароль ≥ 6 символов и совпадающее подтверждение, **Then** аккаунт создаётся и выполняется автоматический вход.
2. **Given** невалидные поля (пустые, email без `@`, короткий пароль, пароли не совпадают), **When** пользователь жмёт «Зарегистрироваться», **Then** показывается понятная ошибка, запрос на сервер не уходит.
3. **Given** пользователь на экране входа, **When** введены верные email и пароль, **Then** сохраняются access/refresh токены и данные пользователя, открываются нижние вкладки.
4. **Given** неверные учётные данные, **When** пользователь жмёт «Войти», **Then** показывается ошибка сервера, пользователь остаётся на экране входа.
5. **Given** сохранённые токены, **When** приложение запускается, **Then** пользователь попадает сразу в основное приложение без повторного входа.
6. **Given** access token истёк, **When** любой API-запрос вернул 401, **Then** клиент обновляет токен через refresh и повторяет запрос; если refresh не удался — сессия сбрасывается и показывается логин.

---

### User Story 3 — Zustand-лаборатория и настройки (Priority: P2)

Пользователь видит глобальное состояние (тема, профиль, флаги) и меняет его на вкладках Zustand и «Настройки». Изменения темы применяются в приложении.

**Why this priority**: закрепляет глобальный store после локальных хуков.

**Independent Test**: переключить тему и developer mode, открыть другую вкладку, убедиться, что значения те же; выйти из аккаунта.

**Acceptance Scenarios**:

1. **Given** авторизованный пользователь, **When** открыта вкладка Zustand, **Then** видны имя, email и статус авторизации из `authStore`.
2. **Given** экран настроек, **When** переключается тёмная тема, **Then** значение сохраняется в Zustand и UI обновляется.
3. **Given** экран настроек, **When** пользователь подтверждает выход, **Then** токены и user data удаляются, открывается стек авторизации.
4. **Given** экран настроек, **When** пользователь отменяет выход в диалоге, **Then** сессия не меняется.

---

### User Story 4 — Список пользователей (Priority: P2)

Авторизованный пользователь просматривает список пользователей API: поиск, фильтр по роли, пагинация, pull-to-refresh.

**Why this priority**: лабораторная на axios, списки и работу с API.

**Independent Test**: войти, открыть «Пользователи», найти по имени, сменить роль, обновить список.

**Acceptance Scenarios**:

1. **Given** авторизованный пользователь, **When** открыта вкладка «Пользователи», **Then** загружается первая страница (лимит 10) с индикатором загрузки.
2. **Given** список загружен, **When** пользователь вводит поисковый запрос, **Then** запрос уходит с `search`, список обновляется.
3. **Given** фильтры ролей (`все` / `USER` / `ADMIN`), **When** выбран фильтр, **Then** запрос содержит `role` (кроме «все»).
4. **Given** ошибка сети или 403, **When** загрузка не удалась, **Then** показывается сообщение и кнопка «Повторить».
5. **Given** карточка пользователя, **Then** видны имя, email, роль; у `ADMIN` визуально отличается акцент карточки.

---

### User Story 5 — CRUD постов (Priority: P1)

Пользователь просматривает ленту постов, ищет, фильтрует опубликованные/черновики, создаёт, редактирует и удаляет свои посты.

**Why this priority**: основной прикладной сценарий курса после авторизации.

**Independent Test**: создать пост, найти его поиском, отредактировать, снять с публикации, удалить.

**Acceptance Scenarios**:

1. **Given** авторизованный пользователь, **When** открыта вкладка «Посты», **Then** загружается страница постов (лимит 10) с пагинацией.
2. **Given** лента, **When** пользователь создаёт пост с заголовком, текстом и флагом published, **Then** пост появляется в списке после успешного `POST /api/posts`.
3. **Given** свой пост, **When** пользователь редактирует поля в модалке, **Then** изменения сохраняются через `PUT /api/posts/:id`.
4. **Given** свой пост, **When** пользователь подтверждает удаление, **Then** пост исчезает после `DELETE /api/posts/:id`.
5. **Given** фильтр «Мои посты», **When** он включён, **Then** используется `GET /api/posts/my`.
6. **Given** фильтр published/draft/all и строка поиска, **When** меняются параметры, **Then** список перезапрашивается с `page`, `search`, `published`.
7. **Given** чужой пост, **Then** действия редактирования и удаления недоступны.
8. **Given** пустой список, **Then** показывается empty state, а не пустой экран.

---

### User Story 6 — Видеозвонок (Priority: P3, stretch)

Пользователь инициирует WebRTC-звонок другому онлайн-пользователю.

**Why this priority**: дополнительная фича прошлого потока, не обязательна для зачёта лабораторий.

**Independent Test**: два устройства/симулятора, звонок из списка пользователей, аудио/видео, завершение.

**Acceptance Scenarios**:

1. **Given** два авторизованных клиента, **When** один нажимает «Позвонить», **Then** второй получает входящий звонок.
2. **Given** активный звонок, **When** пользователь завершает его, **Then** медиапотоки закрываются, оба возвращаются в приложение.

---

### Edge Cases

- Нет сети: экраны API показывают ошибку и retry, лаборатории хуков продолжают работать локально.
- Пустой поиск: возвращается полный список текущей страницы.
- Fibonacci `n` вне 0–35: значение clamp-ится.
- Двойной тап «Войти» / «Создать пост»: повторный submit блокируется, пока идёт запрос.
- Истёкший refresh token: полный logout без бесконечного цикла 401.
- Некорректный JSON пользователя в AsyncStorage: сессия не падает, пользователь попадает на логин.
- Пагинация за последней страницей: кнопки next disabled.

## Requirements

### Functional Requirements

- **FR-001**: Приложение MUST запускаться через Expo на iOS, Android и (желательно) web.
- **FR-002**: Неавторизованный пользователь MUST видеть только стек Login / Register.
- **FR-003**: Авторизованный пользователь MUST видеть нижние вкладки: useState, useEffect, useMemo, Zustand, Пользователи, Посты, Настройки.
- **FR-004**: Система MUST регистрировать пользователя по `name`, `email`, `password`.
- **FR-005**: Система MUST входить по `email` и `password` и сохранять JWT в AsyncStorage.
- **FR-006**: Все защищённые запросы MUST отправлять `Authorization: Bearer <accessToken>`.
- **FR-007**: При 401 клиент MUST один раз обновить access token и повторить исходный запрос.
- **FR-008**: Система MUST уметь загрузить профиль текущего пользователя.
- **FR-009**: Система MUST отображать список пользователей с пагинацией, поиском и фильтром роли.
- **FR-010**: Система MUST поддерживать CRUD постов и фильтр «мои посты».
- **FR-011**: Только автор поста MAY редактировать и удалять его.
- **FR-012**: Настройки MUST показывать имя и email текущего пользователя и давать выход с подтверждением.
- **FR-013**: Тема (dark/light) MUST храниться в Zustand; по умолчанию dark.
- **FR-014**: Лабораторные экраны MUST демонстрировать заявленные хуки без обращения к учебному API (кроме JSONPlaceholder на useEffect).
- **FR-015**: Стили MUST быть вынесены из экранов (`*.styles.ts` / styled-components), inline styles запрещены линтером.
- **FR-016**: Ошибки API MUST показываться пользователю на русском языке.

### Key Entities

- **User**: `id`, `name`, `email`, `role` (`USER` | `ADMIN`).
- **Session**: `accessToken`, `refreshToken`, `user`, `isAuthenticated`.
- **Post**: `id`, `title`, `content`, `published`, `authorId`, `author`, `createdAt`, `updatedAt`.
- **AppSettings**: `theme` (`dark` | `light`), `enabled` (developer mode).
- **PaginatedList<T>**: `items`, `page`, `limit`, `totalPages` (или эквивалент ответа API).

## Screens

| Экран | Навигация | Доступ |
| --- | --- | --- |
| Login | Auth stack | guest |
| Register | Auth stack | guest |
| useState Lab | Tabs | auth |
| useEffect Lab | Tabs | auth |
| useMemo Lab | Tabs | auth |
| Zustand Lab | Tabs | auth |
| Users | Tabs | auth |
| Posts | Tabs | auth |
| Settings | Tabs | auth |
| Call | stack поверх tabs | auth, P3 |

## API Contract

Base URL: `https://cloud.kit-imi.info`

| Method | Path | Auth | Назначение |
| --- | --- | --- | --- |
| GET | `/api/health` | no | Проверка доступности |
| POST | `/api/auth/register` | no | Регистрация `{ name, email, password }` |
| POST | `/api/auth/login` | no | Вход `{ email, password }` → tokens + user |
| GET | `/api/auth/profile` | yes | Текущий пользователь |
| POST | `/api/auth/refresh` | refresh | Новая пара токенов |
| POST | `/api/auth/logout` | yes | Инвалидация сессии |
| GET | `/api/auth/users` | yes | Список: `page`, `limit`, `role`, `search` |
| GET | `/api/posts` | yes | Лента: `page`, `limit`, `published`, `authorId`, `search` |
| GET | `/api/posts/my` | yes | Посты текущего пользователя |
| GET | `/api/posts/:id` | yes | Один пост |
| POST | `/api/posts` | yes | Создание `{ title, content, published }` |
| PUT | `/api/posts/:id` | yes | Обновление |
| DELETE | `/api/posts/:id` | yes | Удаление |
| GET | `/api/webrtc/ice-servers` | yes | ICE-серверы (P3) |

Клиент нормализует ошибки: сообщение с сервера (`message` / `error`) или «Сервер недоступен. Проверьте подключение к интернету.»

## Technical Constraints

Курс явно требует React Native, поэтому стек фиксируется здесь, а не откладывается в отдельный plan.

| Слой | Выбор |
| --- | --- |
| Runtime | Expo (актуальный стабильный SDK), React Native |
| Language | TypeScript |
| Navigation | React Navigation: native stack + bottom tabs |
| State | Zustand (`authStore`, `useStore`) |
| HTTP | axios + interceptors |
| Storage | `@react-native-async-storage/async-storage` |
| UI | styled-components, стили в отдельных файлах |
| Icons | `@expo/vector-icons` (Ionicons) |
| Lint/format | ESLint (react, hooks, RN, no-inline-styles) + Prettier |
| Package manager | npm |

### Architecture

```
mobile-app/
  App.tsx                 # auth gate: AuthNavigator | RootTabs
  src/
    navigation/
      AuthNavigator.tsx
      RootTabs.tsx
    screens/
      Auth/
      UseStateLab/
      UseEffectLab/
      UseMemoLab/
      ZustandLab/
      Users/
      PostsScreen/
      Settings/
    store/
      authStore.ts
      useStore.ts
    services/
      api.ts
    theme/
      colors.ts
```

- UI не ходит в API напрямую: только через `api` service и Zustand actions.
- `App` читает `isAuthenticated` и `initializeAuth()` при старте.
- Цвета не хардкодятся по экранам — берутся из темы.

### Visual design

| Token | Dark (default) |
| --- | --- |
| Background | `#0b0c10` / `#0D0F14` |
| Card | `#1a1a1a` / `#1C2230` |
| Text primary | `#ffffff` / `#E6E9EF` |
| Text secondary | `#9aa4b2` |
| Accent | `#5eead4` |
| Danger | `#dc2626` |

## Success Criteria

- **SC-001**: Студент поднимает проект командой `npm start` и открывает его в Expo Go или симуляторе без правок native-кода.
- **SC-002**: Три лабораторных экрана хуков проходятся за одну сессию и демонстрируют заявленное поведение.
- **SC-003**: Регистрация или вход занимает меньше минуты; повторный запуск восстанавливает сессию.
- **SC-004**: Пользователь создаёт, редактирует и удаляет пост без перезапуска приложения.
- **SC-005**: `npm run lint` проходит с `--max-warnings=0`.
- **SC-006**: Основные пользовательские тексты и ошибки — на русском.

## Assumptions

- Учебный API `https://cloud.kit-imi.info` доступен в течение семестра и совместим с контрактом выше.
- Для iOS нужен Xcode, для Android — Android Studio / эмулятор; Expo Go достаточен для большей части работ.
- Роль `ADMIN` выдаётся на стороне backend; клиент только отображает её.
- Лабораторные вкладки остаются в основном приложении после авторизации (как в потоке 2025), а не выносятся в отдельный demo-mode.
- WebRTC не входит в обязательный минимум 2026, пока преподаватель явно не потребует.

## Delivery plan (course-aligned)

1. **Lab 0** — Expo + TypeScript skeleton, README, запуск iOS/Android/web.
2. **Lab 1** — экран `useState`.
3. **Lab 2** — экран `useEffect` + JSONPlaceholder.
4. **Lab 3** — экран `useMemo`.
5. **Lab 4** — React Navigation, тёмная тема.
6. **Lab 5** — axios + auth (register/login/refresh) + Zustand `authStore`.
7. **Lab 6** — Users list.
8. **Lab 7** — Posts CRUD.
9. **Lab 8** — Settings, тема, lint/prettier.
10. **Optional** — WebRTC-звонки.

Каждый этап должен быть проверяемым независимо и не ломать уже сданные экраны.
