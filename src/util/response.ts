
export class ResultEnum {
    static SUCCESS = { code: 1, message: 'ok' }
    static ERROR = { code: -1, message: 'unknown error' }
    static VALIDATE_ERROR = { code: -2, message: '字段验证错误' }
    static FILE_LARGE = { code: -3, message: '文件过大' }
}

export class Res {
    public code: Number;
    public message: String;
    public data: Object;

    constructor(code: Number, message: String, data: Object) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}

export class ResSuccess extends Res {
    constructor(data?: Object, message?: String) {
        if (typeof message !== 'string') {
            message = ResultEnum.SUCCESS.message;
        }
        super(ResultEnum.SUCCESS.code, message, data);
    }
}

export class ResError extends Res {
    constructor(data?: Object, message?: String) {
        if (typeof message !== 'string') {
            message = ResultEnum.ERROR.message;
        }
        super(ResultEnum.ERROR.code, message, data);
    }
}

export class ValidateError extends Res {
    constructor(data?: Object, message?: String) {
        if (typeof message !== 'string') {
            message = ResultEnum.VALIDATE_ERROR.message;
        }
        super(ResultEnum.VALIDATE_ERROR.code, message, data);
    }
}

export class CodeAndMessage extends Res {
    constructor(code: Number, message: String) {
        super(code, message, null);
    }
}
