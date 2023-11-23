package it.lab.service;

import it.lab.common.CloudinaryUpload;
import it.lab.iservice.IFileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class FileService implements IFileService {
    @Override
    public String upLoadFile(MultipartFile file) throws IOException {
        return CloudinaryUpload.uploadFile(file);
    }
}
