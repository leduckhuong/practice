declare type inputValue = undefined|string|number|Array<string>;
interface Rule {
    selector:string;
    test: (value:inputValue) => string;
}
class Validator {
    form:string;
    formGroupSelector:string;
    errorSelector:string;
    rules:Array<Rule>;
    constructor(_form:string, _formGroupSelector:string, _errorSelector:string, _rules:Array<Rule>) {
        this.form = _form;
        this.formGroupSelector = _formGroupSelector;
        this.errorSelector = _errorSelector;
        this.rules = _rules;
    }
    public static selectorRules:any = {};
    // tim kiem Element wraper cuar element input
    private getParent(element:JQuery<HTMLInputElement>, selector:string):JQuery<HTMLElement>|undefined {
        while (element.parent()) {
            if (element.parent().is(selector)) {
                return element.parent();
            }
            element = element.parent();
        }
    }
    // ham thuc hien validate
    public validate(inputElement:JQuery<HTMLInputElement>, rule:Rule):boolean {
        const errorElement:JQuery<HTMLElement>|undefined = this.getParent(inputElement, this.formGroupSelector)?.children(this.errorSelector);
        let errorMessage:string|undefined;
        // lay ra cac rules cua selector
        let rules:Array<(value:inputValue) => string> = Validator.selectorRules[rule.selector];
        //lap qua tung rule va kiem tra
        // neu co loi thi ap dung va dung viec kiem tra
        for(let i = 0; i< rules.length; ++i) {
            switch(inputElement.attr('type')) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i]($(this.form + ' ' + rule.selector + ':checked').val());
                    break;
                default:
                    errorMessage = rules[i](inputElement.val());
            }
            if(errorMessage) break;
        }
        if(errorMessage) {
            errorElement?.text(errorMessage);
            this.getParent(inputElement, this.formGroupSelector)?.addClass('error');
        }else {
            errorElement?.text('');
            this.getParent(inputElement, this.formGroupSelector)?.removeClass('error');
        }
        return !!errorMessage;
    }
    // Lay element cua form can validate va lang nghe su kien
    public start():void {
        const formElement:JQuery<HTMLFormElement> = $(this.form);
        if(formElement) {
            // su kien submit form
            this.handleListenerSubmitForm(formElement);
            // lap qua rule va lang nghe su kien cua input element
            this.handleListenerInputChange();
        }
    }
    // xy ly su kien submit form
    public handleListenerSubmitForm(formElement:JQuery<HTMLFormElement>):void {
        formElement.on('submit', (e) => {
            e.preventDefault();
            let isValidSubmit = true;
            // lap qua tung rule va validate
            this.rules.forEach((rule):void => {
                let inputElement:JQuery<HTMLInputElement> = $(rule.selector);
                let isValid:boolean = this.validate(inputElement, rule);
                if(isValid) isValidSubmit = false;
            });
            if(isValidSubmit){
                e.target.submit();
            }else{
                console.log('isvalid submit')
            }
        });
    }
    // xu ly lap qua rule va lang nghe su kien cua input element
    public handleListenerInputChange ():void {
        this.rules.forEach((rule):void => {
            // luu lai cac rule cho moi input
            if(Array.isArray(Validator.selectorRules[rule.selector])) {
                Validator.selectorRules[rule.selector].push(rule.test);
            }else {
                Validator.selectorRules[rule.selector] = [rule.test];
            }
            let inputElement:JQuery<HTMLInputElement> = $(rule.selector);
            if (inputElement) {
                // khi roi khoi input
                inputElement.on('blur', ():void => {
                    this.validate(inputElement, rule);
                })
            }
        });
    }
    
    public static Required(selector:string, message:string):Rule {
        return {
            selector,
            test: function (value:inputValue):string {
                return value ? '' : message || 'Vui lòng nhập trường này';
            }
        }
    }
    public static Email(selector:string, message:string):Rule {
        return {
            selector,
            test: function (value:inputValue):string {
                var regex:RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return (typeof(value) === 'string' && regex.test(value)) ? '' :  message || 'Trường này phải là email!';
            }
        }
    }
    public static MinLength(selector:string, min:number, message:string):Rule {
        return {
            selector,
            test: function (value:inputValue):string {
                return (typeof(value) === 'string' && value.length >= min) ? '' : message || `Vui lòng chuỗi ký tư tối thiểu ${min} ký tự!`;
            }
        }
    }
    public static Confirmed(selector:string, getConfirmValue:() => string, message:string) {
        return {
            selector,
            test: function (value:inputValue):string {
                if(value === getConfirmValue()) return '';
                else {
                    $(selector).val('');
                    return message || 'Giá trị nhập vào không chính xác!';
                }
            }
        }
    }
}
