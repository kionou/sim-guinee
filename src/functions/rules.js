import { helpers, required, email, minLength, maxLength ,maxValue,minValue, numeric, sameAs } from "@vuelidate/validators";

const require = helpers.withMessage('Ce champ est obligatoire!', required);
const lgmin = (min) => helpers.withMessage(`Ce champ doit avoir au moins ${min} caractères!`, minLength(min));
const lgmax = (max) => helpers.withMessage(`Ce champ doit avoir au plus ${max} caractères!`, maxLength(max));
const vlmin = (min) => helpers.withMessage(`Cette valeur doit être supérieure ou égale à ${min} !`, minValue(min));
const vlmax = (max) => helpers.withMessage(` Cette valeur doit être inférieure ou égale à ${max} !`, maxValue(max));
const ValidEmail = helpers.withMessage(`La valeur n'est pas une adresse e-mail valide!`, email);
const ValidNumeri = helpers.withMessage('La valeur doit être numérique!', numeric);
const sameAsPassword = helpers.withMessage('Mot de passe non identique!', sameAs);
const hasUppercase = helpers.regex('hasUppercase', /^(?=.*[A-Z])/);
const hasUppercaseWithCustomMessage = helpers.withMessage("Le mot de passe doit contenir au moins une lettre majuscule.", hasUppercase);

export {
    require,
    lgmin,
    lgmax,
    ValidEmail,
    ValidNumeri,
    vlmin,
    vlmax,
    sameAsPassword,
    hasUppercaseWithCustomMessage
};

