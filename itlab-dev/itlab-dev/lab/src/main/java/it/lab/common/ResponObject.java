package it.lab.common;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponObject<T> {
    private T data;
    private String message;

    public ResponObject() {
        this.message = "Thành công!";
    }

    public ResponObject(T data, String message) {
        this.data = data;
        if (message == null) {
            this.message = "Thành công!";
        }
        this.message = message;
    }
}
