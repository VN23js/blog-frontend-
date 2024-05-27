import axios from "axios";

const instance = axios.create({
  baseURL: "https://blog-server-navy-six.vercel.app/api",
  validateStatus: () => true
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});

export default instance;
//В коде проверки JWT (JSON Web Token) функция checkAuth принимает запрос (req), ответ (res) и следующую функцию (next).

//Внутри функции checkAuth из заголовков запроса (headers.authorization) извлекается токен. Затем происходит попытка верифицировать (проверить) токен с помощью функции jwt.verify, используя секретный ключ, который хранится в переменной process.env.JWT_SECRET.

//Если токен успешно верифицирован, раскодированные данные извлекаются из токена и записываются в объект запроса (req.userId = decoded.id). После этого выполнение передается следующей функции (next).

//Если при проверке токена возникает ошибка, например, токен недействителен или его формат неверен, то возвращается JSON объект с сообщением "Нет доступа".

//В случае, если токен не был предоставлен (отсутствие токена в заголовках запроса), также возвращается JSON объект с сообщением "Нет доступа".

//В коде функции updatePost, которая используется для обновления поста, отправляется PUT запрос по указанному пути(/posts/${updatePost.id}) с данными updatePost. При выполнении запроса используется axios.

///В коде с использованием axios создается экземпляр instance с базовым URL для всех запросов. Также устанавливается опция validateStatus, которая возвращает true для всех статусов ответа.

//В interceptor'e запросов (instance.interceptors.request) к каждому запросу добавляется заголовок Authorization с токеном, который берется из localStorage (window.localStorage.getItem("token")).

//Таким образом, при выполнении запроса на сервер с помощью функции updatePost, axios автоматически добавляет заголовок Authorization с токеном из localStorage. После этого запрос попадает в функцию checkAuth,
//где происходит проверка токена на авторизацию. Если токен верифицирован успешно, то запрос продолжает выполнение, иначе возвращается сообщение "Нет доступа".
