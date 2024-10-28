import "./styles/main.sass";
import "./styles/modal.sass";

import Inputmask from "inputmask";
import { validateForm } from "./js/validateForm";
import { submitForm } from "./js/submitForm";

const PhoneInput = document.querySelector("#tel");

let inputMask = new Inputmask("375 (99) 999-99-99");
inputMask.mask(PhoneInput);

const messageContainer = document.querySelector(".message-box");
const form = document.querySelector("form.feedback-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  messageContainer.innerHTML = "";

  const formData = new FormData(form);

  const errors = validateForm(formData);

  if (Object.keys(errors).length > 0) {
    displayErrors(errors);
    return;
  }

  const result = await submitForm(formData);

  if (result.status === "error") {
    displayErrors(result.fields || {});
    messageContainer.textContent = result.msg || "Ошибка отправки формы";
  } else if (result.status === "success") {
    form.reset();
    messageContainer.textContent = result.msg || "Форма успешно отправлена";
  }
});

function displayErrors(errors) {
  Object.keys(errors).forEach((fieldName) => {
    const input = form.querySelector(`[name="${fieldName}"]`);
    input.parentNode.classList.add("error");
    const errorContainer = input?.nextElementSibling;
    if (errorContainer) {
      errorContainer.textContent = errors[fieldName];
    }
  });
}

document.addEventListener("input", (e) => {
  if (e.target.parentNode.classList.contains("error")) {
    e.target.parentNode.classList.remove("error");
  }
});

const ModalBack = document.querySelector(".bg-wrapper");
const Modal = document.querySelector(".modal");

function showModal() {
  ModalBack.classList.add("active");
  Modal.classList.add("active");
  document.body.style.setProperty(
    "--st",
    -document.documentElement.scrollTop + "px"
  );
  document.body.classList.add("scroll-stop");
}

function hideModal() {
  ModalBack.classList.remove("active");
  Modal.classList.remove("active");
  document.body.classList.remove("scroll-stop");

  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";

  window.scrollTo(
    0,
    Math.abs(
      Number(document.body.style.getPropertyValue("--st").replace("px", ""))
    )
  );
}

document.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("modal-close") ||
    e.target.parentNode.classList.contains("modal-close") ||
    e.target.classList.contains("bg-wrapper")
  ) {
    hideModal();
  }

  if (e.target.id === "btn-modal") {
    showModal();
  }
});
