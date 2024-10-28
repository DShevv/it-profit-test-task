import "./styles/main.sass";
import Inputmask from "inputmask";

const PhoneInput = document.querySelector("#tel");

let inputMask = new Inputmask("375 (99) 999-99-99");
inputMask.mask(PhoneInput);
