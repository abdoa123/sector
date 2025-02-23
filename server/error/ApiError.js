class ApiError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }

    static badRequest() {
        return new ApiError(400, "unable to process the request because it is not a valid request.");
    }

    static internal() {
        return new ApiError(500, "something went wrong  please contact the administrator to report a problem.");
    }
    static notFound() {
        return new ApiError(401, "record not found");
    }
    static noAccess() {
        return new ApiError(401, "you have no access to update or delete this record, Please contact the Administrator");
    }
    static logInAgain() {
        return new ApiError(408, "please login again");
    }
    static wrongPassword() {
        return new ApiError(402, "Wrong Passord");
    }
    static needConfirmed() {
        return new ApiError(400, "patient need to be confirmed");
    }

    static AlreadyExistPhone() {
        return new ApiError(409, "Phone Already Exist");
    }
    static AlreadyExistEmailPhone() {
        return new ApiError(409, "Phone/Email Already Exist");
    }
    static AlreadyExistUser() {
        return new ApiError(409, "Email Already Exist. Please Login");
    }
    // static AlreadyExistAreaAdmin() {
    //     return new ApiError(409, "AreaAdmin Already Exist. Please Login");
    // }
    static AlreadyExistSSN() {
        return new ApiError(409, "National ID Number Already Used Before.");
    }
    static AlreadyExistPhone() {
        return new ApiError(409, "This Phone Number Already Registered Before");
    }
    static successfully() {
        return new ApiError(200, "record has been created successfully");
    }
    static notAvailable() {
        return new ApiError(400, "Appoinment is not available");
    }
    static canNotUpdate() {
        return new ApiError(400, "Cannot update record  Maybe record was not found or req.body is empty!");
    }
    static requiredInput() {
        return new ApiError(400, "All inputs are required");
    }
    static invalidCredentials() {
        return new ApiError(400, "Invalid Credentials");
    }
    static invalidPin() {
        return new ApiError(400, "Invalid Pin");
    }
    static termsAndCondition(userId) {
        // return new ApiError(400, "please accept our policies");
        return new ApiError(415, JSON.stringify({userId}));
    }

    static customMessage(message) {
        // return new ApiError(400, "please accept our policies");
        return new ApiError(419, message);
    }

static alreadyConfirmed() {
        // return new ApiError(400, "please accept our policies");
        return new ApiError(400, "user already confirmed");
    }
    



}

module.exports = ApiError;