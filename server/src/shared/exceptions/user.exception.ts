import { AppException } from '@shared/app.error';
import { UserErrorMessage } from '@shared/constants/error.constant';

export class UserNotFoundException extends AppException {
    constructor() {
        super(UserErrorMessage.USER_NOT_FOUND, 404, 1001);
    }
}

export class UserAlreadyExistsException extends AppException {
    constructor() {
        super(UserErrorMessage.USER_ALREADY_EXISTS, 409, 1002);
    }
}
