package it.lab.common;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponObject<T, S> {
    private T data;
    private S status;
    private String message;

    public ResponObject() {
        this.message = "Thành công!";
    }

    public ResponObject(T data,S status, String message) {
        this.data = data;
        this.status = status;
        if (message == null) {
            this.message = "Thành công!";
        }
        this.message = message;
    }
}
