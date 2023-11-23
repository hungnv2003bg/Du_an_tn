package it.lab.common;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class Page<T> {
    private List<T> data;
    private Integer pageNumber;
    private Integer pageTotal;
    private Integer pageSize;
    private Integer pageItem;

    public Page(List<T> source, Integer pageNumber, Integer pageSize) {
        if (pageNumber == null) {
            pageNumber = 1;
        }
        if (pageNumber == 0) {
            pageNumber = 1;
        }
        if (pageSize == null) {
            pageSize = 1;
        }
        if (pageSize == 0) {
            pageSize = 1;
        }
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        if (source != null) {
            if (source.size() % pageSize > 1) {
                this.pageTotal = (source.size() / pageSize) + 1;
            } else {
                this.pageTotal = source.size() / pageSize;
            }
            if (source.size() < pageSize) {
                this.data = source;
                this.pageTotal = 1;
            } else {
                this.data = source.subList((pageNumber - 1) * pageSize, (pageNumber - 1) * pageSize + pageSize);
            }
            this.pageItem = this.data.size();
        }
    }
}
