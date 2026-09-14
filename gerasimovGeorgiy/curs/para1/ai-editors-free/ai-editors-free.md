# Пара 1. ИИ-помощники для разработки

<div align="center">

![Человек укрощает робота](./images/doodle-person-tames-robot.png)

**ИИ — напарник.**  
Ты укрощаешь инструмент, а не наоборот.

</div>

---

## Зачем это нам

На курсе **React Native + Expo** ИИ пригодится, чтобы:

- быстро объяснить ошибку красного экрана
- набросать экран или хук
- вспомнить синтаксис JSX / TypeScript
- разобрать чужой кусок кода

Но сдаёшь **ты**. На защите «ИИ написал» не работает.

---

## Карта инструментов

| | Инструмент | Суть | Free |
|:---:|---|---|---|
| <img src="./images/vscode.png" alt="VS Code" width="48" /> | **VS Code** | Основной редактор курса | Весь редактор бесплатно |
| <img src="./images/copilot.png" alt="Copilot" width="48" /> | **GitHub Copilot** | ИИ внутри VS Code | Free / Student |
| <img src="./images/cursor.png" alt="Cursor" width="48" /> | **Cursor** | Отдельный AI-редактор | Hobby с лимитами |
| <img src="./images/windsurf.png" alt="Windsurf" width="48" /> | **Windsurf** | Отдельный AI-редактор | Щедрый Tab, агент по квоте |
| <img src="./images/continue.png" alt="Continue" width="48" /> | **Continue** | Плагин в VS Code | Свой ключ или локальная модель |
| <img src="./images/gemini.png" alt="Gemini" width="48" /> | **Gemini** | Чат / IDE-помощник | В IDE для обычных аккаунтов — осторожно |

> Квоты и тарифы меняются. Смотри актуальный pricing у сервиса.

---

## Что поставить на курс

### 1. База — VS Code

<img src="./images/vscode.png" alt="VS Code" width="72" />

- Ставь в первую очередь
- Под Expo / React Native этого достаточно
- ИИ подключается расширениями

### 2. ИИ в редакторе — Copilot

<img src="./images/copilot.png" alt="Copilot" width="120" />

- **Copilot Free:** примерно 2000 автодополнений + 50 chat в месяц
- **Copilot Student** (GitHub Education): автодополнения без месячного лимита
- Удобно: у нас сдача через GitHub (fork → PR)

### 3. По желанию

| | | |
|:---:|:---:|:---:|
| <img src="./images/cursor.png" width="56" alt="Cursor" /><br/>**Cursor** | <img src="./images/windsurf.png" width="56" alt="Windsurf" /><br/>**Windsurf** | <img src="./images/continue.png" width="56" alt="Continue" /><br/>**Continue** |
| Мощный агент, лимиты free быстро кончаются | Безлимитный Tab на free | Open-source + свой ключ / Ollama |

### 4. Gemini — нюанс

<img src="./images/gemini.png" alt="Gemini" width="72" />

С июня 2026 **Gemini Code Assist** для обычных individual-аккаунтов в IDE лучше не обещать себе как основной инструмент.  
Чат в браузере — ок, чтобы «поговорить» про ошибку.

---

## Правила выживания с ИИ

1. **Указывай стек:** `Expo + TypeScript + React Navigation`
2. **Давай контекст:** ошибка целиком, кусок файла, что уже пробовал
3. **Проси маленький шаг**, не «напиши всё приложение»
4. **Проверяй ответ** — ИИ уверенно врёт (устаревшие API, несуществующие пропсы)
5. **Понимай код**, который вставляешь

---

## Плохой vs хороший промпт

### Плохо

> напиши приложение со счётчиком

### Хорошо

```text
Expo + TypeScript, функциональный компонент.
Экран CounterScreen: число по центру, кнопки +, −, Reset.
Только useState и StyleSheet, без библиотек.
Дай полный файл и коротко объясни каждую часть.
```

---

## Итог на сегодня

1. Поставь **VS Code**
2. Подключи **Copilot Free** (или Student) — или пользуйся чатом в браузере
3. Cursor / Windsurf — по желанию потрогать
4. Код на защите объясняешь **ты**

---

## Полезные ссылки

- [Copilot — тарифы](https://github.com/features/copilot/plans)
- [Copilot Student](https://docs.github.com/copilot/how-tos/manage-your-account/free-access-with-copilot-student)
- [Cursor — pricing](https://cursor.com/help/account-and-billing/pricing)
- [Windsurf — pricing](https://windsurf.com/pricing)
- [Continue](https://continue.dev/)
- [VS Code](https://code.visualstudio.com/)
