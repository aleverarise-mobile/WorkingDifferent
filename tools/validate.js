var validate = require("validate.js");

export default function validateFields(fieldName, value) {
    if (fieldName == 'email') {
        return validate({ [fieldName]: value }, {
            [fieldName]: {
                email: true,
            }
        })
    }

    if (fieldName == 'password') {
        return validate({ [fieldName]: value }, {
            [fieldName]: {
                length: {
                    minimum: 6,
                    tooShort: "needs to have %{count} words or more",
                }
            }
        })
    }
}