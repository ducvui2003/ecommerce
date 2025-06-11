import { AppException } from '@shared/app.error';
import { ProductErrorMessage, UserErrorMessage } from '@shared/constants/error.constant';

export class ProductNotFoundException extends AppException {
  constructor() {
    super(ProductErrorMessage.PRODUCT_NOT_FOUND, 404, 1001);
  }
}

export class ProductAlreadyExistsException extends AppException {
  constructor() {
    super(ProductErrorMessage.PRODUCT_ALREADY_EXISTS, 409, 1002);
  }
}

export class ProductOutOfStockException extends AppException {
  constructor() {
    super(ProductErrorMessage.PRODUCT_OUT_OF_STOCK, 400, 1003);
  }
}

export class ProductPriceInvalidException extends AppException {
  constructor() {
    super(ProductErrorMessage.PRODUCT_PRICE_INVALID, 400, 1004);
  }
}

export class ProductCategoryInvalidException extends AppException {
  constructor() {
    super(ProductErrorMessage.PRODUCT_CATEGORY_INVALID, 400, 1005);
  }
}

export class ProductImageInvalidException extends AppException {
  constructor() {
    super(ProductErrorMessage.PRODUCT_IMAGE_INVALID, 400, 1006);
  }
}

export class ProductDescriptionTooLongException extends AppException {
  constructor() {
    super(ProductErrorMessage.PRODUCT_DESCRIPTION_TOO_LONG, 400, 1007);
  }
}

export class ProductNameTooShortException extends AppException {
  constructor() {
    super(ProductErrorMessage.PRODUCT_NAME_TOO_SHORT, 400, 1008);
  }
}
