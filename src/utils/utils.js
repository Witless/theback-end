import crypto from "node:crypto"

const utils = {

    /**
     * Generates a random UUID v4
     */
    generateUUIDv4(){
        /**
         * Generates a random UUID v4
         * @tested Node v20.10
         */
        return crypto.randomUUID()
    },

    /**
     * Checks introduced email against regex
     * @param email
     * @returns {boolean}
     */
    validateEmail(email) {
        const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regExp.test(email);
    }

}

export default utils