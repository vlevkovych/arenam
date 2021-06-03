export class ValidationError extends Error {
    public fieldName: string;

    public constructor(message: string, fieldName: string) {
        super(message);
        this.message = message;
        this.fieldName = fieldName;
    }
}
