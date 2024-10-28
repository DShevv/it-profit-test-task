const express = require("express");
const cors = require("cors");
const app = express();

const port = 9090;

app.use(cors());

const fieldErrors = {
  name: "Случайная ошибка",
  email: "Слишком деловой Email",
  tel: "Крутой номер телефона",
  message: "Не интересное сообщение",
};

function generateRandomErrors() {
  const errors = {};
  const fieldNames = Object.keys(fieldErrors);

  const errorCount = Math.floor(Math.random() * fieldNames.length) + 1;

  for (let i = 0; i < errorCount; i++) {
    const randomField =
      fieldNames[Math.floor(Math.random() * fieldNames.length)];
    errors[randomField] = fieldErrors[randomField];
  }

  return errors;
}

app.post("/api/registration", (req, res) => {
  if (Math.random() > 0.5) {
    res.statusCode = 400;

    setTimeout(() => {
      res.send({
        status: "error",
        fields: generateRandomErrors(),
      });
    }, Math.random() * 1000);

    return;
  }

  setTimeout(() => {
    res.statusCode = 200;
    res.send({
      status: "success",
      msg: "Ваша заявка успешно отправлена",
    });
  }, Math.random() * 1000);
});

app.get("/api/ping", (req, res) => {
  res.statusCode = 200;
  res.send({
    status: "success",
    message: "Server is ready",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
