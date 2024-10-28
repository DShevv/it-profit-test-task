export function validateForm(formData) {
  const errors = {};

  if (!formData.get("name")) {
    errors.name = "Поле обязательно для заполнения";
  }

  const email = formData.get("email");
  if (!email) {
    errors.email = "Поле обязательно для заполнения";
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    errors.email = "Неверный формат email";
  }

  if (!formData.get("tel")) {
    errors.tel = "Поле обязательно для заполнения";
  }

  if (!formData.get("message")) {
    errors.message = "Поле обязательно для заполнения";
  }

  return errors;
}
