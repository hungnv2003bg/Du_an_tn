package it.lab.iservice;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IFileService {
    public String upLoadFile(MultipartFile file) throws IOException;
}
