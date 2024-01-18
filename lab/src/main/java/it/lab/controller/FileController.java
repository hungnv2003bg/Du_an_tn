package it.lab.controller;
import org.apache.poi.util.IOUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import it.lab.iservice.IFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/file")
public class FileController {
    @Autowired
    private IFileService _file;

    @RequestMapping(value = "/test", method = RequestMethod.POST)
    public ResponseEntity<?> layDuLieu(MultipartFile file) throws IOException {
        return ResponseEntity.ok(_file.upLoadFile(file));
    }
    @RequestMapping(value = "/test1", method = RequestMethod.POST)
    public ResponseEntity<?> layDuLieu2() throws IOException {
        return ResponseEntity.ok("sss");
    }
    @GetMapping("/baocao")
    public ResponseEntity<byte[]> downloadFile() throws IOException {
        // Lấy đường dẫn của file trong resources
        Resource resource = new ClassPathResource("Template.xlsx");
        Path filePath = Paths.get(resource.getURI());

        // Đọc dữ liệu của file
        byte[] fileContent = IOUtils.toByteArray(resource.getInputStream());

        // Trả về dữ liệu file với header để tải xuống
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header("Content-Disposition", "attachment; filename=" + resource.getFilename())
                .body(fileContent);
    }
}
