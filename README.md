# 🚀 Vite + React + ESLint + Prettier

Этот проект настроен с использованием **Vite** и **React**, а также включает ESLint и Prettier для обеспечения единого стиля кода и автоматического форматирования.

---

## 📦 Установка зависимостей

```bash
npm install
```

---

## ⚙️ Установка и настройка ESLint + Prettier

### 1. Установка зависимостей

```bash
npm install --save-dev \
eslint prettier \
eslint-plugin-prettier eslint-config-prettier \
eslint-plugin-react eslint-plugin-react-hooks
```

### 2. Конфигурация `.eslintrc.json`

#### 👉 Для JavaScript-проекта:

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  "plugins": ["react", "react-hooks"],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "react/react-in-jsx-scope": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

### 3. Конфигурация `.prettierrc.json`

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 80,
  "tabWidth": 2
}
```

---

### 4. Игнорируемые файлы

**`.eslintignore`**

```
node_modules
dist
build
```

**`.prettierignore`**

```
node_modules
dist
build
```

---

## 🧠 Настройка VS Code для подсветки и автофиксов ESLint

1. Установи расширение **ESLint** от [Dirk Baeumer](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. Открой настройки (`Ctrl + Shift + P` → `Preferences: Open Settings (JSON)`) и добавь:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "editor.formatOnSave": false
}
```

Теперь:

- Ошибки ESLint будут **подсвечиваться**
- При сохранении файла **будут применяться автофиксы**

---

## 📜 Скрипты в `package.json`

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
  "format": "prettier --write ."
}
```

---

## ✅ Использование

| Команда           | Описание                               |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Запуск проекта через Vite              |
| `npm run build`   | Сборка проекта                         |
| `npm run preview` | Предпросмотр собранного проекта        |
| `npm run lint`    | Проверка кода с помощью ESLint         |
| `npm run format`  | Форматирование кода с помощью Prettier |

---

## 🗂 Пример структуры проекта

```
my-app/
├── public/
├── src/
│   └── ...
├── .eslintrc.json
├── .prettierrc.json
├── .eslintignore
├── .prettierignore
├── index.html
├── vite.config.ts / vite.config.js
└── package.json
```

---

## 📌 Рекомендации

- Используй `npm run lint` перед коммитами

---

> 💡 Чистый код = меньше багов и легче поддерживать. Удачи в разработке!
