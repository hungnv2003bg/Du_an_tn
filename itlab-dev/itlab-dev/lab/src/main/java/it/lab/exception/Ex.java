package it.lab.exception;

public class Ex extends Exception{
    public Ex() {
        super();
    }

    public Ex(String message) {
        super(message);
    }

    public Ex(String message, Throwable cause) {
        super(message, cause);
    }
}
