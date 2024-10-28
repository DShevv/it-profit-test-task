export async function submitForm(formData) {
  try {
    const response = await fetch(`http://localhost:9090/api/registration`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Ошибка отправки формы:", error);
    return { status: "error", msg: "Ошибка отправки формы" };
  }
}
