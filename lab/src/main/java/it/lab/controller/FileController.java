package it.lab.controller;

import it.lab.iservice.IFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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
}
