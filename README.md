# Unsplash API Test
При разработке проекта использовался [React](https://github.com/facebook/create-react-app) - [ReduxToolkit](https://redux-toolkit.js.org/).

Для старта проекта необходимо выполнить:
1. Выполнить команду `yarn install`;
2. Выполнить команду `yarn start`;

В новой вкладке откроется проект на порту [http://localhost:3000](http://localhost:3000);

Также необходимо добавись ключи в файл .env:
1. `REACT_APP_UNSPLASH_ACCESS_KEY` - Access key c личного кабинета unsplash;
2. `REACT_APP_UNSPLASH_SECRET_KEY` - Secret key c личного кабинета unsplash;
3. `REACT_APP_UNSPLASH_REDIRECT_URL` - Url для редиректа после успешной авторизации. В данном приложении используется `http://localhost:3000/auth`;