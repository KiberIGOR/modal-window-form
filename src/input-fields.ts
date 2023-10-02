/** Объект с полями для инициализации инпутов */
export interface Fields {
  [key: string]: Field;
}
/** Объект инпута */
export interface Field {
  /** placeholder/label */
  label: string;
  /** Значение инпута */
  value: string;
  /** Атрибуты, передаваемые инпуту(v-bind) */
  bind: FieldBind;
  /** Отвечает за показ ошибки */
  isValid: boolean;
  /** Текст ошибки */
  errorText: string;
  /** функции проверки + тексты ошики */
  errors: FieldErrors;
}
/** Типы инпута */
export const enum FieldTypes {
  input = "input",
  textarea = "textarea",
  phone = "phone",
}
/** Необязательные поля инпута */
export interface FieldBind {
  /** Максимальное число симвогов */
  maxLength?: number;
  /** Встреный required винпут */
  required?: boolean;
  /** Тип инпута */
  type?: FieldTypes;
}

/** Объект с функциями валидаций и текстом ошибки */
export interface FieldErrors {
  [key: string]: {
    /** Функция проверки на валидность(каким должен быть инпут).
     * @function (input.value:string):boolean=>{return true(isValid)}*/
    checkFunc: (value: string) => boolean;
    /** Текст для не валидного инпута */
    text: string;
  };
}

/** Объект с объектами для инпута */
export const inputFields: Fields = {
  name: {
    label: "Имя",
    value: "",
    bind: {
      maxLength: 100,
      required: false,
      type: FieldTypes.input,
    },
    isValid: true,
    errorText: "",
    errors: {
      maxLength: {
        checkFunc: function (value: string) {
          return value.length <= 100;
        },
        text: "Имя слишком длинное",
      },
      require: {
        checkFunc: function (value: string) {
          return Boolean(value.length);
        },
        text: "Поле не заполнено",
      },
    },
  },
  sername: {
    label: "Фамилия",
    value: "",
    bind: {
      maxLength: 100,
      type: FieldTypes.input,
    },
    isValid: true,
    errorText: "",
    errors: {
      maxLength: {
        checkFunc: function (value: string) {
          return value.length <= 100;
        },
        text: "Имя слишком длинное",
      },
    },
  },
  number: {
    label: "Номер телефона",
    value: "",
    bind: {
      type: FieldTypes.phone,
      required: false,
      maxLength: 16,
    },
    isValid: true,
    errorText: "",
    errors: {
      valid: {
        checkFunc: function (value: string) {
          const regExp = /^(?:\+7|8)\d{10}$/;
          return regExp.test(value.replace(/[ ()-]/g, ""));
        },
        text: "Неверно набран номер",
      },
      require: {
        checkFunc: function (value: string) {
          return Boolean(value.length);
        },
        text: "Поле не заполнено",
      },
    },
  },
  mail: {
    label: "Почта",
    value: "",
    bind: {
      required: false,
      type: FieldTypes.input,
    },
    isValid: true,
    errorText: "",
    errors: {
      valid: {
        checkFunc: function (value: string) {
          const regExp =
            /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
          return regExp.test(value);
        },
        text: "Неверно набрана почта",
      },
      require: {
        checkFunc: function (value: string) {
          return Boolean(value.length);
        },
        text: "Поле не заполнено",
      },
    },
  },
  message: {
    label: "Сообщение",
    value: "",
    bind: {
      type: FieldTypes.textarea,
      maxLength: 500,
    },
    isValid: true,
    errorText: "",
    errors: {
      maxLength: {
        checkFunc: function (value: string) {
          return value.length <= 500;
        },
        text: "Имя слишком длинное",
      },
    },
  },
};
